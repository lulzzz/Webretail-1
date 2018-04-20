FROM swiftdocker/swift:latest

WORKDIR /app
ENV DEBIAN_FRONTEND noninteractive
EXPOSE 8181

RUN apt-get -y update && apt-get install -y libssl-dev libcurl4-openssl-dev libpq-dev uuid-dev libxml2-dev pkg-config wget
RUN apt-get install build-essential chrpath libxft-dev libfreetype6-dev libfreetype6 libfontconfig1-dev libfontconfig1 -y
RUN wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2
RUN tar xvjf phantomjs-2.1.1-linux-x86_64.tar.bz2 -C /usr/local/share/
RUN ln -s /usr/local/share/phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin/
RUN rm -f phantomjs-2.1.1-linux-x86_64.tar.bz2

#RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
#RUN apt-get install -y nodejs

RUN rm -rf /var/lib/apt/lists/*

ADD buildlinux .
ADD Package.swift .
COPY Sources ./Sources/

COPY webroot ./webroot/
#COPY AdminUI ./AdminUI/
#COPY *.json ./
#COPY *.js ./

RUN swift build --configuration release
#RUN npm install
#RUN npm run build
#RUN rm -rf node_modules

ENTRYPOINT [".build/x86_64-unknown-linux/release/Webretail"]
