from fastapi import FastAPI

app = FastAPI(
    title="C.U.R.S.O API",
    description="API inicial do projeto Centro de União, Resgate e Santuário dos Ursos.",
    version="0.1.0",
)


@app.get("/", tags=["root"])
def read_root() -> dict[str, str]:
    return {"project": "C.U.R.S.O", "status": "ok"}


@app.get("/health/live", tags=["health"])
def health_live() -> dict[str, str]:
    return {"status": "alive"}
