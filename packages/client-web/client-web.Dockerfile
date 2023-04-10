#
# BUILDER
#
FROM node:18.12.1-slim as builder

# copy files and install deps
WORKDIR /app
COPY /packages ./packages
COPY /lerna.json .
COPY /package.json .
RUN yarn

# build server-api
WORKDIR /app/packages/server-api
RUN yarn codegen
RUN yarn build

# build client-web
WORKDIR /app/packages/client-web
RUN yarn build
RUN node ./postbuild.js ./.next/standalone/packages/client-web/server.js

#
# RUNNER 
#
FROM node:18.12.1-slim as runner
WORKDIR /app

COPY --from=builder /app/packages/client-web/.next/standalone ./
COPY --from=builder /app/packages/client-web/.next/static ./packages/client-web/.next/static
COPY --from=builder /app/packages/client-web/public ./packages/client-web/public

# run
EXPOSE 3002:3002
CMD node ./packages/client-web/server.js