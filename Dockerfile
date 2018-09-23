FROM node:8.11-alpine as build_image

USER root

# Drop Node user
RUN deluser --remove-home node

# Prepare build environment:
RUN apk add --no-cache \
    git \
    python \
    python-dev \
    py-pip \
    build-base \
    libc6-compat \
    && pip install virtualenv

WORKDIR /opt/svc

# Launch the build
COPY package.json .

# Enable the following tweaks if docker-compose isn't able to complete the build:
# RUN git config --global url.https://github.com/.insteadOf git://github.com/
# RUN npm config set strict-ssl false

RUN npm i --production --unsafe-perm



FROM node:8.11-alpine

USER root

# Drop Node user
RUN deluser --remove-home node

# Add files
WORKDIR /opt/svc

COPY package.json .

COPY --from=build_image /opt/svc/node_modules ./node_modules

COPY lib ./lib
COPY LICENSE ./LICENSE
COPY app.js ./app.js
COPY .env ./.env

EXPOSE 3000

CMD ["npm", "start"]
