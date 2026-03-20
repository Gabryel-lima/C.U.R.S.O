from __future__ import annotations

from fastapi import APIRouter, Depends, Response, status

from curso_backend.features.cuidadores.schemas import CuidadorPayload, CuidadorResponse
from curso_backend.features.cuidadores import service_db as service
from curso_backend.shared.deps_db import get_db
from sqlalchemy.orm import Session


router = APIRouter(prefix="/api/v1/cuidadores", tags=["cuidadores"])


@router.get("", response_model=list[CuidadorResponse])
def list_route(db: Session = Depends(get_db)) -> list[CuidadorResponse]:
    return service.list_cuidadores(db)


@router.get("/{cuidador_id}", response_model=CuidadorResponse)
def get_route(cuidador_id: str, db: Session = Depends(get_db)) -> CuidadorResponse:
    return service.get_cuidador(db, cuidador_id)


@router.post("", response_model=CuidadorResponse, status_code=status.HTTP_201_CREATED)
def create_route(payload: CuidadorPayload, db: Session = Depends(get_db)) -> CuidadorResponse:
    return service.create_cuidador(db, payload)


@router.put("/{cuidador_id}", response_model=CuidadorResponse)
def update_route(cuidador_id: str, payload: CuidadorPayload, db: Session = Depends(get_db)) -> CuidadorResponse:
    return service.update_cuidador(db, cuidador_id, payload)


@router.delete("/{cuidador_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_route(cuidador_id: str, db: Session = Depends(get_db)) -> Response:
    service.delete_cuidador(db, cuidador_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
