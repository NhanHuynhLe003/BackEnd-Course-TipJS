'use strict'

const mongoose = require("mongoose");
const { countConnect } = require("../helpers/checkConnection");

const connectStr = `mongodb://localhost:27017/shopDEV`;

class Database {
  constructor() {
    this.connect();
  }
  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectStr)
      .then(() => console.log("Connect MongoDb Successfully!", countConnect())).catch(err => console.log('connect database have error!'))
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const initMongoDb = Database.getInstance();
module.exports = initMongoDb
