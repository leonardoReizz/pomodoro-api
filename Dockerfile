FROM node:16

WORKDIR /usr/src/pomodoro-api

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 53050

CMD [ "yarn", "build" ]
CMD [ "node", "./dist/main.js" ]
