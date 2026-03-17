from __future__ import annotations

from fastapi import APIRouter, Depends, Response, status

from curso_backend.features.cuidadores.schemas import CuidadorPayload, CuidadorResponse
from curso_backend.features.cuidadores.service import (
    create_cuidador,
    delete_cuidador,
    get_cuidador,
    list_cuidadores,
    update_cuidador,
)
from curso_backend.shared.dependencies import get_state
from curso_backend.shared.state import AppState


router = APIRouter(prefix="/api/v1/cuidadores", tags=["cuidadores"])


@router.get("", response_model=list[CuidadorResponse])
def list_route(state: AppState = Depends(get_state)) -> list[CuidadorResponse]:
    return list_cuidadores(state)


@router.get("/{cuidador_id}", response_model=CuidadorResponse)
def get_route(
    cuidador_id: str,
    state: AppState = Depends(get_state),
) -> CuidadorResponse:
    return get_cuidador(state, cuidador_id)


@router.post("", response_model=CuidadorResponse, status_code=status.HTTP_201_CREATED)
def create_route(
    payload: CuidadorPayload,
    state: AppState = Depends(get_state),
) -> CuidadorResponse:
    return create_cuidador(state, payload)


@router.put("/{cuidador_id}", response_model=CuidadorResponse)
def update_route(
    cuidador_id: str,
    payload: CuidadorPayload,
    state: AppState = Depends(get_state),
) -> CuidadorResponse:
    return update_cuidador(state, cuidador_id, payload)


@router.delete("/{cuidador_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_route(
    cuidador_id: str,
    state: AppState = Depends(get_state),
) -> Response:
    delete_cuidador(state, cuidador_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)