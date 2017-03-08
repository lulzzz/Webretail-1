FROM perfectlysoft/perfectassistant:latest

WORKDIR /app
ENV DEBIAN_FRONTEND noninteractive
EXPOSE 8080

RUN apt-get -y update && apt-get install -y apt-utils curl
RUN apt-get -y update && apt-get install -y libssl-dev libcurl4-openssl-dev libpq-dev uuid-dev libxml2-dev pkg-config

RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get update
RUN apt-get -qq update
RUN apt-get install -y nodejs
RUN update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10

ADD buildlinux .
ADD Package.swift .
ADD favicon.ico .
COPY wwwroot ./wwwroot/
COPY Sources ./Sources/
COPY ClientApp ./ClientApp/
COPY *.json ./
COPY *.js ./

RUN npm install
RUN npm run publish

RUN rm -rf node_modules ClientApp Sources Packages buildlinux

ENTRYPOINT [".build/debug/Webretail"]
