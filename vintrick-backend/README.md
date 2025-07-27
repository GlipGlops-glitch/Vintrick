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
