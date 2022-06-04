FROM node:18-alpine3.15 as builder

WORKDIR /usr/app
RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .

COPY packages/tsconfig packages/tsconfig
COPY packages/db/package.json ./packages/db/package.json

RUN pnpm fetch

COPY prisma prisma
COPY apps/api apps/api

RUN pnpm install --frozen-lockfile

RUN pnpm db:generate

RUN pnpm --filter api run build

RUN pnpm recursive exec -- rm -rf ./node_modules
RUN pnpm --filter api install --frozen-lockfile --prod

FROM node:18-alpine3.15 as main

WORKDIR /usr/app/

COPY --from=builder /usr/app/node_modules node_modules
COPY --from=builder /usr/app/apps/api/node_modules apps/api/node_modules
COPY --from=builder /usr/app/apps/api/dist apps/api/dist
COPY --from=builder /usr/app/packages/db packages/db

EXPOSE 8080

ENV NODE_ENV production

ENV PORT 8080

CMD [ "node", "apps/api/dist/index.js" ]