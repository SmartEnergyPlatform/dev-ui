FROM node:8.9

COPY . /workspace
WORKDIR /workspace
RUN npm install 
RUN npm run-script build 

EXPOSE 80
CMD node ./server

