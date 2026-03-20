from __future__ import annotations

from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from curso_backend.shared.db import Base


class Cuidador(Base):
    __tablename__ = "cuidadores"

    id = Column(String(36), primary_key=True)
    nome = Column(String(120), nullable=False)
    email = Column(String(160), nullable=False, unique=True, index=True)
    telefone = Column(String(30), nullable=True)
    especialidade = Column(String(80), nullable=True)
    santuario_id = Column(String(36), ForeignKey("santuarios.id"), nullable=True, index=True)
    ativo = Column(Boolean, nullable=False, default=True)

    santuario = relationship("Santuario", back_populates="cuidadores")
    resgates = relationship("Resgate", back_populates="cuidador", lazy="selectin")
