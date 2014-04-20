/***********
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
	  name: { type: String }
	, latitude:Number
	, longitude:Number
	, phoneNumber:{ type: String } 
	, date: { type: Date, default: Date.now }
	,health:{type: String, default: "No health Issues"}
	});

var Alert = mongoose.model('Alert', alertSchema);

/*
 * database setup end.
 */

var array = [];

function start(response, postData) {
	console.log("Request handler 'start' was called.");
	response.writeHead(200, {
		"Content-Type" : "text/plain",
		"Access-Control-Allow-Origin" : "*",
		"Access-Control-Allow-Headers" : "X-Requested-With"			
	});
	
	var longitude = getUrlParameters("longitude",postData, true);
	var latitude = getUrlParameters("latitude",postData, true);
	var name = getUrlParameters("name",postData, true);
	var phone = getUrlParameters("phone",postData, true);
	var health = getUrlParameters("health",postData, true);
	
	var notification = new Alert({
		  name: name
		, latitude: latitude
		, longitude: longitude
		, phoneNumber: phone
		, date: new Date
		, health : health
		});
	
	notification.save(function(err, notification) {
		  if (err) return console.error(err);
		  console.dir('saved notification');
		});
	
//	var something = Alert.find({name:name}, function(err, something) {
//		  if (err) return console.error(err);
////		  if (err) return; 
//		  console.dir('something');
//		  console.dir(something);
//		});
	
	var something = retrieveAlertByname(name, function(err, user) {
		  if (err) {
		    console.log(err);
		  }
		  else{
			  return user;
		  }
		  // do something with user
		});
	
	
	var person_data = {lat: latitude, lon : longitude, n : name};
	 for (var i = 0; i < array.length; i++) {
	        var entity = array[i].n;
	       if(entity==person_data.n){
	    	   array.splice(i,1);
	       }
	 }

	array.push(person_data);
	response.write(""+JSON.stringify(something));
	response.end();
}
function upload(response, postData) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {
		"Content-Type" : "text/plain",
		"Access-Control-Allow-Origin" : "*",
		"Access-Control-Allow-Headers" : "X-Requested-With"			
	});
	something = Alert.find({}, function(err, something) {
	  if (err) return console.error(err);
	  console.dir('something');
	  console.dir(something);
	  return something;
	});
	
	response.write(""+JSON.stringify(something));
	response.end();
}

function remove(response, postData) {
	console.log("Request handler 'remove' was called.");
	response.writeHead(200, {
		"Content-Type" : "text/plain",
		"Access-Control-Allow-Origin" : "*",
		"Access-Control-Allow-Headers" : "X-Requested-With"			
	});
	var n = getUrlParameters("n",postData, true);
	removeObject(array, n);
	response.write("removing object with name "+n);
	response.end();
}


function getUrlParameters(parameter, staticURL, decode){

	   var currLocation = (staticURL.length)? staticURL : window.location.search,
	       //parArr = currLocation.split("?")[1].split("&"),
			   parArr = currLocation.split("&"),
	       returnBool = true;
	   
	   for(var i = 0; i < parArr.length; i++){
	        parr = parArr[i].split("=");
	        if(parr[0] == parameter){
	            return (decode) ? decodeURIComponent(parr[1]) : parr[1];
	            returnBool = true;
	        }else{
	            returnBool = false;            
	        }
	   }
	   
	   if(!returnBool) return false;  
	}
function removeObject(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (JSON.stringify(a[i].n) == JSON.stringify(obj)) {
        a.splice(i,1);
        }
    }
}
function retrieveAlertByname(uname, callback) {
	  Alert.find({uname: uname}, function(err, users) {
	    if (err) {
	      callback(err, null);
	    } else {
	      callback(null, users);
	    }
	  });
	};
	
	
exports.start = start;
exports.upload = upload;
exports.remove = remove;