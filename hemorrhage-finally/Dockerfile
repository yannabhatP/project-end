FROM node:16-alpine


RUN mkdir /web-app-ml

WORKDIR /web-app-ml

COPY ./ ./

RUN npm install
RUN npm i sharp
RUN npm run build


EXPOSE 3002

CMD ["npm","start"]