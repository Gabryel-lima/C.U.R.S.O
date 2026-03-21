from __future__ import annotations

import os
import re
import uuid
from typing import List

# Ensure DATABASE_URL is read by shared.db with intended value
DB_PATH = os.environ.get("DATABASE_URL", "sqlite:///./curso.db")
os.environ["DATABASE_URL"] = DB_PATH

from curso_backend.shared import db as shared_db
from curso_backend.features.ursos.models import Urso, Sexo, StatusUrso
from curso_backend.shared.db import SessionLocal
# Ensure other feature models are imported so metadata includes all tables
import curso_backend.features.santuarios.models  # noqa: F401
import curso_backend.features.cuidadores.models  # noqa: F401
import curso_backend.features.resgates.models  # noqa: F401


def parse_insert_values(sql: str, table: str) -> List[List[str]]:
    # Find the INSERT INTO <table>(...) VALUES ( ... ); block
    pattern = re.compile(rf"INSERT INTO\s+{table}\s*\([^)]*\)\s*VALUES\s*(.*?);", re.IGNORECASE | re.S)
    m = pattern.search(sql)
    if not m:
        return []
    values_block = m.group(1).strip()
    # Normalize: remove newlines between tuples
    # Split tuples by '),(' patterns while keeping inner commas
    tuples = re.findall(r"\(([^)]+)\)", values_block, re.S)
    rows = []
    for t in tuples:
        # Split on commas that are outside quotes
        parts = re.findall(r"'((?:\\'|[^'])*)'|([^,]+)", t)
        # parts is list of tuples; choose non-empty group
        clean = []
        for a, b in parts:
            v = a if a != "" else b
            if v is None:
                v = ""
            clean.append(v.strip())
        rows.append(clean)
    return rows


def sexo_map(val: str) -> Sexo:
    val = val.lower()
    if "mascul" in val:
        return Sexo.macho
    if "femin" in val:
        return Sexo.femea
    return Sexo.indefinido


def seed_ursos(sql_path: str = None) -> int:
    if sql_path is None:
        # Walk up from this file to find the repository `sql/valores.sql`
        current = os.path.dirname(__file__)
        found = None
        for _ in range(6):
            candidate = os.path.join(current, "sql", "valores.sql")
            if os.path.exists(candidate):
                found = candidate
                break
            current = os.path.dirname(current)
        if found is None:
            raise FileNotFoundError("Could not locate sql/valores.sql from script location")
        sql_path = found

    with open(sql_path, "r", encoding="utf-8") as f:
        sql = f.read()

    rows = parse_insert_values(sql, "urso")
    if not rows:
        print("No urso INSERTs found in", sql_path)
        return 0

    # Ensure tables exist
    shared_db.init_db()

    inserted = 0
    session = SessionLocal()
    try:
        for row in rows:
            # Expected order in SQL: nome,especie,idade,sexo
            if len(row) < 4:
                continue
            nome = row[0]
            especie = row[1]
            try:
                idade = int(row[2])
            except Exception:
                idade = None
            sexo = sexo_map(row[3])
            u = Urso(
                id=str(uuid.uuid4()),
                nome=nome,
                especie=especie,
                idade_estimada=idade,
                sexo=sexo,
                data_resgate=None,
                estado_saude=None,
                status=StatusUrso.apto,
            )
            session.add(u)
            inserted += 1
        session.commit()
    finally:
        session.close()

    print(f"Inserted {inserted} urso records into DB ({DB_PATH})")
    return inserted


if __name__ == "__main__":
    import argparse

    p = argparse.ArgumentParser(description="Seed ursoss from sql/valores.sql into DB")
    p.add_argument("--sql", help="Path to valores.sql", default=None)
    p.add_argument("--db", help="DATABASE_URL to use", default=None)
    args = p.parse_args()
    if args.db:
        os.environ["DATABASE_URL"] = args.db
    seed_ursos(args.sql)
