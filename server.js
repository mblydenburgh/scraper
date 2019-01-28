// Define Server dependancies
const express = require("express");
const mongodb = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const logger = require("morgan");

// Initialize server variables and middleware
const app = express();
const PORT = process.env.PORT || 3042;
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const db = require("./models/index.js");

// Initialize Templating Engine
const expresshbs = require("express-handlebars");
app.engine("handlebars", expresshbs({ defaultLayout: 'main' }));
app.set("view engine","handlebars");
require('./routes/api-routes')(app);



async function startServer(){
    return app.listen(PORT,() => console.log(`Serving fools on port ${PORT}`));
}

startServer();