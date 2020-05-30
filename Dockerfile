FROM node:12-alpine3.10 AS dep
WORKDIR /app
COPY package.json .
RUN npm install --production

FROM node:12-alpine3.10 AS builder
WORKDIR /app
COPY . .
RUN npm i && npm run build && rm -rf node_modules server 

FROM node:12-alpine3.10 
WORKDIR /app
COPY --from=dep /app/node_modules ./node_modules
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm run start"]
