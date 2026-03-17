from __future__ import annotations

from curso_backend.features.santuarios.schemas import SantuarioPayload, SantuarioResponse
from curso_backend.shared.problem import conflict_problem, not_found_problem
from curso_backend.shared.state import AppState


def _response(state: AppState, item: dict[str, object]) -> SantuarioResponse:
    return SantuarioResponse(**item, ocupacao=state.santuario_occupacao(item["id"]))


def list_santuarios(state: AppState) -> list[SantuarioResponse]:
    return [_response(state, item) for item in state.santuarios.values()]


def get_santuario(state: AppState, santuario_id: str) -> SantuarioResponse:
    item = state.santuarios.get(santuario_id)
    if item is None:
        raise not_found_problem("Santuario nao encontrado.")
    return _response(state, item)


def create_santuario(state: AppState, payload: SantuarioPayload) -> SantuarioResponse:
    santuario_id = state.new_id()
    item = {"id": santuario_id, **payload.model_dump()}
    state.santuarios[santuario_id] = item
    return _response(state, item)


def update_santuario(
    state: AppState,
    santuario_id: str,
    payload: SantuarioPayload,
) -> SantuarioResponse:
    existing = state.santuarios.get(santuario_id)
    if existing is None:
        raise not_found_problem("Santuario nao encontrado.")

    ocupacao = state.santuario_occupacao(santuario_id)
    if payload.capacidade < ocupacao:
        raise conflict_problem("Capacidade nao pode ser menor que a ocupacao atual.")

    updated = {"id": santuario_id, **payload.model_dump()}
    state.santuarios[santuario_id] = updated
    return _response(state, updated)


def delete_santuario(state: AppState, santuario_id: str) -> None:
    if santuario_id not in state.santuarios:
        raise not_found_problem("Santuario nao encontrado.")
    if state.santuario_has_links(santuario_id):
        raise conflict_problem("Santuario possui vinculos ativos.")
    del state.santuarios[santuario_id]