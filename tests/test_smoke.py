# import pytest


def test_app_startup(sync_client):
    resp = sync_client.get("/health/live")
    assert resp.status_code == 200
    assert resp.json().get("status") in ("alive", "ok")
