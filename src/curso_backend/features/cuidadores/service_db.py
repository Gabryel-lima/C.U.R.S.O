from __future__ import annotations

from sqlalchemy.orm import Session
from uuid import uuid4
from sqlalchemy import select, func
from curso_backend.features.cuidadores.models import Cuidador
from curso_backend.features.cuidadores.schemas import CuidadorPayload, CuidadorResponse
from curso_backend.shared.problem import not_found_problem, conflict_problem


def list_cuidadores(db: Session) -> list[CuidadorResponse]:
    items = db.query(Cuidador).all()
    return [CuidadorResponse.model_validate(_orm_to_dict(c)) for c in items]


def get_cuidador(db: Session, cuidador_id: str) -> CuidadorResponse:
    c = db.get(Cuidador, cuidador_id)
    if not c:
        raise not_found_problem("Cuidador nao encontrado.")
    return CuidadorResponse.model_validate(_orm_to_dict(c))


def create_cuidador(db: Session, payload: CuidadorPayload) -> CuidadorResponse:
    # check duplicate email
    exists = db.execute(select(func.count()).select_from(Cuidador).where(Cuidador.email == payload.email)).scalar_one()
    if exists:
        raise conflict_problem("Email ja cadastrado.")
    cid = str(uuid4())
    c = Cuidador(id=cid, **payload.model_dump())
    db.add(c)
    db.commit()
    db.refresh(c)
    return CuidadorResponse.model_validate(_orm_to_dict(c))


def update_cuidador(db: Session, cuidador_id: str, payload: CuidadorPayload) -> CuidadorResponse:
    c = db.get(Cuidador, cuidador_id)
    if not c:
        raise not_found_problem("Cuidador nao encontrado.")
    # if email changed, ensure uniqueness
    if payload.email != c.email:
        exists = db.execute(select(func.count()).select_from(Cuidador).where(Cuidador.email == payload.email)).scalar_one()
        if exists:
            raise conflict_problem("Email ja cadastrado.")
    for k, v in payload.model_dump().items():
        setattr(c, k, v)
    db.commit()
    db.refresh(c)
    return CuidadorResponse.model_validate(_orm_to_dict(c))


def delete_cuidador(db: Session, cuidador_id: str) -> None:
    c = db.get(Cuidador, cuidador_id)
    if not c:
        raise not_found_problem("Cuidador nao encontrado.")
    # check links to resgates
    from curso_backend.features.resgates.models import Resgate

    linked = db.execute(select(func.count()).select_from(Resgate).where(Resgate.cuidador_id == c.id)).scalar_one()
    if linked:
        raise conflict_problem("Cuidador possui vinculos ativos.")
    db.delete(c)
    db.commit()


def _orm_to_dict(c: Cuidador) -> dict:
    return {
        "id": c.id,
        "nome": c.nome,
        "email": c.email,
        "telefone": c.telefone,
        "especialidade": c.especialidade,
        "santuario_id": c.santuario_id,
        "ativo": c.ativo,
    }
