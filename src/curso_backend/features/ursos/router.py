from __future__ import annotations

from fastapi import APIRouter, Depends, Response, status

from curso_backend.features.ursos.schemas import UrsoPayload, UrsoResponse
from curso_backend.features.ursos.service_db import (
    create_urso,
    delete_urso,
    get_urso,
    list_ursos,
    update_urso,
)
from curso_backend.shared.deps_db import get_db
from sqlalchemy.orm import Session


router = APIRouter(prefix="/api/v1/ursos", tags=["ursos"])


@router.get("", response_model=list[UrsoResponse])
def list_route(limit: int = 100, db: Session = Depends(get_db)) -> list[UrsoResponse]:
    return list_ursos(db, limit=limit)


@router.get("/{urso_id}", response_model=UrsoResponse)
def get_route(urso_id: str, db: Session = Depends(get_db)) -> UrsoResponse:
    return get_urso(db, urso_id)


@router.post("", response_model=UrsoResponse, status_code=status.HTTP_201_CREATED)
def create_route(payload: UrsoPayload, db: Session = Depends(get_db)) -> UrsoResponse:
    return create_urso(db, payload)


@router.put("/{urso_id}", response_model=UrsoResponse)
def update_route(urso_id: str, payload: UrsoPayload, db: Session = Depends(get_db)) -> UrsoResponse:
    return update_urso(db, urso_id, payload)


@router.delete("/{urso_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_route(urso_id: str, db: Session = Depends(get_db)) -> Response:
    delete_urso(db, urso_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
