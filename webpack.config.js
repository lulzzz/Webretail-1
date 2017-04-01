var environment = (process.env.NODE_ENV || "development").trim();

if (environment === "development") {
    module.exports = require('./webpack.dev.js');
} else if (environment === "production") {
    module.exports = require('./webpack.prod.js');
} else {
    module.exports = require('./webpack.aot.js');
}