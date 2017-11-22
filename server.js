//Require all of your Dependancies
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

//Set up PORT
var PORT = process.env.PORT || 3000;

//Kick off Express App
var app = express();

//Set up an Express Router
var router = express.Router();

// //Require our routes file pass our router object
require("./config/routes")(router);

//require Scrape


var scrape = require("./scripts/scrape");
scrape();

// Designate our public folder as a static directory
app.use(express.static(__dirname + "/public"));

//Connect Handlebars to our express app
app.engine("handlebars", expressHandlebars({
	defaultLayour: "main"
}));
app.set("view engine", "handlebars");

//Use bodyParser
app.use(bodyParser.urlencoded({
	extended:false
}));

//We need EVERY request to go through our middleware
//Look into this -->GitHub didn't explain too well.
app.use(router);

//We used a deployed heroku mLab // Use deployed DB, rather than local.
var db = process.env.MONGODB_URI || "mongodb://heroku_hzxkdnxm:81hrrsf17utnotjpan4ceh0a26@ds113636.mlab.com:13636/heroku_hzxkdnxm"
//mongodb://heroku_hzxkdnxm:81hrrsf17utnotjpan4ceh0a26@ds113636.mlab.com:13636/heroku_hzxkdnxm

//Connect mongoose to our DB
mongoose.connect(db, function(error){
	//Log errors while attempting to connect Mongoose with DB
	if (error) {
		console.log("error with MONGOOSE", error);
	}
	//If no error; c.log success!!!
	else{
	console.log("Mongoose Connection Is Rollin!!");
	}
});

//Listen on the PORT
app.listen(PORT, function(){
	console.log("Listening on port:" + PORT);
});


