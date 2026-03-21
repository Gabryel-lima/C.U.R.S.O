import os
# from sqlalchemy.orm import Session
import pytest


@pytest.fixture(scope="function")
def db_session():
    """Provide a SQLAlchemy Session with a fresh schema for each test."""
    # Ensure in-memory DB is used
    os.environ.setdefault("DATABASE_URL", "sqlite+pysqlite:///:memory:")
    # Import here so shared.db picks up env vars
    from curso_backend.shared.db import Base, engine, SessionLocal

    # Create schema
    Base.metadata.create_all(bind=engine)
    try:
        session = SessionLocal()
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)
