FROM node:18-alpine

ENV PORT 9000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
#RUN npm install
RUN npm install --save-dev eslint --force

# Copying source files
COPY . /usr/src/app

# Building app
RUN npm run build

# npm run build:production
# npm run build:dev
EXPOSE 9000

# Running the app in dev mode
#CMD "npm" "run" "dev"

# Running the app  in production mode
CMD [ "npm", "start" ]

#docker build -t banksathiplus:v1 .
#docker ps
#docker stop  d306bc3bd130
#docker container run -d -p 9000:9000 banksathiplus:v1
#