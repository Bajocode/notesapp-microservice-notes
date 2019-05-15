FROM node:10.15.3 AS builder
USER node
WORKDIR /home/node
COPY --chown=node:node package*.json ./
RUN ["npm", "i"]
COPY --chown=node:node . .
RUN mkdir -p dist && chown -R node:node fist
RUN ["npm", "run", "build"]

FROM builder AS analyzer
USER node
WORKDIR /home/node
RUN ["npm", "run", "test:cov"]
RUN find . \
    ! -name package.json \
    ! -name package-lock.json \
    ! -name dist \
    ! -name node_modules \
    -maxdepth 1 \
    -mindepth 1 \
    -exec rm -rf {} \;

FROM node:10.15.3-alpine AS target
USER node
WORKDIR /home/node
COPY --chown=node:node --from=analyzer /home/node .
EXPOSE 3000/tcp
ENTRYPOINT ["node", "dist/src/index.js"]
