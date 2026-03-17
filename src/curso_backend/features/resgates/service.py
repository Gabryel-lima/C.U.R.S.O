from __future__ import annotations

from curso_backend.features.resgates.schemas import ResgatePayload, ResgateResponse
from curso_backend.shared.problem import conflict_problem, not_found_problem
from curso_backend.shared.state import AppState


def list_resgates(state: AppState) -> list[ResgateResponse]:
    return [ResgateResponse(**item) for item in state.resgates.values()]


def get_resgate(state: AppState, resgate_id: str) -> ResgateResponse:
    item = state.resgates.get(resgate_id)
    if item is None:
        raise not_found_problem("Resgate nao encontrado.")
    return ResgateResponse(**item)


def _ensure_relations(state: AppState, payload: ResgatePayload) -> None:
    if payload.urso_id not in state.ursos:
        raise conflict_problem("Urso informado nao existe.")
    if payload.cuidador_id is not None and payload.cuidador_id not in state.cuidadores:
        raise conflict_problem("Cuidador informado nao existe.")


def _ensure_active_conflict(
    state: AppState,
    payload: ResgatePayload,
    *,
    excluding_resgate_id: str | None = None,
) -> None:
    if payload.status == "encerrado":
        return
    if state.has_active_resgate_for_urso(
        payload.urso_id,
        excluding_resgate_id=excluding_resgate_id,
    ):
        raise conflict_problem("Ja existe resgate ativo para este urso.")


def create_resgate(state: AppState, payload: ResgatePayload) -> ResgateResponse:
    _ensure_relations(state, payload)
    _ensure_active_conflict(state, payload)

    resgate_id = state.new_id()
    item = {"id": resgate_id, **payload.model_dump(mode="json")}
    state.resgates[resgate_id] = item
    return ResgateResponse(**item)


def update_resgate(
    state: AppState,
    resgate_id: str,
    payload: ResgatePayload,
) -> ResgateResponse:
    if resgate_id not in state.resgates:
        raise not_found_problem("Resgate nao encontrado.")

    _ensure_relations(state, payload)
    _ensure_active_conflict(state, payload, excluding_resgate_id=resgate_id)

    updated = {"id": resgate_id, **payload.model_dump(mode="json")}
    state.resgates[resgate_id] = updated
    return ResgateResponse(**updated)


def delete_resgate(state: AppState, resgate_id: str) -> None:
    if resgate_id not in state.resgates:
        raise not_found_problem("Resgate nao encontrado.")
    del state.resgates[resgate_id]