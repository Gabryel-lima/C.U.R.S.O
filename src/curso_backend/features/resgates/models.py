from __future__ import annotations

from sqlalchemy import Column, String, Date, Enum, ForeignKey, Text
from sqlalchemy.orm import relationship
from curso_backend.shared.db import Base
import enum


class StatusResgate(enum.Enum):
    aberto = "aberto"
    em_acompanhamento = "em_acompanhamento"
    encerrado = "encerrado"


class Resgate(Base):
    __tablename__ = "resgates"

    id = Column(String(36), primary_key=True)
    urso_id = Column(String(36), ForeignKey("ursos.id"), nullable=False, index=True)
    cuidador_id = Column(String(36), ForeignKey("cuidadores.id"), nullable=True, index=True)
    local = Column(String(160), nullable=False)
    data_resgate = Column(Date, nullable=False)
    condicao_saude = Column(String(120), nullable=False)
    status = Column(Enum(StatusResgate), nullable=False, index=True)
    descricao = Column(Text, nullable=True)

    urso = relationship("Urso", back_populates="resgates")
    cuidador = relationship("Cuidador", back_populates="resgates")
