from __future__ import annotations

from sqlalchemy.orm import Session
from uuid import uuid4
from sqlalchemy import select, func

from curso_backend.features.relatorios.models import (
    Cidadao,
    Atendente,
    Veterinario,
    Ocorrencia,
    Diagnostico,
)
from curso_backend.features.relatorios.schemas import (
    CidadaoPayload,
    CidadaoResponse,
    AtendentePayload,
    AtendenteResponse,
    VeterinarioPayload,
    VeterinarioResponse,
    OcorrenciaPayload,
    OcorrenciaResponse,
    DiagnosticoPayload,
    DiagnosticoResponse,
)
from curso_backend.shared.problem import not_found_problem, conflict_problem


def list_cidadaos(db: Session) -> list[CidadaoResponse]:
    items = db.query(Cidadao).all()
    return [CidadaoResponse.model_validate(_orm_to_dict(c)) for c in items]


def get_cidadao(db: Session, cidadao_id: str) -> CidadaoResponse:
    c = db.get(Cidadao, cidadao_id)
    if not c:
        raise not_found_problem("Cidadao nao encontrado.")
    return CidadaoResponse.model_validate(_orm_to_dict(c))


def create_cidadao(db: Session, payload: CidadaoPayload) -> CidadaoResponse:
    cid = str(uuid4())
    obj = Cidadao(id=cid, **payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return CidadaoResponse.model_validate(_orm_to_dict(obj))


def update_cidadao(db: Session, cidadao_id: str, payload: CidadaoPayload) -> CidadaoResponse:
    c = db.get(Cidadao, cidadao_id)
    if not c:
        raise not_found_problem("Cidadao nao encontrado.")
    for k, v in payload.model_dump().items():
        setattr(c, k, v)
    db.commit()
    db.refresh(c)
    return CidadaoResponse.model_validate(_orm_to_dict(c))


def delete_cidadao(db: Session, cidadao_id: str) -> None:
    c = db.get(Cidadao, cidadao_id)
    if not c:
        raise not_found_problem("Cidadao nao encontrado.")
    db.delete(c)
    db.commit()


def list_atendentes(db: Session) -> list[AtendenteResponse]:
    items = db.query(Atendente).all()
    return [AtendenteResponse.model_validate(_orm_to_dict_a(a)) for a in items]


def get_atendente(db: Session, atendente_id: str) -> AtendenteResponse:
    a = db.get(Atendente, atendente_id)
    if not a:
        raise not_found_problem("Atendente nao encontrado.")
    return AtendenteResponse.model_validate(_orm_to_dict_a(a))


def create_atendente(db: Session, payload: AtendentePayload) -> AtendenteResponse:
    aid = str(uuid4())
    obj = Atendente(id=aid, **payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return AtendenteResponse.model_validate(_orm_to_dict_a(obj))


def update_atendente(db: Session, atendente_id: str, payload: AtendentePayload) -> AtendenteResponse:
    a = db.get(Atendente, atendente_id)
    if not a:
        raise not_found_problem("Atendente nao encontrado.")
    for k, v in payload.model_dump().items():
        setattr(a, k, v)
    db.commit()
    db.refresh(a)
    return AtendenteResponse.model_validate(_orm_to_dict_a(a))


def delete_atendente(db: Session, atendente_id: str) -> None:
    a = db.get(Atendente, atendente_id)
    if not a:
        raise not_found_problem("Atendente nao encontrado.")
    db.delete(a)
    db.commit()


def list_veterinarios(db: Session) -> list[VeterinarioResponse]:
    items = db.query(Veterinario).all()
    return [VeterinarioResponse.model_validate(_orm_to_dict_v(v)) for v in items]


def get_veterinario(db: Session, veterinario_id: str) -> VeterinarioResponse:
    v = db.get(Veterinario, veterinario_id)
    if not v:
        raise not_found_problem("Veterinario nao encontrado.")
    return VeterinarioResponse.model_validate(_orm_to_dict_v(v))


def create_veterinario(db: Session, payload: VeterinarioPayload) -> VeterinarioResponse:
    vid = str(uuid4())
    obj = Veterinario(id=vid, **payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return VeterinarioResponse.model_validate(_orm_to_dict_v(obj))


def update_veterinario(db: Session, veterinario_id: str, payload: VeterinarioPayload) -> VeterinarioResponse:
    v = db.get(Veterinario, veterinario_id)
    if not v:
        raise not_found_problem("Veterinario nao encontrado.")
    for k, val in payload.model_dump().items():
        setattr(v, k, val)
    db.commit()
    db.refresh(v)
    return VeterinarioResponse.model_validate(_orm_to_dict_v(v))


def delete_veterinario(db: Session, veterinario_id: str) -> None:
    v = db.get(Veterinario, veterinario_id)
    if not v:
        raise not_found_problem("Veterinario nao encontrado.")
    db.delete(v)
    db.commit()


def list_ocorrencias(db: Session) -> list[OcorrenciaResponse]:
    items = db.query(Ocorrencia).all()
    return [OcorrenciaResponse.model_validate(_orm_to_dict_o(o)) for o in items]


def get_ocorrencia(db: Session, ocorrencia_id: str) -> OcorrenciaResponse:
    o = db.get(Ocorrencia, ocorrencia_id)
    if not o:
        raise not_found_problem("Ocorrencia nao encontrada.")
    return OcorrenciaResponse.model_validate(_orm_to_dict_o(o))


def create_ocorrencia(db: Session, payload: OcorrenciaPayload) -> OcorrenciaResponse:
    oid = str(uuid4())
    obj = Ocorrencia(id=oid, **payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return OcorrenciaResponse.model_validate(_orm_to_dict_o(obj))


def update_ocorrencia(db: Session, ocorrencia_id: str, payload: OcorrenciaPayload) -> OcorrenciaResponse:
    o = db.get(Ocorrencia, ocorrencia_id)
    if not o:
        raise not_found_problem("Ocorrencia nao encontrada.")
    for k, v in payload.model_dump().items():
        setattr(o, k, v)
    db.commit()
    db.refresh(o)
    return OcorrenciaResponse.model_validate(_orm_to_dict_o(o))


def delete_ocorrencia(db: Session, ocorrencia_id: str) -> None:
    o = db.get(Ocorrencia, ocorrencia_id)
    if not o:
        raise not_found_problem("Ocorrencia nao encontrada.")
    db.delete(o)
    db.commit()


def list_diagnosticos(db: Session) -> list[DiagnosticoResponse]:
    items = db.query(Diagnostico).all()
    return [DiagnosticoResponse.model_validate(_orm_to_dict_d(d)) for d in items]


def get_diagnostico(db: Session, diagnostico_id: str) -> DiagnosticoResponse:
    d = db.get(Diagnostico, diagnostico_id)
    if not d:
        raise not_found_problem("Diagnostico nao encontrado.")
    return DiagnosticoResponse.model_validate(_orm_to_dict_d(d))


def create_diagnostico(db: Session, payload: DiagnosticoPayload) -> DiagnosticoResponse:
    did = str(uuid4())
    obj = Diagnostico(id=did, **payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return DiagnosticoResponse.model_validate(_orm_to_dict_d(obj))


def update_diagnostico(db: Session, diagnostico_id: str, payload: DiagnosticoPayload) -> DiagnosticoResponse:
    d = db.get(Diagnostico, diagnostico_id)
    if not d:
        raise not_found_problem("Diagnostico nao encontrado.")
    for k, v in payload.model_dump().items():
        setattr(d, k, v)
    db.commit()
    db.refresh(d)
    return DiagnosticoResponse.model_validate(_orm_to_dict_d(d))


def delete_diagnostico(db: Session, diagnostico_id: str) -> None:
    d = db.get(Diagnostico, diagnostico_id)
    if not d:
        raise not_found_problem("Diagnostico nao encontrado.")
    db.delete(d)
    db.commit()


def _orm_to_dict(c: Cidadao) -> dict:
    return {"id": c.id, "orig_id": c.orig_id, "nome": c.nome, "numero": c.numero}


def _orm_to_dict_a(a: Atendente) -> dict:
    return {"id": a.id, "orig_id": a.orig_id, "nome": a.nome, "registro": a.registro}


def _orm_to_dict_v(v: Veterinario) -> dict:
    return {"id": v.id, "orig_id": v.orig_id, "nome": v.nome, "registro": v.registro}


def _orm_to_dict_o(o: Ocorrencia) -> dict:
    return {"id": o.id, "orig_id": o.orig_id, "id_atendente": o.id_atendente, "data_resgate": o.data_resgate, "informacao": o.informacao}


def _orm_to_dict_d(d: Diagnostico) -> dict:
    return {
        "id": d.id,
        "orig_id": d.orig_id,
        "id_veterinario": d.id_veterinario,
        "id_cuidador": d.id_cuidador,
        "id_urso": d.id_urso,
        "data_resgate": d.data_resgate,
        "estado_saude": d.estado_saude,
        "tratamento": d.tratamento,
        "status_atual": d.status_atual,
    }
