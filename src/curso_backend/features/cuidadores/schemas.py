from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field, field_validator


class CuidadorPayload(BaseModel):
    model_config = ConfigDict(extra="forbid")

    nome: str = Field(min_length=3, max_length=120)
    email: str = Field(min_length=6, max_length=160)
    telefone: str = Field(min_length=8, max_length=30)
    especialidade: str = Field(min_length=3, max_length=80)
    santuario_id: str | None = None
    ativo: bool = True

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        if "@" not in value:
            raise ValueError("email invalido")
        return value.lower()


class CuidadorResponse(CuidadorPayload):
    id: str