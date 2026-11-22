FROM alpine:3.20
RUN mkdir -p /vol
ADD voldev.tar /
VOLUME /vol
COPY server.js /app/server.js
WORKDIR /app
EXPOSE 3000
CMD ["node","server.js"]
