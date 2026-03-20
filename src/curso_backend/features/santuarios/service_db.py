from __future__ import annotations

from sqlalchemy.orm import Session
from uuid import uuid4
from sqlalchemy import select, func
from curso_backend.features.santuarios.models import Santuario
from curso_backend.features.ursos.models import Urso
from curso_backend.features.santuarios.schemas import SantuarioPayload, SantuarioResponse
from curso_backend.shared.problem import not_found_problem, conflict_problem


def list_santuarios(db: Session) -> list[SantuarioResponse]:
    items = db.query(Santuario).all()
    result: list[SantuarioResponse] = []
    for s in items:
        ocup = db.execute(select(func.count()).select_from(Urso).where(Urso.santuario_id == s.id)).scalar_one()
        result.append(SantuarioResponse.model_validate(_orm_to_dict(s, ocup)))
    return result


def get_santuario(db: Session, santuario_id: str) -> SantuarioResponse:
    s = db.get(Santuario, santuario_id)
    if not s:
        raise not_found_problem("Santuario nao encontrado.")
    ocup = db.execute(select(func.count()).select_from(Urso).where(Urso.santuario_id == s.id)).scalar_one()
    return SantuarioResponse.model_validate(_orm_to_dict(s, ocup))


def create_santuario(db: Session, payload: SantuarioPayload) -> SantuarioResponse:
    sid = str(uuid4())
    s = Santuario(id=sid, **payload.model_dump())
    db.add(s)
    db.commit()
    db.refresh(s)
    return SantuarioResponse.model_validate(_orm_to_dict(s, 0))


def update_santuario(db: Session, santuario_id: str, payload: SantuarioPayload) -> SantuarioResponse:
    s = db.get(Santuario, santuario_id)
    if not s:
        raise not_found_problem("Santuario nao encontrado.")
    ocup = db.execute(select(func.count()).select_from(Urso).where(Urso.santuario_id == s.id)).scalar_one()
    data = payload.model_dump()
    if data["capacidade"] < ocup:
        raise conflict_problem("Capacidade nao pode ser menor que a ocupacao atual.")
    for k, v in data.items():
        setattr(s, k, v)
    db.commit()
    db.refresh(s)
    return SantuarioResponse.model_validate(_orm_to_dict(s, ocup))


def delete_santuario(db: Session, santuario_id: str) -> None:
    s = db.get(Santuario, santuario_id)
    if not s:
        raise not_found_problem("Santuario nao encontrado.")
    # check for linked urso/cuidadores
    urso_count = db.execute(select(func.count()).select_from(Urso).where(Urso.santuario_id == s.id)).scalar_one()
    # cuidadores import here to avoid cycle
    from curso_backend.features.cuidadores.models import Cuidador

    cuidador_count = db.execute(select(func.count()).select_from(Cuidador).where(Cuidador.santuario_id == s.id)).scalar_one()
    if urso_count or cuidador_count:
        raise conflict_problem("Santuario possui vinculos ativos.")
    db.delete(s)
    db.commit()


def _orm_to_dict(s: Santuario, ocup: int) -> dict:
    return {
        "id": s.id,
        "nome": s.nome,
        "pais": s.pais,
        "estado": s.estado,
        "capacidade": s.capacidade,
        "ocupacao": ocup,
    }
