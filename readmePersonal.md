# Vintrick Backend - Developer README Cheat Sheet

## Overview

This project is a FastAPI backend for managing harvest load data. It connects to a PostgreSQL database using SQLAlchemy and exposes RESTful endpoints. The backend runs inside Docker containers for portability.

---

## Project Structure

```
vintrick-backend/
├── app/                 # FastAPI app directory
│   ├── api/            # API routes
│   ├── core/           # Config and DB setup
│   ├── crud/           # CRUD functions
│   ├── models/         # SQLAlchemy models
│   ├── schemas/        # Pydantic schemas
│   └── services/       # Service layer
├── dao/                # Legacy data access object
├── Tools/              # Dev tools and test files
├── .env                # Environment config
├── Dockerfile          # Docker app config
├── docker-compose.yml  # Docker orchestration
├── requirements.txt    # Python dependencies
└── README.md
```

---

## API Endpoints

All endpoints are available under `http://localhost:3000/api`.

### Harvest Loads

| Method | URL                   | Description      |
| ------ | --------------------- | ---------------- |
| GET    | `/harvestloads/`      | List all records |
| POST   | `/harvestloads/`      | Add new record   |
| PATCH  | `/harvestloads/{uid}` | Update a record  |

---

## Docker & Development

### Commands (PowerShell unless noted)

#### Build container

```ps1
docker-compose build --no-cache
```

#### Start container (foreground)

```ps1
docker-compose up
```

#### Start container (background)

```ps1
docker-compose up -d
```

#### Stop containers

```ps1
docker-compose down
```

#### View logs

```ps1
docker-compose logs -f
```

#### Shell access (bash inside container)

```ps1
docker exec -it vintrick-backend-api-1 /bin/bash
```

---

## Database (PostgreSQL)

Ensure the container `db` is running. Default connection:

```
host=db
port=5432
user=postgres
password=postgres
```

Use tools like DBeaver, PgAdmin or `psql` CLI (Linux/macOS):

```bash
psql -U postgres -d vintrick -h localhost
```

---

## Git Workflow

### Push changes

```ps1
git add .
git commit -m "your message"
git push origin main
```

### Pull latest changes

```ps1
git pull origin main
```

---

## Troubleshooting

* **403 or 500 errors**: Check backend logs `docker-compose logs -f`.
* **DB not reachable**: Ensure `db` container is running and `.env` is correct.
* **CORS errors**: Ensure backend allows frontend origin or run frontend on same host.

---

## Contacts

* Dev Lead: Your Name
* API Docs: TBD
* Frontend Repo: TBD

---

## Notes

* Use `localhost:3000` for local development
* Adjust firewall or VPN settings if backend is remote
* Use Docker volumes to persist data if needed

---

Ask Casey
