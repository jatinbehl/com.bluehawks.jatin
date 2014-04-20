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
var something;

//Alert.find({}, function(err, something) {
//	  if (err) return console.error(err);
////	  if (err) ; 
//	  console.dir('something');
//	  console.dir(something);
//	  mongoose.connection.close();
//	});

//Alert.find({date: {"$gte": new Date(2014, 2, 1), "$lt": new Date(2014, 3, 20)}}, function(err, something) {
//	  if (err) return console.error(err);
//	  console.dir('something');
//	  console.dir(something);
//	  mongoose.connection.close();
//	});

Alert.find({}, function(err, something) {
	  if (err) {
		  mongoose.connection.close();
		  return console.error(err);
	  }
	  else {
		  mongoose.connection.close();
		  console.dir('data requested by security terminal');
		  console.dir(""+JSON.stringify(something));
	  }
	});

