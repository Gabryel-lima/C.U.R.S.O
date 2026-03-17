from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class SantuarioPayload(BaseModel):
    model_config = ConfigDict(extra="forbid")

    nome: str = Field(min_length=3, max_length=120)
    pais: str = Field(min_length=2, max_length=80)
    estado: str = Field(min_length=2, max_length=80)
    capacidade: int = Field(ge=1, le=500)


class SantuarioResponse(SantuarioPayload):
    id: str
    ocupacao: int