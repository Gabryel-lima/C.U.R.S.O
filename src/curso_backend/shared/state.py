from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any
from uuid import uuid4


@dataclass(slots=True)
class AppState:
    santuarios: dict[str, dict[str, Any]] = field(default_factory=dict)
    cuidadores: dict[str, dict[str, Any]] = field(default_factory=dict)
    ursos: dict[str, dict[str, Any]] = field(default_factory=dict)
    resgates: dict[str, dict[str, Any]] = field(default_factory=dict)

    def new_id(self) -> str:
        return str(uuid4())

    def santuario_occupacao(self, santuario_id: str) -> int:
        return sum(
            1
            for urso in self.ursos.values()
            if urso.get("santuario_id") == santuario_id
        )

    def santuario_has_links(self, santuario_id: str) -> bool:
        has_ursos = any(
            urso.get("santuario_id") == santuario_id for urso in self.ursos.values()
        )
        has_cuidadores = any(
            cuidador.get("santuario_id") == santuario_id
            for cuidador in self.cuidadores.values()
        )
        return has_ursos or has_cuidadores

    def cuidador_has_links(self, cuidador_id: str) -> bool:
        return any(
            resgate.get("cuidador_id") == cuidador_id for resgate in self.resgates.values()
        )

    def urso_has_links(self, urso_id: str) -> bool:
        return any(resgate.get("urso_id") == urso_id for resgate in self.resgates.values())

    def has_active_resgate_for_urso(
        self,
        urso_id: str,
        *,
        excluding_resgate_id: str | None = None,
    ) -> bool:
        for resgate_id, resgate in self.resgates.items():
            if excluding_resgate_id and resgate_id == excluding_resgate_id:
                continue
            if resgate["urso_id"] == urso_id and resgate["status"] != "encerrado":
                return True
        return False