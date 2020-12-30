FROM node:stretch-slim
RUN npm install -g @angular/cli
RUN mkdir -p /app
COPY package.json /app
COPY . /app
COPY build/build.sh /app
WORKDIR /app
#ENTRYPOINT ["/bin/sh","-c","entrypoint.sh"]
#ENTRYPOINT ["tail", "-f", "/dev/null"]
#ENTRYPOINT ["ng","build","--prod","--output-path","gui","--base-href","/gui/"]
ENTRYPOINT ["./build.sh"]
