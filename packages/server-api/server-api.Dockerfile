#
# BUILDER
#
FROM node:18.12.1-slim as server-api-builder
WORKDIR /app

RUN yarn

WORKDIR /app/packages/server-api
RUN yarn codegen
RUN yarn build

#
# RUNNER 
#
FROM node:18.12.1-slim as server-api-runnner
WORKDIR /app

# copy files from builder 
COPY --from=server-api-builder /app/dist ./dist
COPY --from=server-api-builder /app/node_modules ./node_modules
COPY --from=server-api-builder /app/packages/server-api ./packages/server-api
COPY --from=server-api-builder /app/lerna.json .
COPY --from=server-api-builder /app/tsconfig.json .
COPY --from=server-api-builder /app/package.json .

EXPOSE 5000:5000
CMD yarn prodrun:server-api