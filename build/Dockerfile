FROM node:stretch-slim
RUN npm install -g @angular/cli
RUN mkdir -p /app
COPY package.json /app
COPY . /app
COPY build/build.sh /app
WORKDIR /app
#ENTRYPOINT ["tail", "-f", "/dev/null"]
ENTRYPOINT ["./build.sh"]
