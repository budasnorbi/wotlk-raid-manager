FROM node:17-alpine AS deps
RUN apk update 
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY ./frontend/package.json ./frontend/yarn.lock ./
RUN yarn install --frozen-lockfile

FROM deps as development
COPY ./frontend .
EXPOSE ${FRONTEND_PORT_CONTAINER}
CMD ["sh", "-c", "yarn dev -p $FRONTEND_PORT_CONTAINER"]