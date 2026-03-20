from __future__ import annotations
import pytest
from fastapi.testclient import TestClient

import os
import sys
from pathlib import Path

# Ensure tests import from project's `src` directory
PROJECT_ROOT = Path(__file__).resolve().parents[1]
SRC_PATH = PROJECT_ROOT / "src"
if str(SRC_PATH) not in sys.path:
    sys.path.insert(0, str(SRC_PATH))

# Ensure tests use an in-memory SQLite DB and enable DB init
os.environ.setdefault("DATABASE_URL", "sqlite+pysqlite:///:memory:")
os.environ.setdefault("INIT_DB", "1")
os.environ.setdefault("SKIP_DB_INIT", "0")


@pytest.fixture(scope="session")
def app():
    # Import create_app lazily after env vars are set
    from src.curso_backend.main import create_app

    return create_app()


@pytest.fixture(scope="function")
def client(app):
    # Create fresh schema for each test to ensure isolation
    from curso_backend.shared.db import Base, engine

    # Ensure all model modules are imported so their tables are registered
    # with the shared `Base` before creating the schema.
    import curso_backend.features.santuarios.models  # noqa: F401
    import curso_backend.features.cuidadores.models  # noqa: F401
    import curso_backend.features.ursos.models  # noqa: F401
    import curso_backend.features.resgates.models  # noqa: F401

    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c
    Base.metadata.drop_all(bind=engine)
