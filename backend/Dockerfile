FROM node:17-alpine as deps
RUN apk update
WORKDIR /usr/backend
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM deps as development
COPY . .
EXPOSE ${BACKEND_PORT_CONTAINER}
CMD ["yarn", "start:dev"]
