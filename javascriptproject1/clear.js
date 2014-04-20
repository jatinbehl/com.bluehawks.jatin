/**
 * New node file
 */
var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
});

// mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb://107.170.96.216/alert');
var alertSchema = new mongoose.Schema({
	  name: { type: String }
	, latitude:Number
	, longitude:Number
	, phoneNumber:{ type: String } 
	, date: { type: Date, default: Date.now }
	,health:{type: String, default: "No health Issues" }
	});

var Alert = mongoose.model('Alert', alertSchema);

Alert.remove({}, function (err) {
	  if (err) {
		  mongoose.connection.close();
		  return console.error(err);
	  }
	  else{
	  console.dir('cleaned');
	  mongoose.connection.close();
	  }
	});

