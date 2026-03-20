from __future__ import annotations

from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from curso_backend.shared.db import Base


class Santuario(Base):
    __tablename__ = "santuarios"

    id = Column(String(36), primary_key=True)
    nome = Column(String(120), nullable=False)
    pais = Column(String(80), nullable=False)
    estado = Column(String(80), nullable=False)
    capacidade = Column(Integer, nullable=False)

    ursos = relationship("Urso", back_populates="santuario", lazy="selectin")
    cuidadores = relationship("Cuidador", back_populates="santuario", lazy="selectin")
