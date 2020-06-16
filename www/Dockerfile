# FROM node:12-alpine3.10 AS dep
# WORKDIR /app
# COPY package.json .
# COPY . . 
# RUN npm install --production

# FROM node:12-alpine3.10 AS builder
# WORKDIR /app
# COPY . .
# RUN npm i && npm run build && rm -rf node_modules src

FROM node:12-alpine3.10 
WORKDIR /app
COPY . . 
RUN npm i --production
# COPY --from=dep /app/node_modules ./node_modules
# COPY --from=builder /app .
EXPOSE 8080 
CMD ["npm run start"]
