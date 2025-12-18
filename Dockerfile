FROM node:lts-alpine AS builder
WORKDIR /app
COPY ./ /app
RUN npm install --unsafe-perm --no-update-notifier --no-fund --no-deprecation --no-audit
RUN npm run build

FROM nginx:stable-alpine AS basic
ARG API_URL
ARG EVENT_URL
ARG TZ

ENV API_URL=${API_URL}
ENV EVENT_URL=${EVENT_URL}
ENV TZ=${TZ}

COPY --from=builder ["/app/dist/",  "/usr/share/nginx/html"]
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
