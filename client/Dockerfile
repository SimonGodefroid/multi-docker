FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
# copy the configuration from client/nginx to the nginx
# conf folder in the conainer
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# copy from the builder image, the build folder into nginx's folder
# inside the container
COPY --from=builder /app/build usr/share/nginx/html
