//Headline Model --> What JSON material we want going through

//Require mongoose
var mongoose = require("mongoose");

//Models are fancy constructors compiled from our Schema definitions. 
//Instances of these models represent documents which can be saved and retrieved from our database. 
//All document creation and retrieval from the database is handled by these models.
//Create a schema class using mongoose schema method ( http://mongoosejs.com/docs/models.html )

var Schema = mongoose.Schema;

//Create the headlineSchema using the schema class
var headlineSchema = new Schema({
	// headline, a string, must be entered
	headline: {
		type: String,
		required: true,
		unique: true
	},
	//summary, a string must be entered
	summary: {
		type: String,
		required: true
	},
	// url, a string, must be entered
	url: {
		type: String,
		required: true
	},
	// date is just a string
	date: String,
	saved: {
		type: Boolean,
		default: false
	}
});

// Create the Headline model using the headlineSchema
var Headline = mongoose.model("Headline", headlineSchema);

// Export the Headline model
module.exports = Headline;
