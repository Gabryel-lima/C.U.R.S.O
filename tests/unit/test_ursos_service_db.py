from datetime import date

import pytest

from curso_backend.features.ursos.schemas import UrsoPayload
from curso_backend.features.ursos import service_db as svc
from curso_backend.features.santuarios.models import Santuario


def make_santuario_dict(id_: str, capacidade: int = 1):
    return {"id": id_, "nome": "S1", "pais": "BR", "estado": "SP", "capacidade": capacidade}


def test_create_and_get_urso(db_session):
    # create santuario
    s = Santuario(**make_santuario_dict("s1", capacidade=2))
    db_session.add(s)
    db_session.commit()

    payload = UrsoPayload(
        nome="Balu",
        especie="ursa",
        sexo="macho",
        idade_estimada=5,
        status="apto",
        santuario_id="s1",
        data_resgate=date(2020, 1, 1),
        estado_saude="boa",
    )

    resp = svc.create_urso(db_session, payload)
    assert resp.nome == "Balu"

    fetched = svc.get_urso(db_session, resp.id)
    assert fetched.id == resp.id


def test_capacity_conflict_on_create(db_session):
    s = Santuario(**make_santuario_dict("s2", capacidade=1))
    db_session.add(s)
    db_session.commit()

    p1 = UrsoPayload(
        nome="U1",
        especie="ursa",
        sexo="macho",
        idade_estimada=3,
        status="apto",
        santuario_id="s2",
    )
    svc.create_urso(db_session, p1)

    p2 = UrsoPayload(
        nome="U2",
        especie="ursa",
        sexo="macho",
        idade_estimada=4,
        status="apto",
        santuario_id="s2",
    )

    with pytest.raises(Exception):
        svc.create_urso(db_session, p2)


def test_update_urso_capacity_checks(db_session):
    s1 = Santuario(**make_santuario_dict("s3", capacidade=1))
    s2 = Santuario(**make_santuario_dict("s4", capacidade=1))
    db_session.add_all([s1, s2])
    db_session.commit()

    p1 = UrsoPayload(
        nome="U3",
        especie="ursa",
        sexo="macho",
        idade_estimada=2,
        status="apto",
        santuario_id="s3",
    )
    created = svc.create_urso(db_session, p1)

    # attempt to move to s4 (empty) should succeed
    p_update = UrsoPayload(
        nome=created.nome,
        especie=created.especie,
        sexo=created.sexo,
        idade_estimada=created.idade_estimada,
        status=created.status,
        santuario_id="s4",
    )
    updated = svc.update_urso(db_session, created.id, p_update)
    assert updated.santuario_id == "s4"


def test_delete_urso_not_found(db_session):
    with pytest.raises(Exception):
        svc.delete_urso(db_session, "nonexistent")
