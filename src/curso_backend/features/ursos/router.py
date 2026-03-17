from __future__ import annotations

from fastapi import APIRouter, Depends, Response, status

from curso_backend.features.ursos.schemas import UrsoPayload, UrsoResponse
from curso_backend.features.ursos.service import (
    create_urso,
    delete_urso,
    get_urso,
    list_ursos,
    update_urso,
)
from curso_backend.shared.dependencies import get_state
from curso_backend.shared.state import AppState


router = APIRouter(prefix="/api/v1/ursos", tags=["ursos"])


@router.get("", response_model=list[UrsoResponse])
def list_route(state: AppState = Depends(get_state)) -> list[UrsoResponse]:
    return list_ursos(state)


@router.get("/{urso_id}", response_model=UrsoResponse)
def get_route(urso_id: str, state: AppState = Depends(get_state)) -> UrsoResponse:
    return get_urso(state, urso_id)


@router.post("", response_model=UrsoResponse, status_code=status.HTTP_201_CREATED)
def create_route(
    payload: UrsoPayload,
    state: AppState = Depends(get_state),
) -> UrsoResponse:
    return create_urso(state, payload)


@router.put("/{urso_id}", response_model=UrsoResponse)
def update_route(
    urso_id: str,
    payload: UrsoPayload,
    state: AppState = Depends(get_state),
) -> UrsoResponse:
    return update_urso(state, urso_id, payload)


@router.delete("/{urso_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_route(urso_id: str, state: AppState = Depends(get_state)) -> Response:
    delete_urso(state, urso_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)