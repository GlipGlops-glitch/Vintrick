FROM node:20-alpine

WORKDIR /app

# Install build tools for bcrypt and node-gyp
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

CMD ["node", "src/app.js"]
