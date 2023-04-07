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
//init db
initMongoDb
// checkOverload();
//init routes
app.get('/' , (req,res,next) => {
    return res.status(200).send("Hello World 123")
})
//handling error

module.exports = app;
