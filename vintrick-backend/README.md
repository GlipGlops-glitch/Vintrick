# File: README.md

## VinTrick Node.js + PostgreSQL Boilerplate

### Setup

1. **Clone the repo**
2. **Create `.env` from example**
3. **Start services**
   ```sh
   docker-compose up --build

----Backend----
docker-compose build
docker-compose up

docker-compose build --no-cache
docker-compose up

npm install prisma@latest @prisma/client@latest


docker-compose down --remove-orphans -v
docker-compose build
docker-compose up -d
docker-compose run backend npx prisma migrate dev --name init


docker-compose up           # to run backend + db
# or, in dev: npx nodemon src/app.js (if not running in docker)


----Frontend----
cd vintrick-frontend
npm start

# use this to enter the container, must be in the right dir - $ cd Vintrick/vintrick-backend
docker-compose exec backend sh
# then 
 npx prisma migrate dev --name add-user-auth

# prisma studio to check on users table
http://localhost:5556/

docker-compose exec backend npx prisma studio --port 5556


git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Glip/Vintrick.git
git branch -M main
git push -u origin main



# Vintrick

A full-stack application for vineyard management and harvest tracking.

## 🔧 Tech Stack

* **Frontend:** React, Context API, custom CSS
* **Backend:** Python (FastAPI or Flask), Node.js (Express)
* **Database:** Prisma (likely PostgreSQL)
* **Other:** Docker, Excel upload tools

---

## 📁 Project Structure

```
Vintrick/
├── vintrick-frontend/      # React frontend
└── vintrick-backend/       # Python + Node.js backend with Prisma and APIs
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+)
* Python (v3.10+)
* Docker (optional)

### Clone Repo

```bash
git clone https://github.com/GlipGlops-glitch/Vintrick.git
cd Vintrick
```

### Frontend Setup

```bash
cd vintrick-frontend
npm install
npm start
```

### Backend Setup

```bash
cd vintrick-backend
pip install -r requirements.txt  # or npm install if Node
python main.py                   # or node src/app.js
```

> Add `.env` file based on `.env.example` before running.

---

## 📌 Features

* 📊 Harvest Load Entry + Management
* 🔐 User Authentication
* 📈 Blend/Details/Reports Screens
* 🧾 Excel Upload Tool

---

## 📦 Scripts

You can create a combined dev script like:

```bash
# dev-start.sh
(cd vintrick-backend && npm start) &
(cd vintrick-frontend && npm start)
```

---

## 🧪 Testing

* Backend: `pytest` or `Jest`
* Frontend: `npm test` (Jest + React Testing Library)

---

## ✅ To-Do

* [ ] Add unit tests for all endpoints/components
* [ ] Setup CI via GitHub Actions
* [ ] Add linting + format checks
* [ ] Improve error handling in backend routes

---

## 📄 License

MIT



Read the repo: https://github.com/GlipGlops-glitch/Vintrick



git add .
git commit -m "Theme setup: global styles, theme variables, NavBar refactor"
git push
