FROM node:18-alpine AS base
RUN apk update && apk add git
RUN npm install -g pnpm
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN pnpm fetch
ADD . .
RUN pnpm install --offline
RUN pnpm db:generate
RUN pnpm build --filter=api

FROM node:18-slim
WORKDIR /app
COPY --from=base /app/package.json ./
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/packages/db ./packages/db
COPY --from=base /app/apps/api ./apps/api

EXPOSE 8080

ENV PORT 8080

CMD [ "node", "apps/api/dist/index.js" ]