'use strict'
const {db: {host, name, port}} = require('../configs/configs.mongodb')

const mongoose = require("mongoose");
const { countConnect } = require("../helpers/checkConnection");

const connectStr = `mongodb://${host}:${port}/${name}`;

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
      .then(() => console.log(`Connect MongoDb Successfully on port: ${connectStr}, quantity:`, countConnect())).catch(err => console.log('connect database have error!'))
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
