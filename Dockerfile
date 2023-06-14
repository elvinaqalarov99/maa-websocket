FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS server

WORKDIR /app

COPY package* ./

RUN npm install --production

RUN npm install pm2 -g

COPY --from=builder ./app/public ./public
COPY --from=builder ./app/build ./build

EXPOSE 8080

CMD ["npm", "start"]