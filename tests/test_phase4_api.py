from __future__ import annotations

from fastapi.testclient import TestClient

from src.curso_backend.main import create_app


def create_client() -> TestClient:
    return TestClient(create_app())


def test_santuarios_crud_flow() -> None:
    client = create_client()

    create_response = client.post(
        "/api/v1/santuarios",
        json={
            "nome": "Refugio Norte",
            "pais": "Brasil",
            "estado": "Amazonas",
            "capacidade": 12,
        },
    )

    assert create_response.status_code == 201
    created = create_response.json()
    assert created["nome"] == "Refugio Norte"
    assert created["ocupacao"] == 0

    list_response = client.get("/api/v1/santuarios")
    assert list_response.status_code == 200
    assert len(list_response.json()) == 1

    santuario_id = created["id"]
    update_response = client.put(
        f"/api/v1/santuarios/{santuario_id}",
        json={
            "nome": "Refugio Norte",
            "pais": "Brasil",
            "estado": "Para",
            "capacidade": 15,
        },
    )

    assert update_response.status_code == 200
    assert update_response.json()["estado"] == "Para"
    assert update_response.json()["capacidade"] == 15

    delete_response = client.delete(f"/api/v1/santuarios/{santuario_id}")
    assert delete_response.status_code == 204


def test_cuidador_duplicate_email_returns_conflict() -> None:
    client = create_client()

    payload = {
        "nome": "Lia Rocha",
        "email": "lia@curso.local",
        "telefone": "+55 11 99999-0000",
        "especialidade": "reabilitacao",
    }

    first_response = client.post("/api/v1/cuidadores", json=payload)
    second_response = client.post("/api/v1/cuidadores", json=payload)

    assert first_response.status_code == 201
    assert second_response.status_code == 409
    assert second_response.json()["title"] == "Conflict"


def test_urso_requires_existing_santuario_when_informed() -> None:
    client = create_client()

    response = client.post(
        "/api/v1/ursos",
        json={
            "nome": "Bento",
            "especie": "urso-pardo",
            "sexo": "macho",
            "idade_estimada": 7,
            "status": "em_tratamento",
            "santuario_id": "11111111-1111-1111-1111-111111111111",
        },
    )

    assert response.status_code == 409
    assert response.json()["detail"] == "Santuario informado nao existe."


def test_resgate_crud_flow_and_active_rescue_conflict() -> None:
    client = create_client()

    santuario = client.post(
        "/api/v1/santuarios",
        json={
            "nome": "Vale Verde",
            "pais": "Brasil",
            "estado": "Parana",
            "capacidade": 8,
        },
    ).json()

    cuidador = client.post(
        "/api/v1/cuidadores",
        json={
            "nome": "Bruno Vale",
            "email": "bruno@curso.local",
            "telefone": "+55 41 98888-0000",
            "especialidade": "campo",
            "santuario_id": santuario["id"],
        },
    ).json()

    urso = client.post(
        "/api/v1/ursos",
        json={
            "nome": "Gaia",
            "especie": "urso-negro",
            "sexo": "femea",
            "idade_estimada": 5,
            "status": "em_tratamento",
            "santuario_id": santuario["id"],
        },
    ).json()

    payload = {
        "urso_id": urso["id"],
        "cuidador_id": cuidador["id"],
        "local": "Serra do Mar",
        "data_resgate": "2026-03-17",
        "condicao_saude": "desidratado",
        "status": "aberto",
        "descricao": "Encontrado perto da rodovia.",
    }

    first_response = client.post("/api/v1/resgates", json=payload)
    second_response = client.post("/api/v1/resgates", json=payload)

    assert first_response.status_code == 201
    assert second_response.status_code == 409
    assert second_response.json()["detail"] == "Ja existe resgate ativo para este urso."

    resgate_id = first_response.json()["id"]
    update_response = client.put(
        f"/api/v1/resgates/{resgate_id}",
        json={**payload, "status": "encerrado"},
    )

    assert update_response.status_code == 200
    assert update_response.json()["status"] == "encerrado"

    delete_response = client.delete(f"/api/v1/resgates/{resgate_id}")
    assert delete_response.status_code == 204


def test_delete_santuario_with_linked_records_returns_conflict() -> None:
    client = create_client()

    santuario = client.post(
        "/api/v1/santuarios",
        json={
            "nome": "Campos Altos",
            "pais": "Brasil",
            "estado": "Minas Gerais",
            "capacidade": 6,
        },
    ).json()

    client.post(
        "/api/v1/ursos",
        json={
            "nome": "Tito",
            "especie": "urso-polar",
            "sexo": "macho",
            "idade_estimada": 4,
            "status": "apto",
            "santuario_id": santuario["id"],
        },
    )

    response = client.delete(f"/api/v1/santuarios/{santuario['id']}")

    assert response.status_code == 409
    assert response.json()["detail"] == "Santuario possui vinculos ativos."


def test_returns_problem_details_for_missing_resource() -> None:
    client = create_client()

    response = client.get("/api/v1/cuidadores/11111111-1111-1111-1111-111111111111")

    assert response.status_code == 404
    assert response.json() == {
        "type": "https://curso.local/errors/not-found",
        "title": "Not Found",
        "status": 404,
        "detail": "Cuidador nao encontrado.",
        "instance": "/api/v1/cuidadores/11111111-1111-1111-1111-111111111111",
    }


def test_returns_validation_error_for_invalid_payload() -> None:
    client = create_client()

    response = client.post(
        "/api/v1/santuarios",
        json={
            "nome": "Mini",
            "pais": "Brasil",
            "estado": "SP",
            "capacidade": 0,
        },
    )

    assert response.status_code == 422