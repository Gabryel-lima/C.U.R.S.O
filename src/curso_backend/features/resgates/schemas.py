from __future__ import annotations

from datetime import date
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class ResgatePayload(BaseModel):
    model_config = ConfigDict(extra="forbid")

    urso_id: str
    cuidador_id: str | None = None
    local: str = Field(min_length=3, max_length=160)
    data_resgate: date
    condicao_saude: str = Field(min_length=3, max_length=120)
    status: Literal["aberto", "em_acompanhamento", "encerrado"]
    descricao: str = Field(min_length=5, max_length=500)


class ResgateResponse(ResgatePayload):
    id: str