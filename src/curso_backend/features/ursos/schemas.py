from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class UrsoPayload(BaseModel):
    model_config = ConfigDict(extra="forbid")

    nome: str = Field(min_length=2, max_length=120)
    especie: str = Field(min_length=3, max_length=120)
    sexo: Literal["macho", "femea", "indefinido"]
    idade_estimada: int = Field(ge=0, le=80)
    status: Literal["em_tratamento", "apto", "em_transferencia"]
    santuario_id: str | None = None


class UrsoResponse(UrsoPayload):
    id: str