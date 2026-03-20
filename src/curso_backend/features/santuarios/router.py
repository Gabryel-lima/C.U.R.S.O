from __future__ import annotations

from fastapi import APIRouter, Depends, Response, status

from curso_backend.features.santuarios.schemas import SantuarioPayload, SantuarioResponse
from curso_backend.features.santuarios import service_db as service
from curso_backend.shared.deps_db import get_db
from sqlalchemy.orm import Session


router = APIRouter(prefix="/api/v1/santuarios", tags=["santuarios"])


@router.get("", response_model=list[SantuarioResponse])
def list_route(db: Session = Depends(get_db)) -> list[SantuarioResponse]:
    return service.list_santuarios(db)


@router.get("/{santuario_id}", response_model=SantuarioResponse)
def get_route(santuario_id: str, db: Session = Depends(get_db)) -> SantuarioResponse:
    return service.get_santuario(db, santuario_id)


@router.post("", response_model=SantuarioResponse, status_code=status.HTTP_201_CREATED)
def create_route(payload: SantuarioPayload, db: Session = Depends(get_db)) -> SantuarioResponse:
    return service.create_santuario(db, payload)


@router.put("/{santuario_id}", response_model=SantuarioResponse)
def update_route(santuario_id: str, payload: SantuarioPayload, db: Session = Depends(get_db)) -> SantuarioResponse:
    return service.update_santuario(db, santuario_id, payload)


@router.delete("/{santuario_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_route(santuario_id: str, db: Session = Depends(get_db)) -> Response:
    service.delete_santuario(db, santuario_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
