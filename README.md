# Webretail - RMS

<img src="https://github.com/gerardogrisolini/Webretail/blob/master/wwwroot/images/logo.jpg?raw=true" width="80" alt="Webretail - RMS" />

Retail Management System developed with Swift, Angular2 and PostgreSQL.


#### Under active development. Please do not use.




## Build Notes

Ensure you have installed Xcode 8.0 or later.

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

To install Postgres:

```
brew install postgres
```

### Linux

Ensure that you have installed libxml2-dev and pkg-config.

``` 
sudo apt-get install libxml2-dev pkg-config
```

To install libpq-dev

```
sudo apt-get install libpq-dev
```

## Setup - Xcode 8

* Check out or download the project;
* In terminal, navigate to the directory and execute

```
swift package generate-xcodeproj
```

* Open `Webretail.xcodeproj`

To run this project from Xcode, edit the Scheme, Under "Options" for "run", check "Use custom working directory" and choose the project's working directory. After doing this, the project can be run from within Xcode.

## Setup - Terminal

* Check out or download the project;
* In terminal, navigate to the directory 
* Execute `swift build`
* Once the project has compiled, execute `./.build/debug/Webretail`

```
[INFO] Starting HTTP server on 0.0.0.0:8080 with document root ./wwwroot
```

## Angular2

Steps for the development UI:

```
npm install
npm start

go to http://localhost:8888/webpack-dev-server/
```
