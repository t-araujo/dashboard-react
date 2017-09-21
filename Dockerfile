FROM node

RUN mkdir /dashboard

WORKDIR /dashboard

ADD package.json /dashboard/package.json

COPY . /dashboard

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]