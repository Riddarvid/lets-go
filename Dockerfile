FROM node:16-alpine as build
WORKDIR /home/node/app

#Install dependencies. Done separately from the other code to utilize caching.
COPY client/package.json client/
COPY client/package-lock.json client/
RUN npm install ci --prefix client

#Add and build app
COPY client/ client/
RUN npm run build --prefix client

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /home/node/app/client/build/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]