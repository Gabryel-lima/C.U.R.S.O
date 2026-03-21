from __future__ import annotations

from sqlalchemy import Column, String, Integer, DateTime, Date, Text, Enum
from curso_backend.shared.db import Base
import enum


class OcorrenciaTipo(enum.Enum):
    relato = "relato"


class Cidadao(Base):
    __tablename__ = "cidadaos"

    id = Column(String(36), primary_key=True)
    orig_id = Column(Integer, nullable=True, unique=False)
    nome = Column(String(255), nullable=False)
    numero = Column(String(32), nullable=False)


class Atendente(Base):
    __tablename__ = "atendentes"

    id = Column(String(36), primary_key=True)
    orig_id = Column(Integer, nullable=True)
    nome = Column(String(255), nullable=False)
    registro = Column(String(32), nullable=False)


class Veterinario(Base):
    __tablename__ = "veterinarios"

    id = Column(String(36), primary_key=True)
    orig_id = Column(Integer, nullable=True)
    nome = Column(String(255), nullable=False)
    registro = Column(String(32), nullable=False)


class Ocorrencia(Base):
    __tablename__ = "ocorrencias"

    id = Column(String(36), primary_key=True)
    orig_id = Column(Integer, nullable=True)
    id_atendente = Column(Integer, nullable=True)
    data_resgate = Column(Date, nullable=True)
    informacao = Column(Text, nullable=False)


class Diagnostico(Base):
    __tablename__ = "diagnosticos"

    id = Column(String(36), primary_key=True)
    orig_id = Column(Integer, nullable=True)
    id_veterinario = Column(Integer, nullable=True)
    id_cuidador = Column(Integer, nullable=True)
    id_urso = Column(Integer, nullable=True)
    data_resgate = Column(DateTime, nullable=True)
    estado_saude = Column(String(255), nullable=True)
    tratamento = Column(String(255), nullable=True)
    status_atual = Column(String(80), nullable=True)
