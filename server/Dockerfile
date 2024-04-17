FROM node:21-alpine3.18 as base
WORKDIR /app

FROM base as build
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
RUN npm run test

FROM base as prod
COPY --from=build /app/dist ./dist
COPY package.json package-lock.json ./
RUN npm install --omit=dev
EXPOSE 4000 
CMD ["npm", "run", "start:prod"]