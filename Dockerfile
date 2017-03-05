FROM swiftdocker/swift
WORKDIR /app

EXPOSE 8080

RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get update
RUN apt-get -qq update
RUN apt-get install -y nodejs
RUN update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10

COPY . .

RUN npm install
RUN npm run publish
RUN rm -rf node_modules

ENTRYPOINT [".build/debug/Webretail"]
