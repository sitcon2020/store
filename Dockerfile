FROM node:latest
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm config set unsafe-perm true
RUN cd /usr/src/app && npm i fsevents@latest -f --save-optional && npm install truffle@5.1.36 && npm i @truffle/hdwallet-provider && npm install && npm install -g lite-server
RUN npm audit fix
EXPOSE 3000
CMD [ "npm", "run", "dev" ]

