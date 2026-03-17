from __future__ import annotations

from curso_backend.features.ursos.schemas import UrsoPayload, UrsoResponse
from curso_backend.shared.problem import conflict_problem, not_found_problem
from curso_backend.shared.state import AppState


def list_ursos(state: AppState) -> list[UrsoResponse]:
    return [UrsoResponse(**item) for item in state.ursos.values()]


def get_urso(state: AppState, urso_id: str) -> UrsoResponse:
    item = state.ursos.get(urso_id)
    if item is None:
        raise not_found_problem("Urso nao encontrado.")
    return UrsoResponse(**item)


def _ensure_santuario_assignment(state: AppState, santuario_id: str | None) -> None:
    if santuario_id is None:
        return
    santuario = state.santuarios.get(santuario_id)
    if santuario is None:
        raise conflict_problem("Santuario informado nao existe.")
    if state.santuario_occupacao(santuario_id) >= santuario["capacidade"]:
        raise conflict_problem("Santuario atingiu a capacidade maxima.")


def _ensure_santuario_capacity_for_update(
    state: AppState,
    urso_id: str,
    santuario_id: str | None,
) -> None:
    if santuario_id is None:
        return
    santuario = state.santuarios.get(santuario_id)
    if santuario is None:
        raise conflict_problem("Santuario informado nao existe.")

    ocupacao = state.santuario_occupacao(santuario_id)
    current = state.ursos.get(urso_id)
    already_inside = current is not None and current.get("santuario_id") == santuario_id
    effective_occupacao = ocupacao if not already_inside else ocupacao - 1
    if effective_occupacao >= santuario["capacidade"]:
        raise conflict_problem("Santuario atingiu a capacidade maxima.")


def create_urso(state: AppState, payload: UrsoPayload) -> UrsoResponse:
    _ensure_santuario_assignment(state, payload.santuario_id)

    urso_id = state.new_id()
    item = {"id": urso_id, **payload.model_dump()}
    state.ursos[urso_id] = item
    return UrsoResponse(**item)


def update_urso(state: AppState, urso_id: str, payload: UrsoPayload) -> UrsoResponse:
    if urso_id not in state.ursos:
        raise not_found_problem("Urso nao encontrado.")

    _ensure_santuario_capacity_for_update(state, urso_id, payload.santuario_id)
    updated = {"id": urso_id, **payload.model_dump()}
    state.ursos[urso_id] = updated
    return UrsoResponse(**updated)


def delete_urso(state: AppState, urso_id: str) -> None:
    if urso_id not in state.ursos:
        raise not_found_problem("Urso nao encontrado.")
    if state.urso_has_links(urso_id):
        raise conflict_problem("Urso possui vinculos ativos.")
    del state.ursos[urso_id]