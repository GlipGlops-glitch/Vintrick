# vintrick-backend/app/main.py
import logging
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.api.routes import harvestloads  # ✅ Make sure this is imported

app = FastAPI(debug=True)

# ✅ Add this line to register the router
app.include_router(harvestloads.router, prefix="/api", tags=["harvestloads"])

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc):
    logging.error(f"HTTP Error: {exc.detail}")
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc):
    logging.error(f"Validation error: {exc.errors()} Body: {exc.body}")
    return JSONResponse(status_code=422, content={"detail": exc.errors(), "body": exc.body})

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc):
    logging.error(f"Unhandled error: {exc}", exc_info=True)
    return JSONResponse(status_code=500, content={"detail": "Internal Server Error"})
