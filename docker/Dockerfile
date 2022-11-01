FROM node:14-slim
RUN mkdir /nodedir
WORKDIR /nodedir
ADD package.json /nodedir
ADD angular.json /nodedir
ADD karma.conf.js /nodedir
ADD .browserslistrc /nodedir
ADD tsconfig.app.json /nodedir
ADD tsconfig.base.json /nodedir
ADD tsconfig.json /nodedir
ADD tsconfig.spec.json /nodedir
ADD tslint.json /nodedir
RUN npm install -g @angular/cli
RUN npm install

