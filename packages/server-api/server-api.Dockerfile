#
# BUILDER
#
FROM node:18.12.1-slim as server-api-builder

# copy files and install deps
WORKDIR /app
COPY /packages/server-api ./packages/server-api
COPY /lerna.json .
COPY /package.json .
RUN yarn

# build
WORKDIR /app/packages/server-api
RUN yarn codegen
RUN yarn build

# run
WORKDIR /app
ENV NODE_ENV production
EXPOSE 5002:5002
CMD yarn prodrun:server-api

#
# RUNNER 
#
# FROM node:18.12.1-slim as server-api-runnner
# WORKDIR /app

# # copy root files 
# COPY --from=server-api-builder /app/node_modules ./node_modules
# COPY --from=server-api-builder /app/packages/server-api/lerna.json .
# COPY --from=server-api-builder /app/packages/server-api/tsconfig.json .
# COPY --from=server-api-builder /app/packages/server-api/package.json .

# # copy server-api files
# COPY --from=server-api-builder /app/packages/server-api ./packages/server-api