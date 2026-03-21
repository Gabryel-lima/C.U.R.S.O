import asyncio
# import os
import sys
from pathlib import Path

import pytest
from httpx import AsyncClient

# Ensure tests import from project's `src` directory
PROJECT_ROOT = Path(__file__).resolve().parents[1]
SRC_PATH = PROJECT_ROOT / "src"
if str(SRC_PATH) not in sys.path:
    sys.path.insert(0, str(SRC_PATH))


@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.new_event_loop()
    yield loop
    loop.close()


@pytest.fixture
async def async_client(monkeypatch):
    # Prevent app from initializing DB or running migrations during tests
    monkeypatch.setenv("INIT_DB", "0")
    monkeypatch.setenv("SKIP_DB_INIT", "1")

    # Import and create app after env is set
    from curso_backend.main import create_app

    app = create_app()
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client


@pytest.fixture
def sync_client(monkeypatch):
    monkeypatch.setenv("INIT_DB", "0")
    monkeypatch.setenv("SKIP_DB_INIT", "1")
    from fastapi.testclient import TestClient
    from curso_backend.main import create_app

    app = create_app()
    with TestClient(app) as client:
        yield client


@pytest.fixture(scope="function")
def db_session():
    """Provide a SQLAlchemy Session with a fresh schema for each test."""
    import os
    os.environ.setdefault("DATABASE_URL", "sqlite+pysqlite:///:memory:")
    from curso_backend.shared.db import Base, engine, SessionLocal

    # Ensure all model modules are imported so relationships are registered
    import curso_backend.features.santuarios.models  # noqa: F401
    import curso_backend.features.cuidadores.models  # noqa: F401
    import curso_backend.features.ursos.models  # noqa: F401
    import curso_backend.features.resgates.models  # noqa: F401

    Base.metadata.create_all(bind=engine)
    try:
        session = SessionLocal()
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)
