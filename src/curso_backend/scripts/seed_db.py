from __future__ import annotations

import os
import re
import uuid
from datetime import datetime
from typing import List

DB_PATH = os.environ.get("DATABASE_URL", "sqlite:///./curso.db")
os.environ["DATABASE_URL"] = DB_PATH

from curso_backend.shared import db as shared_db
from curso_backend.shared.db import SessionLocal

from curso_backend.features.ursos.models import Urso, Sexo, StatusUrso
from curso_backend.features.cuidadores.models import Cuidador
from curso_backend.features.santuarios.models import Santuario
from curso_backend.features.resgates.models import Resgate, StatusResgate
from curso_backend.features.relatorios.models import (
    Cidadao,
    Atendente,
    Veterinario,
    Ocorrencia,
    Diagnostico,
)

# Import related modules so metadata includes all tables
import curso_backend.features.resgates.models  # noqa: F401
import curso_backend.features.cuidadores.models  # noqa: F401
import curso_backend.features.santuarios.models  # noqa: F401
import curso_backend.features.relatorios.models  # noqa: F401


def parse_insert_values(sql: str, table: str) -> List[List[str]]:
    pattern = re.compile(rf"INSERT INTO\s+{table}\s*\([^)]*\)\s*VALUES\s*(.*?);", re.IGNORECASE | re.S)
    m = pattern.search(sql)
    if not m:
        return []
    values_block = m.group(1)
    tuples = re.findall(r"\(([^)]+)\)", values_block, re.S)
    rows = []
    for t in tuples:
        parts = re.findall(r"'((?:\\'|[^'])*)'|([^,]+)", t)
        clean = []
        for a, b in parts:
            v = a if a != "" else b
            if v is None:
                v = ""
            clean.append(v.strip())
        rows.append(clean)
    return rows


def make_email(name: str, registro: str | None) -> str:
    if registro:
        return f"{registro}@local"
    n = name.lower().replace(" ", ".")
    return f"{n}@local"


def seed_all(sql_path: str | None = None) -> None:
    if sql_path is None:
        # locate valores.sql
        current = os.path.dirname(__file__)
        found = None
        for _ in range(6):
            candidate = os.path.join(current, "sql", "valores.sql")
            if os.path.exists(candidate):
                found = candidate
                break
            current = os.path.dirname(current)
        if found is None:
            # fallback to workspace root
            found = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'sql', 'valores.sql'))
        sql_path = found

    with open(sql_path, "r", encoding="utf-8") as f:
        sql = f.read()

    shared_db.init_db()
    session = SessionLocal()
    try:
        # Clear existing data for tables we manage (order matters due to FKs)
        session.query(Resgate).delete()
        session.query(Diagnostico).delete()
        session.query(Ocorrencia).delete()
        session.query(Urso).delete()
        session.query(Cuidador).delete()
        session.query(Santuario).delete()
        session.query(Atendente).delete()
        session.query(Veterinario).delete()
        session.query(Cidadao).delete()
        session.commit()

        # Ensure santuarios: create a default one
        s = Santuario(id=str(uuid.uuid4()), nome="Santuario Central", pais="Brasil", estado="SP", capacidade=50)
        session.add(s)
        session.commit()

        santuario = s

        # We'll keep maps from original numeric id -> created UUID for mapping relations
        maps: dict[str, dict[int, str]] = {}

        # Helper to seed simple tables capturing orig_id if present
        def seed_simple(table_name: str, model_cls, cols: list[str]):
            rows = parse_insert_values(sql, table_name)
            local_map: dict[int, str] = {}
            for idx, row in enumerate(rows, start=1):
                # try to detect an explicit numeric first column (orig id)
                orig = None
                values = []
                for v in row:
                    # strip surrounding quotes if any
                    vv = v.strip()
                    values.append(vv)
                # If first value is integer and number of columns matches with orig id
                if values and re.fullmatch(r"\d+", values[0]):
                    orig = int(values[0])
                    # remove it if model doesn't expect orig in values sequence
                    # We'll still use orig as mapping key
                    # rest values start at 1
                    payload = values[1:]
                else:
                    payload = values

                # create object based on model fields len; naive mapping by position
                obj_kwargs = {}
                # provide defaults for known models
                if model_cls is Cidadao:
                    nome = payload[0] if len(payload) > 0 else ""
                    numero = payload[1] if len(payload) > 1 else ""
                    obj = Cidadao(id=str(uuid.uuid4()), orig_id=orig, nome=nome, numero=numero)
                elif model_cls is Atendente:
                    nome = payload[0] if len(payload) > 0 else ""
                    registro = payload[1] if len(payload) > 1 else ""
                    obj = Atendente(id=str(uuid.uuid4()), orig_id=orig, nome=nome, registro=registro)
                elif model_cls is Veterinario:
                    nome = payload[0] if len(payload) > 0 else ""
                    registro = payload[1] if len(payload) > 1 else ""
                    obj = Veterinario(id=str(uuid.uuid4()), orig_id=orig, nome=nome, registro=registro)
                else:
                    continue

                session.add(obj)
                session.flush()
                if orig is None:
                    # estimate orig id by insertion index
                    orig = idx
                local_map[orig] = obj.id
            session.commit()
            maps[table_name] = local_map

        # Seed cidadao, atendente, veterinario
        seed_simple("cidadao", Cidadao, ["nome", "numero"])
        seed_simple("atendente", Atendente, ["nome", "registro"])
        seed_simple("veterinario", Veterinario, ["nome", "registro"])

        # Seed cuidadores (existing model) but capture orig index mapping
        cuidador_rows = parse_insert_values(sql, "cuidador")
        cuidador_map: dict[int, str] = {}
        for idx, row in enumerate(cuidador_rows, start=1):
            if len(row) >= 2:
                nome = row[0]
                registro = row[1]
                email = make_email(nome, registro)
                if session.query(Cuidador).filter_by(email=email).first():
                    continue
                # derive telefone from registro digits, pad to 8
                import re as _re
                digits = _re.sub(r"\D", "", registro or "")
                if len(digits) < 8:
                    digits = digits.rjust(8, "0")
                telefone = digits
                c = Cuidador(id=str(uuid.uuid4()), nome=nome, email=email, telefone=telefone, especialidade="geral", santuario_id=santuario.id, ativo=True)
                session.add(c)
                session.flush()
                cuidador_map[idx] = c.id
        session.commit()
        maps["cuidador"] = cuidador_map

        # Seed ursos and capture orig mapping
        urso_rows = parse_insert_values(sql, "urso")
        urso_map: dict[int, str] = {}
        for idx, row in enumerate(urso_rows, start=1):
            if len(row) >= 4:
                nome = row[0]
                especie = row[1]
                try:
                    idade = int(row[2])
                except Exception:
                    idade = None
                sexo_val = row[3].lower()
                sexo = Sexo.macho if "mascul" in sexo_val else (Sexo.femea if "femin" in sexo_val else Sexo.indefinido)
                u = Urso(id=str(uuid.uuid4()), nome=nome, especie=especie, idade_estimada=idade, sexo=sexo, data_resgate=None, estado_saude=None, status=StatusUrso.apto, santuario_id=santuario.id)
                session.add(u)
                session.flush()
                urso_map[idx] = u.id
        session.commit()
        maps["urso"] = urso_map

        # Seed emergencia -> create resgates mapping to urso/cuidador using orig numeric mapping
        emergencia_rows = parse_insert_values(sql, "emergencia")
        for idx, row in enumerate(emergencia_rows, start=1):
            # expected: id_cidadao, localizacao, informacao
            if len(row) >= 3:
                try:
                    orig_cid = int(row[0])
                except Exception:
                    orig_cid = None
                local = row[1]
                inform = row[2]
                # choose urso by same index if available
                urso_uuid = maps.get("urso", {}).get(idx) or next(iter(maps.get("urso", {}).values()), None)
                cuidador_uuid = maps.get("cuidador", {}).get(1)
                exists = session.query(Resgate).filter_by(local=local, descricao=inform).first()
                if exists:
                    continue
                r = Resgate(id=str(uuid.uuid4()), urso_id=urso_uuid, cuidador_id=cuidador_uuid, local=local, data_resgate=datetime.utcnow().date(), condicao_saude="desconhecida", status=StatusResgate.aberto, descricao=inform)
                session.add(r)

        session.commit()

        # Seed ocorrencia rows and diagnostico, preserving orig ids and mapping to UUID refs via maps
        ocorrencia_rows = parse_insert_values(sql, "ocorrencia")
        for idx, row in enumerate(ocorrencia_rows, start=1):
            # ocorrencia(id_atendente,data_resgate,informacao)
            if len(row) >= 3:
                try:
                    orig_atendente = int(row[0])
                except Exception:
                    orig_atendente = None
                data_res = None
                try:
                    data_res = datetime.fromisoformat(row[1]).date()
                except Exception:
                    data_res = None
                info = row[2]
                o = Ocorrencia(id=str(uuid.uuid4()), orig_id=idx, id_atendente=orig_atendente, data_resgate=data_res, informacao=info)
                session.add(o)

        session.commit()

        diagnostico_rows = parse_insert_values(sql, "diagnostico")
        for idx, row in enumerate(diagnostico_rows, start=1):
            # diagnostico(id_veterinario,id_cuidador,id_urso,data_resgate,estado_saude,tratamento,status_atual)
            if len(row) >= 7:
                try:
                    orig_vet = int(row[0])
                except Exception:
                    orig_vet = None
                try:
                    orig_cuidador = int(row[1])
                except Exception:
                    orig_cuidador = None
                try:
                    orig_urso = int(row[2])
                except Exception:
                    orig_urso = None
                dt = None
                try:
                    dt = datetime.fromisoformat(row[3])
                except Exception:
                    dt = None
                estado = row[4]
                tratamento = row[5]
                status_atual = row[6]
                d = Diagnostico(id=str(uuid.uuid4()), orig_id=idx, id_veterinario=orig_vet, id_cuidador=orig_cuidador, id_urso=orig_urso, data_resgate=dt, estado_saude=estado, tratamento=tratamento, status_atual=status_atual)
                session.add(d)

        session.commit()
        print("Seeding complete: santuarios, cuidadores, ursos, resgates, cidadao, atendente, veterinario, ocorrencia, diagnostico")
    finally:
        session.close()


if __name__ == "__main__":
    import argparse

    p = argparse.ArgumentParser()
    p.add_argument("--sql", default=None)
    p.add_argument("--db", default=None)
    args = p.parse_args()
    if args.db:
        os.environ["DATABASE_URL"] = args.db
    seed_all(args.sql)
