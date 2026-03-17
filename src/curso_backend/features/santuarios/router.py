from __future__ import annotations

from fastapi import APIRouter, Depends, Response, status

from curso_backend.features.santuarios.schemas import SantuarioPayload, SantuarioResponse
from curso_backend.features.santuarios.service import (
    create_santuario,
    delete_santuario,
    get_santuario,
    list_santuarios,
    update_santuario,
)
from curso_backend.shared.dependencies import get_state
from curso_backend.shared.state import AppState


router = APIRouter(prefix="/api/v1/santuarios", tags=["santuarios"])


@router.get("", response_model=list[SantuarioResponse])
def list_route(state: AppState = Depends(get_state)) -> list[SantuarioResponse]:
    return list_santuarios(state)


@router.get("/{santuario_id}", response_model=SantuarioResponse)
def get_route(
    santuario_id: str,
    state: AppState = Depends(get_state),
) -> SantuarioResponse:
    return get_santuario(state, santuario_id)


@router.post("", response_model=SantuarioResponse, status_code=status.HTTP_201_CREATED)
def create_route(
    payload: SantuarioPayload,
    state: AppState = Depends(get_state),
) -> SantuarioResponse:
    return create_santuario(state, payload)


@router.put("/{santuario_id}", response_model=SantuarioResponse)
def update_route(
    santuario_id: str,
    payload: SantuarioPayload,
    state: AppState = Depends(get_state),
) -> SantuarioResponse:
    return update_santuario(state, santuario_id, payload)


@router.delete("/{santuario_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_route(
    santuario_id: str,
    state: AppState = Depends(get_state),
) -> Response:
    delete_santuario(state, santuario_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)