FROM node:8.11


WORKDIR /opt/microsvc

COPY package.json .
RUN npm install --production

COPY lib ./lib
COPY app.js .

EXPOSE 3000

CMD ["npm", "start"]
