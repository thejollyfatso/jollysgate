import os

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="jollysgate")


@app.get("/health")
def health():
    return {"ok": True, "app": "jollysgate"}


# TODO: wire up routers once implemented
# from server.routers import auth
# app.include_router(auth.router, prefix="/auth")
