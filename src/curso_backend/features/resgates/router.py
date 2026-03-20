from __future__ import annotations

from fastapi import APIRouter, Depends, Response, status

from curso_backend.features.resgates.schemas import ResgatePayload, ResgateResponse
from curso_backend.features.resgates import service_db as service
from curso_backend.shared.deps_db import get_db
from sqlalchemy.orm import Session


router = APIRouter(prefix="/api/v1/resgates", tags=["resgates"])


@router.get("", response_model=list[ResgateResponse])
def list_route(db: Session = Depends(get_db)) -> list[ResgateResponse]:
    return service.list_resgates(db)


@router.get("/{resgate_id}", response_model=ResgateResponse)
def get_route(resgate_id: str, db: Session = Depends(get_db)) -> ResgateResponse:
    return service.get_resgate(db, resgate_id)


@router.post("", response_model=ResgateResponse, status_code=status.HTTP_201_CREATED)
def create_route(payload: ResgatePayload, db: Session = Depends(get_db)) -> ResgateResponse:
    return service.create_resgate(db, payload)


@router.put("/{resgate_id}", response_model=ResgateResponse)
def update_route(resgate_id: str, payload: ResgatePayload, db: Session = Depends(get_db)) -> ResgateResponse:
    return service.update_resgate(db, resgate_id, payload)


@router.delete("/{resgate_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_route(resgate_id: str, db: Session = Depends(get_db)) -> Response:
    service.delete_resgate(db, resgate_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
