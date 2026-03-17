from __future__ import annotations

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from curso_backend.features.cuidadores.router import router as cuidadores_router
from curso_backend.features.resgates.router import router as resgates_router
from curso_backend.features.santuarios.router import router as santuarios_router
from curso_backend.features.ursos.router import router as ursos_router
from curso_backend.shared.problem import ApiProblem, validation_problem
from curso_backend.shared.state import AppState


def create_app() -> FastAPI:
    app = FastAPI(
        title="C.U.R.S.O API",
        description="API inicial do projeto Centro de Uniao, Resgate e Santuario dos Ursos.",
        version="0.2.0",
    )
    app.state.store = AppState()

    @app.exception_handler(ApiProblem)
    async def handle_api_problem(request: Request, exc: ApiProblem) -> JSONResponse:
        return JSONResponse(status_code=exc.status, content=exc.payload(request.url.path))

    @app.exception_handler(RequestValidationError)
    async def handle_validation_error(
        request: Request,
        exc: RequestValidationError,
    ) -> JSONResponse:
        return JSONResponse(status_code=422, content=validation_problem(request.url.path))

    @app.get("/", tags=["root"])
    def read_root() -> dict[str, str]:
        return {"project": "C.U.R.S.O", "status": "ok"}

    @app.get("/health/live", tags=["health"])
    def health_live() -> dict[str, str]:
        return {"status": "alive"}

    app.include_router(santuarios_router)
    app.include_router(cuidadores_router)
    app.include_router(ursos_router)
    app.include_router(resgates_router)

    return app


app = create_app()
