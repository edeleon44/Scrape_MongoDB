// Note Model --> user discussion / placment of user comment ==> JSON Constunction

// Require mongoose
var mongoose = require("mongoose");
//Models are fancy constructors compiled from our Schema definitions. 
//Instances of these models represent documents which can be saved and retrieved from our database. 
//All document creation and retrieval from the database is handled by these models.
//Create a schema class using mongoose schema method ( http://mongoosejs.com/docs/models.html )

var Schema = mongoose.Schema;

//Create the noteSchema with the schema object
var noteSchema = new Schema({
	// Incorporate the headline with the note by using _headlineId
	_headlineId: {
		type: Schema.Types.ObjectId,
		ref: "Headline"
	},
	//date is just a string
	date: String,
	// as is the noteText
	noteText: String
});

// Create the Note model using the noteSchema
var Note = mongoose.model("Note", noteSchema);

// Export the Note model
module.exports = Note;