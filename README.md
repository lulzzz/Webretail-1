<img src="https://github.com/gerardogrisolini/Webretail/blob/master/AdminUI/src/assets/logo.jpg?raw=true" width="80" alt="Webretail - RMS" />

# Webretail - RMS

Retail Management System and e-Commerce
developed with Swift 4.0, Angular 4.0 and PostgreSQL 10.0.

#### Under active development. Please do not use.

Try Demo <a href="http://webretail.cloud:8181">Webretail</a>
usr: admin
pwd: admin

Try WebApp for eCommerce <a href="http://webretail.cloud">e-Commerce</a>


## Build Notes

Ensure you have installed Xcode 9.0 or later.


### macOS

If you receive a compile error that says the following, you need to install and link libxml2

```
note: you may be able to install libxml-2.0 using your system-packager:

    brew install libxml2

Compile Swift Module 'PerfectXML' (2 sources)
<module-includes>:1:9: note: in file included from <module-includes>:1:
#import "libxml2.h"
```

To install and link libxml2 with homebrew, use the following two commands

```
brew install libxml2
brew link --force libxml2
```

To install postgres:

```
brew install postgres
```

To install nodejs. libgd and phantomjs:

```
brew install node gd phantomjs
```

### Linux

Ensure that you have installed libxml2-dev and pkg-config.

``` 
sudo apt-get install libxml2-dev pkg-config
```

To install libpq-dev libgd-dev

```
sudo apt-get install libpq-dev libgd-dev
```

To install nodejs and phantomjs:

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt-get install build-essential chrpath libssl-dev libxft-dev libfreetype6-dev libfreetype6 libfontconfig1-dev libfontconfig1 -y
sudo wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2
sudo tar xvjf phantomjs-2.1.1-linux-x86_64.tar.bz2 -C /usr/local/share/
sudo ln -s /usr/local/share/phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin/
```

## Setup - Xcode 9

* If you want to regenerate the xcode project
* In terminal, navigate to the directory and execute

```
swift package generate-xcodeproj
```

* Open `Webretail.xcodeproj`

To run this project from Xcode, edit the Scheme, Under "Options" for "run", check "Use custom working directory" and choose the project's working directory. After doing this, the project can be run from within Xcode.


## Setup - Terminal

* Check out or download the project;
* In terminal, navigate to the directory 
* Execute `swift build --configuration release`
* Once the project has compiled, execute `sudo ../.build/x86_64-unknown-linux/release/Webretail`

```
[INFO] Starting HTTP server on 0.0.0.0:80 with document root ./webroot
```

## Angular 4 - Terminal

Steps for the development UI:

in the subfolders:
* AdminUI
* WebUI

```
npm install
npm start
```

Steps for build UI:
```
npm run build
```

## Docker - Terminal

* Postgresql

```
docker pull postgres
docker run -p 5432:5432 --name db -e POSTGRES_DB=webretail -e POSTGRES_PASSWORD=postgres -d postgres
```

* Webretail

```
docker build -t webretail .
docker run -d -p 80:8181 --link db -t webretail
```
