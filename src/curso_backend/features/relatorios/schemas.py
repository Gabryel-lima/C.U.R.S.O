from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field
from datetime import date, datetime


class CidadaoPayload(BaseModel):
    model_config = ConfigDict(extra="forbid")

    nome: str = Field(min_length=2, max_length=255)
    numero: str = Field(min_length=8, max_length=32)


class CidadaoResponse(CidadaoPayload):
    model_config = ConfigDict(from_attributes=True)
    id: str
    orig_id: int | None = None


class AtendentePayload(BaseModel):
    model_config = ConfigDict(extra="forbid")
    nome: str = Field(min_length=2, max_length=255)
    registro: str = Field(min_length=1, max_length=32)


class AtendenteResponse(AtendentePayload):
    model_config = ConfigDict(from_attributes=True)
    id: str
    orig_id: int | None = None


class VeterinarioPayload(BaseModel):
    model_config = ConfigDict(extra="forbid")
    nome: str = Field(min_length=2, max_length=255)
    registro: str = Field(min_length=1, max_length=32)


class VeterinarioResponse(VeterinarioPayload):
    model_config = ConfigDict(from_attributes=True)
    id: str
    orig_id: int | None = None


class OcorrenciaPayload(BaseModel):
    model_config = ConfigDict(extra="forbid")
    id_atendente: int | None = None
    data_resgate: date | None = None
    informacao: str = Field(min_length=3)


class OcorrenciaResponse(OcorrenciaPayload):
    model_config = ConfigDict(from_attributes=True)
    id: str
    orig_id: int | None = None


class DiagnosticoPayload(BaseModel):
    model_config = ConfigDict(extra="forbid")
    id_veterinario: int | None = None
    id_cuidador: int | None = None
    id_urso: int | None = None
    data_resgate: datetime | None = None
    estado_saude: str | None = None
    tratamento: str | None = None
    status_atual: str | None = None


class DiagnosticoResponse(DiagnosticoPayload):
    model_config = ConfigDict(from_attributes=True)
    id: str
    orig_id: int | None = None
