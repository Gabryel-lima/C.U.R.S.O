from __future__ import annotations

from sqlalchemy.orm import Session
from uuid import uuid4
from curso_backend.features.ursos.models import Urso
from curso_backend.features.ursos.schemas import UrsoPayload, UrsoResponse
from curso_backend.features.santuarios.models import Santuario
from curso_backend.shared.problem import not_found_problem, conflict_problem
from sqlalchemy import select, func


def list_ursos(db: Session, limit: int = 100) -> list[UrsoResponse]:
    items = db.query(Urso).limit(limit).all()
    return [UrsoResponse(**_orm_to_dict(u)) for u in items]


def get_urso(db: Session, urso_id: str) -> UrsoResponse:
    u = db.get(Urso, urso_id)
    if not u:
        raise not_found_problem("Urso nao encontrado.")
    return UrsoResponse(**_orm_to_dict(u))


def create_urso(db: Session, payload: UrsoPayload) -> UrsoResponse:
    urso_id = str(uuid4())
    data = payload.model_dump()
    data["id"] = urso_id
    # map enums/values as needed
    # validate santuario existence and capacity if provided
    if data.get("santuario_id"):
        s = db.get(Santuario, data["santuario_id"])
        if not s:
            raise conflict_problem("Santuario informado nao existe.")
        # check capacity
        ocup = db.execute(select(func.count()).select_from(Urso).where(Urso.santuario_id == s.id)).scalar_one()
        if ocup >= s.capacidade:
            raise conflict_problem("Santuario atingiu a capacidade maxima.")

    u = Urso(**data)
    db.add(u)
    db.commit()
    db.refresh(u)
    return UrsoResponse(**_orm_to_dict(u))


def update_urso(db: Session, urso_id: str, payload: UrsoPayload) -> UrsoResponse:
    u = db.get(Urso, urso_id)
    if not u:
        raise not_found_problem("Urso nao encontrado.")
    data = payload.model_dump()
    # validate santuario capacity if changing
    if data.get("santuario_id") and data["santuario_id"] != u.santuario_id:
        s = db.get(Santuario, data["santuario_id"])
        if not s:
            raise conflict_problem("Santuario informado nao existe.")
        ocup = db.execute(select(func.count()).select_from(Urso).where(Urso.santuario_id == s.id)).scalar_one()
        # if moving from another santuario, effective occupancy will free one slot
        already_inside = u.santuario_id == data["santuario_id"]
        effective = ocup if not already_inside else max(0, ocup - 1)
        if effective >= s.capacidade:
            raise conflict_problem("Santuario atingiu a capacidade maxima.")

    for k, v in data.items():
        setattr(u, k, v)
    db.commit()
    db.refresh(u)
    return UrsoResponse(**_orm_to_dict(u))


def delete_urso(db: Session, urso_id: str) -> None:
    u = db.get(Urso, urso_id)
    if not u:
        raise not_found_problem("Urso nao encontrado.")
    db.delete(u)
    db.commit()


def _orm_to_dict(u: Urso) -> dict:
    return {
        "id": u.id,
        "nome": u.nome,
        "especie": u.especie,
        "idade_estimada": u.idade_estimada,
        "sexo": u.sexo.value if u.sexo else None,
        "data_resgate": u.data_resgate.isoformat() if u.data_resgate else None,
        "estado_saude": u.estado_saude,
        "status": u.status.value if u.status else None,
        "santuario_id": u.santuario_id,
    }
