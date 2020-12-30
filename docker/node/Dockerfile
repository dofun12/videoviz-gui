FROM node:stretch-slim
RUN npm install -g @angular/cli
RUN npm install --save-dev @angular-devkit/build-angular
#ENTRYPOINT ["ng","serve","--host","0.0.0.0"]


#ENTRYPOINT ["bash","--rcfile","/entrypoint.sh"]
RUN mkdir /app
WORKDIR /app
#ENTRYPOINT ["/bin/sh","-c","entrypoint.sh"]
#ENTRYPOINT ["tail", "-f", "/dev/null"]
#ENTRYPOINT ["ng","build","--prod","--output-path","gui","--base-href","/gui/"]
ENTRYPOINT ["./build.sh"]
