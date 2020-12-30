FROM node:stretch-slim
RUN npm install
RUN npm install --save-dev @angular-devkit/build-angular
RUN npm install -g @angular/cli



#ENTRYPOINT ["ng","serve","--host","0.0.0.0"]


#ENTRYPOINT ["bash","--rcfile","/entrypoint.sh"]
RUN mkdir /app
WORKDIR /app
#ENTRYPOINT ["/bin/sh","-c","entrypoint.sh"]
#ENTRYPOINT ["tail", "-f", "/dev/null"]
#ENTRYPOINT ["ng","build","--prod","--output-path","gui","--base-href","/gui/"]
ENTRYPOINT ["./build.sh"]
