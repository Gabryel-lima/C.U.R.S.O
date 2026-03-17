from __future__ import annotations

from fastapi import APIRouter, Depends, Response, status

from curso_backend.features.resgates.schemas import ResgatePayload, ResgateResponse
from curso_backend.features.resgates.service import (
    create_resgate,
    delete_resgate,
    get_resgate,
    list_resgates,
    update_resgate,
)
from curso_backend.shared.dependencies import get_state
from curso_backend.shared.state import AppState


router = APIRouter(prefix="/api/v1/resgates", tags=["resgates"])


@router.get("", response_model=list[ResgateResponse])
def list_route(state: AppState = Depends(get_state)) -> list[ResgateResponse]:
    return list_resgates(state)


@router.get("/{resgate_id}", response_model=ResgateResponse)
def get_route(
    resgate_id: str,
    state: AppState = Depends(get_state),
) -> ResgateResponse:
    return get_resgate(state, resgate_id)


@router.post("", response_model=ResgateResponse, status_code=status.HTTP_201_CREATED)
def create_route(
    payload: ResgatePayload,
    state: AppState = Depends(get_state),
) -> ResgateResponse:
    return create_resgate(state, payload)


@router.put("/{resgate_id}", response_model=ResgateResponse)
def update_route(
    resgate_id: str,
    payload: ResgatePayload,
    state: AppState = Depends(get_state),
) -> ResgateResponse:
    return update_resgate(state, resgate_id, payload)


@router.delete("/{resgate_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_route(
    resgate_id: str,
    state: AppState = Depends(get_state),
) -> Response:
    delete_resgate(state, resgate_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)