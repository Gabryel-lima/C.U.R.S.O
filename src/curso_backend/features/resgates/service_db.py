from __future__ import annotations

from sqlalchemy.orm import Session
from uuid import uuid4
from sqlalchemy import select, func
from curso_backend.features.resgates.models import Resgate
from curso_backend.features.resgates.schemas import ResgatePayload, ResgateResponse
from curso_backend.features.ursos.models import Urso
from curso_backend.shared.problem import not_found_problem, conflict_problem


def list_resgates(db: Session) -> list[ResgateResponse]:
    items = db.query(Resgate).all()
    return [ResgateResponse(**_orm_to_dict(r)) for r in items]


def get_resgate(db: Session, resgate_id: str) -> ResgateResponse:
    r = db.get(Resgate, resgate_id)
    if not r:
        raise not_found_problem("Resgate nao encontrado.")
    return ResgateResponse(**_orm_to_dict(r))


def create_resgate(db: Session, payload: ResgatePayload) -> ResgateResponse:
    # ensure urso exists
    u = db.get(Urso, payload.urso_id)
    if not u:
        raise conflict_problem("Urso informado nao existe.")
    # ensure no active resgate
    active = db.execute(
        select(func.count()).select_from(Resgate).where(Resgate.urso_id == payload.urso_id).where(Resgate.status != "encerrado")
    ).scalar_one()
    if active:
        raise conflict_problem("Ja existe resgate ativo para este urso.")
    rid = str(uuid4())
    r = Resgate(id=rid, **payload.model_dump())
    db.add(r)
    db.commit()
    db.refresh(r)
    return ResgateResponse(**_orm_to_dict(r))


def update_resgate(db: Session, resgate_id: str, payload: ResgatePayload) -> ResgateResponse:
    r = db.get(Resgate, resgate_id)
    if not r:
        raise not_found_problem("Resgate nao encontrado.")
    for k, v in payload.model_dump().items():
        setattr(r, k, v)
    db.commit()
    db.refresh(r)
    return ResgateResponse(**_orm_to_dict(r))


def delete_resgate(db: Session, resgate_id: str) -> None:
    r = db.get(Resgate, resgate_id)
    if not r:
        raise not_found_problem("Resgate nao encontrado.")
    db.delete(r)
    db.commit()


def _orm_to_dict(r: Resgate) -> dict:
    return {
        "id": r.id,
        "urso_id": r.urso_id,
        "cuidador_id": r.cuidador_id,
        "local": r.local,
        "data_resgate": r.data_resgate.isoformat() if r.data_resgate else None,
        "condicao_saude": r.condicao_saude,
        "status": r.status.value if r.status else None,
        "descricao": r.descricao,
    }
