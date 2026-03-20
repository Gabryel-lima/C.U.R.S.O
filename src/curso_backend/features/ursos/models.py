from __future__ import annotations

from sqlalchemy import Column, Integer, String, Date, Enum, ForeignKey
from sqlalchemy.orm import relationship
from curso_backend.shared.db import Base
import enum


class Sexo(enum.Enum):
    macho = "macho"
    femea = "femea"
    indefinido = "indefinido"


class StatusUrso(enum.Enum):
    em_tratamento = "em_tratamento"
    apto = "apto"
    em_transferencia = "em_transferencia"


class Urso(Base):
    __tablename__ = "ursos"

    id = Column(String(36), primary_key=True)
    nome = Column(String(120), nullable=False)
    especie = Column(String(120), nullable=False)
    idade_estimada = Column(Integer, nullable=True)
    sexo = Column(Enum(Sexo), nullable=False)
    data_resgate = Column(Date, nullable=True)
    estado_saude = Column(String(120), nullable=True)
    status = Column(Enum(StatusUrso), nullable=False, index=True)
    santuario_id = Column(String(36), ForeignKey("santuarios.id"), nullable=True, index=True)

    resgates = relationship("Resgate", back_populates="urso", lazy="selectin")
    santuario = relationship("Santuario", back_populates="ursos")
