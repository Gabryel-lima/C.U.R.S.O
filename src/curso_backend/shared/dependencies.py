from __future__ import annotations

from fastapi import Request

from curso_backend.shared.state import AppState


def get_state(request: Request) -> AppState:
    return request.app.state.store