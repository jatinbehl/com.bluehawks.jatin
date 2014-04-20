var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
});

// mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb://107.170.96.216/alert');
//mongoose.connection.db.dropDatabase();

var alertSchema = new mongoose.Schema({
	  name: { type: String }
	, latitude:Number
	, longitude:Number
	, phoneNumber:{ type: String } 
	, date: { type: Date, default: Date.now }
	,health:{type: String, default: "No health Issues" }
	});

var Alert = mongoose.model('Alert', alertSchema);

var notification = new Alert({
	 name: 'Jatin Behl'
	, latitude: -73.40040404
	, longitude: 49.32323233
	, phoneNumber:'6472903151'
	, date: new Date
	, health : 'Khansi'
	});

notification.save(function(err, notification) {
	  if (err) return console.error(err);
	  console.dir('saved notification');
	  mongoose.connection.close();
	});

var something;
var nothing;
//find alert from a specific person
//Alert.findOne({ name: 'Jatin Behl' }, function(err, something) {
////	  if (err) return console.error(err);
//	  if (err) ; 
//	  console.dir('something');
//	  console.dir(something);
//	  mongoose.connection.close();
//	});


//Alert.find( //query today up to tonight
//		  {date: {"$gte": new Date(2014, 2, 1), "$lt": new Date(2014, 5, 20)}})
var anotherThing;
//Alert.find({date: {"$gte": new Date(2014, 2, 1), "$lt": new Date(2014, 5, 20)}}, function(err, anotherThing) {
////	  if (err) return console.error(err);
//	  if (err);
//	  console.dir('anotherThing');
//	  console.dir(anotherThing);
//	  mongoose.connection.close();
//	});
//
//		  
		  
//remove everything from the document Alert.
//Alert.remove({}, function (err) {
////	  if (err) return console.error(err);
//	  if (err) ;
//	  console.dir('cleaned');
//	  mongoose.connection.close();
//	});


