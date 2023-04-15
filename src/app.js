const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const initMongoDb = require("./database/init.mongodb");
const { checkOverload } = require("./helpers/checkConnection");

const app = express();


//init middewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({
    extended: true
}))
//init db
initMongoDb
// checkOverload();
//init routes
app.use("/", require('./routes'));
//handling error

module.exports = app;
