/*******************************************************************************
 * database setup
 */
var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
	// Create your schemas and models here.
});

mongoose.connect('mongodb://107.170.96.216/alert');
var alertSchema = new mongoose.Schema({
	name : {
		type : String
	},
	latitude : Number,
	longitude : Number,
	phoneNumber : {
		type : String
	}
	 , date: {
	 type: Date, default: Date.now
	 }
	 ,health:{
	 type: String, default: "No health Issues"
	 }
	,
	tag : {
		type : String
	}
});

var Alert = mongoose.model('Alert', alertSchema);

var infoSchema = new mongoose.Schema({
	name : {
		type : String
	},
	latitude : Number,
	longitude : Number,
	phoneNumber : {
		type : String
	}
	 , date: {
	 type: Date, default: Date.now
	 }
	 ,info:{
	 type: String, default: "Empty"
	 }
	,
	tag : {
		type : String
	}
});

var Info = mongoose.model('Info', infoSchema);

/*******************************************************************************
 * database setup end *****************
 */
var array = [];

/*
 * respond to alert messages
 */
function start(response, postData) {
	console.log("Request handler 'start' was called.");
	response.writeHead(200, {
		"Content-Type" : "text/plain",
		"Access-Control-Allow-Origin" : "*",
		"Access-Control-Allow-Headers" : "X-Requested-With"
	});

	var longitude = getUrlParameters("longitude", postData, true);
	var latitude = getUrlParameters("latitude", postData, true);
	var name = getUrlParameters("name", postData, true);
	var phone = getUrlParameters("phone", postData, true);
	var health = getUrlParameters("health", postData, true);
	
	/*
	 * save every notification as permanent notification to be 
	 * used in analytics later
	 */
	var permanentalertNotification = new Alert({
		name : name,
		latitude : latitude,
		longitude : longitude,
		phoneNumber : phone,
		date : new Date,
		health : health,
		tag : 'permanentalertNotification'
	});
	permanentalertNotification.save(function(err, permanentalertNotification) {
		if (err) {
			return console.error(err);
		} else {
			console.dir('Saved the incoming notification to permanent data set');
		}
	});
	
	/*
	 * save the notification as regular notification 
	 * to be shown on security terminal
	 */
	var notification = new Alert({
		name : name,
		latitude : latitude,
		longitude : longitude,
		phoneNumber : phone,
		date : new Date,
		health : health,
		tag : 'alert'
	});
	// save the alert data in database
	notification.save(function(err, notification) {
		if (err) {
			response.write("something went wrong while saving the notification");
			response.end();
			console.dir("something went wrong while saving the notification");
			console.dir(err);
			return console.error(err);
		} else {
			console.dir('Saved the incoming notification');
			/**
			 * find the same data and respond back to sender as a
			 * confirmation
			 */
			Alert.find({
				name : name,
				tag : 'alert'
			}, function(err, something) {
				if (err) {
					return console.error(err);
					response.write("something went wrong while finding the notification");
					response.end();
				} else {
					console.dir('data requested by security terminal');
					// response.write(""+JSON.stringify(something));
					response.write("Sucess");
					response.end();
				}
			});
			/** ** */
		}
	});
}

/*
 * This function is called to query the alert data and 
 * show it on a map.
 * Return all the data with tag: alert
 */
function upload(response, postData) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {
		"Content-Type" : "text/plain",
		"Access-Control-Allow-Origin" : "*",
		"Access-Control-Allow-Headers" : "X-Requested-With"
	});
	Alert.find({
		tag : 'alert'
	}, function(err, something) {
		if (err) {
			return console.error(err);
			response.write("something went wrong");
			response.end();
		} else {
			console.dir('data requested by security terminal');
			
			/*
			 * remove the data from the temporary database once it has been 
			 * sent to the security terminal
			 */
			Alert.remove({tag : 'alert'}, function (err) {
				  if (err) {
					  return console.error(err);
				  }
				  else{
				  console.dir('cleaned alert');
				  }
				});
			/*
			 * remove end
			 */
			response.write(""+ JSON.stringify(something));
			response.end();
		}
	});

	// response.write(""+JSON.stringify(something));
	// response.end();
}

function remove(response, postData) {
	console.log("Request handler 'remove' was called.");
	response.writeHead(200, {
		"Content-Type" : "text/plain",
		"Access-Control-Allow-Origin" : "*",
		"Access-Control-Allow-Headers" : "X-Requested-With"
	});
	var n = getUrlParameters("n", postData, true);
//	removeObject(array, n);
	Alert.remove({name:n,tag : 'alert'}, function (err) {
		  if (err) {
			  return console.error(err);
		  }
		  else{
		  console.dir('cleaned');
		  }
		});

	response.write("removing object with name " + n);
	response.end();
}

function removeinfo(response, postData) {
	console.log("Request handler 'removeinfo' was called.");
	response.writeHead(200, {
		"Content-Type" : "text/plain",
		"Access-Control-Allow-Origin" : "*",
		"Access-Control-Allow-Headers" : "X-Requested-With"
	});
	var n = getUrlParameters("n", postData, true);
//	removeObject(array, n);
	Info.remove({name:n,tag : 'info'}, function (err) {
		  if (err) {
			  return console.error(err);
		  }
		  else{
		  console.dir('cleaned alert');
		  }
		});

	response.write("removing info object with name " + n);
	response.end();
}

/*
 * This will receive custom message from the users
 * on handle /info
 * tag : 'info'
 */
function info(response, postData) {
	console.log("Request handler 'info' was called.");
	response.writeHead(200, {
		"Content-Type" : "text/plain",
		"Access-Control-Allow-Origin" : "*",
		"Access-Control-Allow-Headers" : "X-Requested-With"
	});

	var longitude = getUrlParameters("longitude", postData, true);
	var latitude = getUrlParameters("latitude", postData, true);
	var name = getUrlParameters("name", postData, true);
	var phone = getUrlParameters("phone", postData, true);
	var info = getUrlParameters("info", postData, true);
	
	/*
	 * save every notification as permanent notification to be 
	 * used in analytics later
	 */
	var permanentinfoNotification = new Info({
		name : name,
		latitude : latitude,
		longitude : longitude,
		phoneNumber : phone,
		date : new Date,
		info : info,
		tag : 'permanentinfoNotification'
	});
	permanentinfoNotification.save(function(err, permanentinfoNotification) {
		if (err) {
			return console.error(err);
		} else {
			console.dir('Saved the incoming info notification to permanent data set');
		}
	});
	
	/*
	 * save the notification as regular notification 
	 * to be shown on security terminal
	 */
	var notification = new Info({
		name : name,
		latitude : latitude,
		longitude : longitude,
		phoneNumber : phone,
		date : new Date,
		info : info,
		tag : 'info'
	});
	// save the info data in database
	notification.save(function(err, notification) {
		if (err) {
			response.write("something went wrong");
			response.end();
			return console.error(err);
		} else {
			console.dir('Saved the incoming info notification');

			/**
			 * find the same data and respond back to sender as a
			 * confirmation
			 */
			Alert.find({
				name : name,
				tag : 'info'
			}, function(err, something) {
				if (err) {
					return console.error(err);
					response.write("something went wrong");
					response.end();
				} else {
					console.dir('info data requested by security terminal');
					// response.write(""+JSON.stringify(something));
					response.write("Success");
					response.end();
				}
			});
			/** ** */
		}
	});
}

/*
 * this will send the user sent custom info data
 * to the security page
 * handle /getinfo
 * tag info
 */
function getinfo(response, postData) {
	console.log("Request handler 'getinfo' was called.");
	response.writeHead(200, {
		"Content-Type" : "text/plain",
		"Access-Control-Allow-Origin" : "*",
		"Access-Control-Allow-Headers" : "X-Requested-With"
	});
	Info.find({
		tag :'info'
	}, function(err, something) {
		if (err) {
			return console.error(err);
			response.write("something went wrong");
			response.end();
		} else {
			console.dir('getinfo data requested by security terminal');
			response.write(""+ JSON.stringify(something));
			/*
			 * remove the info from the database after sending 
			 * to the terminal
			 */
			Info.remove({tag : 'info'}, function (err) {
				  if (err) {
				  return console.error(err);
				  }
				  else{
				  console.dir('cleaned info');
				  }
				});
			
			response.end();
		}
	});

	// response.write(""+JSON.stringify(something));
	// response.end();
}

function getUrlParameters(parameter, staticURL, decode) {

	var currLocation = (staticURL.length) ? staticURL : window.location.search,
	// parArr = currLocation.split("?")[1].split("&"),
	parArr = currLocation.split("&"), returnBool = true;

	for (var i = 0; i < parArr.length; i++) {
		parr = parArr[i].split("=");
		if (parr[0] == parameter) {
			//var res =parr[1].replace("/+/g", " ");
			var replaced = parr[1].split('+').join(' ');
			return (decode) ? decodeURIComponent(replaced) : replaced;
//			return (decode) ? decodeURIComponent(parr[1]) : parr[1];
			returnBool = true;
		} else {
			returnBool = false;
		}
	}

	if (!returnBool)
		return false;
}
function removeObject(a, obj) {
	for (var i = 0; i < a.length; i++) {
		if (JSON.stringify(a[i].n) == JSON.stringify(obj)) {
			a.splice(i, 1);
		}
	}
}


exports.start = start;
exports.upload = upload;
exports.remove = remove;
exports.removeinfo = removeinfo;
exports.info = info;
exports.getinfo = getinfo;