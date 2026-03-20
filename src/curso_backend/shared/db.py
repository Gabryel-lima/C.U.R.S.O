from __future__ import annotations

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.pool import StaticPool

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite+pysqlite:///:memory:")

engine = create_engine(
    DATABASE_URL,
    future=True,
    echo=False,
    # For in-memory SQLite we must use StaticPool so the same in-memory DB is
    # shared across all connections (tests and app threads). For file-based
    # SQLite or other DBs use default pool behavior.
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
    poolclass=StaticPool if DATABASE_URL.startswith("sqlite") and ":memory:" in DATABASE_URL else None,
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
Base = declarative_base()

def init_db():
    Base.metadata.create_all(bind=engine)


# By default create tables on import to support test runs and simple dev setups.
# Set environment variable `SKIP_DB_INIT=1` to avoid automatic creation (e.g.,
# when migrations are managed separately in production).
if os.environ.get("SKIP_DB_INIT", "0") != "1":
    init_db()
