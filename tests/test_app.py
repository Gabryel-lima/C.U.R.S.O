from fastapi.testclient import TestClient

from curso_backend.main import app


client = TestClient(app)


def test_root_returns_project_status() -> None:
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {"project": "C.U.R.S.O", "status": "ok"}


def test_health_live_returns_alive_status() -> None:
    response = client.get("/health/live")

    assert response.status_code == 200
    assert response.json() == {"status": "alive"}
