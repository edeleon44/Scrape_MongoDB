//Contrillers for the headlines

// Bring in our scrape and makeDate scripts
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

// Bring in the Headline and Note mondoose models
var Headline = require("../models/Headline");

module.exports = {
	fetch: function(cb) {
		//Run Scrape function

		scrape(function(data) {
			// Here data is an array of article objects with headlins and summaries

			var articles = data;
			// Assign each article a date
			for (var i = 0; i < articles.length; i++) {
				articles[i].date = makeDate();
				articles[i].saved = false;
			}
			// Access collection to access the Mongo insertMany method.
			Headline.collection.insertMany(articles, { ordered: false }, function(err, docs) {
				cb(err, docs);
			}); 
		});
	},
	delete: function(query, cb) {
		Headline.remove(query, cb);
	},
	get: function(query, cb) {
		//Prepare a query to get the data we scrape
		// Then sort from most recent ; by id number
		Headline.find(query)
		 .sort({
		 	_id: -1
		 })
		 // Execute this query
		 .exec(function(err, doc) {
		 	// Once completed, pass the list into the callback function
		 	cb(doc);
		 });
	},
	update: function(query, cb) {
		// Update the headline with the id
		// set it to be equal to any new values we pass in on query ($set)
		Headline.update({ _id: query._id }, {
			$set: query
		}, {}, cb);
	}
};