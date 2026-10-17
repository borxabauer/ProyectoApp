FROM node:16

EXPOSE 3000

WORKDIR /usr/src/app
COPY . .

WORKDIR /usr/src/app/frontend/src
RUN npm install
RUN npm run build

WORKDIR /usr/src/app/backend/src
RUN npm install --omit=dev

ENTRYPOINT [ "npm", "start" ]