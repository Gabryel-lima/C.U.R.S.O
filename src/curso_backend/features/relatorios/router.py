from __future__ import annotations

from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from curso_backend.features.relatorios import service_db as service
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
from curso_backend.shared.deps_db import get_db


router = APIRouter(prefix="/api/v1/relatorios", tags=["relatorios"])


# Cidadao
@router.get("/cidadaos", response_model=list[CidadaoResponse])
def list_cidadaos(db: Session = Depends(get_db)) -> list[CidadaoResponse]:
    return service.list_cidadaos(db)


@router.get("/cidadaos/{cidadao_id}", response_model=CidadaoResponse)
def get_cidadao(cidadao_id: str, db: Session = Depends(get_db)) -> CidadaoResponse:
    return service.get_cidadao(db, cidadao_id)


@router.post("/cidadaos", response_model=CidadaoResponse, status_code=status.HTTP_201_CREATED)
def create_cidadao(payload: CidadaoPayload, db: Session = Depends(get_db)) -> CidadaoResponse:
    return service.create_cidadao(db, payload)


@router.put("/cidadaos/{cidadao_id}", response_model=CidadaoResponse)
def update_cidadao(cidadao_id: str, payload: CidadaoPayload, db: Session = Depends(get_db)) -> CidadaoResponse:
    return service.update_cidadao(db, cidadao_id, payload)


@router.delete("/cidadaos/{cidadao_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_cidadao(cidadao_id: str, db: Session = Depends(get_db)) -> Response:
    service.delete_cidadao(db, cidadao_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


# Atendente
@router.get("/atendentes", response_model=list[AtendenteResponse])
def list_atendentes(db: Session = Depends(get_db)) -> list[AtendenteResponse]:
    return service.list_atendentes(db)


@router.get("/atendentes/{atendente_id}", response_model=AtendenteResponse)
def get_atendente(atendente_id: str, db: Session = Depends(get_db)) -> AtendenteResponse:
    return service.get_atendente(db, atendente_id)


@router.post("/atendentes", response_model=AtendenteResponse, status_code=status.HTTP_201_CREATED)
def create_atendente(payload: AtendentePayload, db: Session = Depends(get_db)) -> AtendenteResponse:
    return service.create_atendente(db, payload)


@router.put("/atendentes/{atendente_id}", response_model=AtendenteResponse)
def update_atendente(atendente_id: str, payload: AtendentePayload, db: Session = Depends(get_db)) -> AtendenteResponse:
    return service.update_atendente(db, atendente_id, payload)


@router.delete("/atendentes/{atendente_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_atendente(atendente_id: str, db: Session = Depends(get_db)) -> Response:
    service.delete_atendente(db, atendente_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


# Veterinario
@router.get("/veterinarios", response_model=list[VeterinarioResponse])
def list_veterinarios(db: Session = Depends(get_db)) -> list[VeterinarioResponse]:
    return service.list_veterinarios(db)


@router.get("/veterinarios/{veterinario_id}", response_model=VeterinarioResponse)
def get_veterinario(veterinario_id: str, db: Session = Depends(get_db)) -> VeterinarioResponse:
    return service.get_veterinario(db, veterinario_id)


@router.post("/veterinarios", response_model=VeterinarioResponse, status_code=status.HTTP_201_CREATED)
def create_veterinario(payload: VeterinarioPayload, db: Session = Depends(get_db)) -> VeterinarioResponse:
    return service.create_veterinario(db, payload)


@router.put("/veterinarios/{veterinario_id}", response_model=VeterinarioResponse)
def update_veterinario(veterinario_id: str, payload: VeterinarioPayload, db: Session = Depends(get_db)) -> VeterinarioResponse:
    return service.update_veterinario(db, veterinario_id, payload)


@router.delete("/veterinarios/{veterinario_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_veterinario(veterinario_id: str, db: Session = Depends(get_db)) -> Response:
    service.delete_veterinario(db, veterinario_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


# Ocorrencia
@router.get("/ocorrencias", response_model=list[OcorrenciaResponse])
def list_ocorrencias(db: Session = Depends(get_db)) -> list[OcorrenciaResponse]:
    return service.list_ocorrencias(db)


@router.get("/ocorrencias/{ocorrencia_id}", response_model=OcorrenciaResponse)
def get_ocorrencia(ocorrencia_id: str, db: Session = Depends(get_db)) -> OcorrenciaResponse:
    return service.get_ocorrencia(db, ocorrencia_id)


@router.post("/ocorrencias", response_model=OcorrenciaResponse, status_code=status.HTTP_201_CREATED)
def create_ocorrencia(payload: OcorrenciaPayload, db: Session = Depends(get_db)) -> OcorrenciaResponse:
    return service.create_ocorrencia(db, payload)


@router.put("/ocorrencias/{ocorrencia_id}", response_model=OcorrenciaResponse)
def update_ocorrencia(ocorrencia_id: str, payload: OcorrenciaPayload, db: Session = Depends(get_db)) -> OcorrenciaResponse:
    return service.update_ocorrencia(db, ocorrencia_id, payload)


@router.delete("/ocorrencias/{ocorrencia_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_ocorrencia(ocorrencia_id: str, db: Session = Depends(get_db)) -> Response:
    service.delete_ocorrencia(db, ocorrencia_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


# Diagnostico
@router.get("/diagnosticos", response_model=list[DiagnosticoResponse])
def list_diagnosticos(db: Session = Depends(get_db)) -> list[DiagnosticoResponse]:
    return service.list_diagnosticos(db)


@router.get("/diagnosticos/{diagnostico_id}", response_model=DiagnosticoResponse)
def get_diagnostico(diagnostico_id: str, db: Session = Depends(get_db)) -> DiagnosticoResponse:
    return service.get_diagnostico(db, diagnostico_id)


@router.post("/diagnosticos", response_model=DiagnosticoResponse, status_code=status.HTTP_201_CREATED)
def create_diagnostico(payload: DiagnosticoPayload, db: Session = Depends(get_db)) -> DiagnosticoResponse:
    return service.create_diagnostico(db, payload)


@router.put("/diagnosticos/{diagnostico_id}", response_model=DiagnosticoResponse)
def update_diagnostico(diagnostico_id: str, payload: DiagnosticoPayload, db: Session = Depends(get_db)) -> DiagnosticoResponse:
    return service.update_diagnostico(db, diagnostico_id, payload)


@router.delete("/diagnosticos/{diagnostico_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_diagnostico(diagnostico_id: str, db: Session = Depends(get_db)) -> Response:
    service.delete_diagnostico(db, diagnostico_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
