FROM node:16

EXPOSE 3000

WORKDIR /usr/src/app
COPY . .

WORKDIR /usr/src/app/frontend/src
RUN npm install
RUN npm run build
RUN rm .gitignore package.json package-lock.json public README.md src node_modules -rf

WORKDIR /usr/src/app/backend
RUN npm install --omit=dev

ENTRYPOINT [ "npm", "start" ]