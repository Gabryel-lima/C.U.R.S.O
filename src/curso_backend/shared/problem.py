from __future__ import annotations

from dataclasses import dataclass


@dataclass(slots=True)
class ApiProblem(Exception):
    status: int
    title: str
    detail: str
    type: str

    def payload(self, instance: str) -> dict[str, object]:
        return {
            "type": self.type,
            "title": self.title,
            "status": self.status,
            "detail": self.detail,
            "instance": instance,
        }


def not_found_problem(detail: str) -> ApiProblem:
    return ApiProblem(
        status=404,
        title="Not Found",
        detail=detail,
        type="https://curso.local/errors/not-found",
    )


def conflict_problem(detail: str) -> ApiProblem:
    return ApiProblem(
        status=409,
        title="Conflict",
        detail=detail,
        type="https://curso.local/errors/conflict",
    )


def validation_problem(instance: str) -> dict[str, object]:
    return {
        "type": "https://curso.local/errors/validation",
        "title": "Unprocessable Entity",
        "status": 422,
        "detail": "Payload invalido.",
        "instance": instance,
    }