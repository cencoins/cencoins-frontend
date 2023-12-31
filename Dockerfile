FROM node:19-bullseye AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm pkg delete scripts.prepare
RUN npm ci --legacy-peer-deps
#
FROM node:19-bullseye AS builder
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build
#
FROM node:19-bullseye AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh
COPY --from=builder /app/.env.production ./.env.production
COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js

# RUN apk add --no-cache --upgrade bash
RUN ["chmod", "+x", "./entrypoint.sh"]
ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 3000

ENV PORT 3000

CMD ["node_modules/.bin/next", "start"]
