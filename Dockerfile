# Stage 1: Build & Dependencies
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Production Runtime
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY . .

ENV NODE_ENV=production
ENV PORT=3030
EXPOSE $PORT

USER node
CMD ["node", "server.js"]
