FROM node:16-alpine

WORKDIR /app
COPY package.json yarn.lock /app
RUN rm -rf node_modules && yarn install --frozen-lockfile
COPY . /app

CMD ["npm", "run", "start"]

EXPOSE 8081