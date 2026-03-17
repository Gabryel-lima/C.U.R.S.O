from __future__ import annotations

from curso_backend.features.cuidadores.schemas import CuidadorPayload, CuidadorResponse
from curso_backend.shared.problem import conflict_problem, not_found_problem
from curso_backend.shared.state import AppState


def list_cuidadores(state: AppState) -> list[CuidadorResponse]:
    return [CuidadorResponse(**item) for item in state.cuidadores.values()]


def get_cuidador(state: AppState, cuidador_id: str) -> CuidadorResponse:
    item = state.cuidadores.get(cuidador_id)
    if item is None:
        raise not_found_problem("Cuidador nao encontrado.")
    return CuidadorResponse(**item)


def _ensure_unique_email(
    state: AppState,
    email: str,
    *,
    excluding_cuidador_id: str | None = None,
) -> None:
    for current_id, item in state.cuidadores.items():
        if excluding_cuidador_id and current_id == excluding_cuidador_id:
            continue
        if item["email"] == email:
            raise conflict_problem("Ja existe cuidador com este email.")


def _ensure_santuario_exists(state: AppState, santuario_id: str | None) -> None:
    if santuario_id is None:
        return
    if santuario_id not in state.santuarios:
        raise conflict_problem("Santuario informado nao existe.")


def create_cuidador(state: AppState, payload: CuidadorPayload) -> CuidadorResponse:
    _ensure_unique_email(state, payload.email)
    _ensure_santuario_exists(state, payload.santuario_id)

    cuidador_id = state.new_id()
    item = {"id": cuidador_id, **payload.model_dump()}
    state.cuidadores[cuidador_id] = item
    return CuidadorResponse(**item)


def update_cuidador(
    state: AppState,
    cuidador_id: str,
    payload: CuidadorPayload,
) -> CuidadorResponse:
    if cuidador_id not in state.cuidadores:
        raise not_found_problem("Cuidador nao encontrado.")

    _ensure_unique_email(state, payload.email, excluding_cuidador_id=cuidador_id)
    _ensure_santuario_exists(state, payload.santuario_id)

    updated = {"id": cuidador_id, **payload.model_dump()}
    state.cuidadores[cuidador_id] = updated
    return CuidadorResponse(**updated)


def delete_cuidador(state: AppState, cuidador_id: str) -> None:
    if cuidador_id not in state.cuidadores:
        raise not_found_problem("Cuidador nao encontrado.")
    if state.cuidador_has_links(cuidador_id):
        raise conflict_problem("Cuidador possui vinculos ativos.")
    del state.cuidadores[cuidador_id]