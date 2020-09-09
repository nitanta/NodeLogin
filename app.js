// app.js

var express = require("express");
var bodyParser = require("body-parser");
var config = require("./config/config");

var product = require("./routes/product"); // Imports routes for the products
var user = require("./routes/user");
var image = require("./routes/image"); // Imports routes for the users
var thirdparty = require("./routes/thirdparty"); // Imports routes for the products
var app = express();

// Set up mongoose connection
var mongoose = require("mongoose");
var dev_db_url = config.db;
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/products", product);
app.use("/users", user);
app.use("/images", image);
app.use("/thirdparty", thirdparty);


var port = 1234;

app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});
