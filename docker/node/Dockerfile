FROM node:stretch-slim
COPY . /usr/src/videoviz-gui/
WORKDIR /usr/src/videoviz-gui
RUN npm install
RUN npm install -g @angular/cli
#ENTRYPOINT ["ng","serve","--host","0.0.0.0"]
RUN cat /usr/src/videoviz-gui/angular.json
CMD ng serve --host 0.0.0.0
