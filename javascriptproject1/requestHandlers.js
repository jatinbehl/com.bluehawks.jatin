var array = [];

function start(response, postData) {
	console.log("Request handler 'start' was called.");
	// var body = '<html>' + '<head>'
	// + '<meta http-equiv="Content-Type" content="text/html; '
	// + 'charset=UTF-8" />' + '</head>' + '<body>'
	// + '<form action="/upload" method="post">'
	// + '<textarea name="text" rows="20" cols="60"></textarea>'
	// + '<input type="submit" value="Submit text" />' + '</form>'
	// + '</body>' + '</html>';
	// response.writeHead(200, {
	// "Content-Type" : "text/html"
	// });
	// response.write(body);
	response.writeHead(200, {
		"Content-Type" : "text/plain",
		"Access-Control-Allow-Origin" : "*",
		"Access-Control-Allow-Headers" : "X-Requested-With"			
	});
	
	var longitude = getUrlParameters("longitude",postData, true);
	var latitude = getUrlParameters("latitude",postData, true);
	var name = getUrlParameters("name",postData, true);
	var age = getUrlParameters("age",postData, true);
//	var JSONObj = JSON.stringify({ "latitude":latitude, "longitude":longitude, "name":name,"age":age });
//	var JSONObj = JSON.stringify({ "latitude":latitude, "longitude":longitude, "name":name,"age":age });
	var person_data = {lat: latitude, lon : longitude, n : name, a : age};
	 for (var i = 0; i < array.length; i++) {
	        var entity = array[i].n;
	       if(entity==person_data.n){
	    	   array.splice(i,1);
	       }
	 }

	//var myPerson=new person(name,age,latitude,longitude);
	//array.push(JSONObj.latitude + ","+ JSONObj.longitude);
//	array.push(JSONObj);
	array.push(person_data);
	//response.write(JSONObj.latitude + ","+ JSONObj.longitude);
	response.write(""+JSON.stringify(array));
	
	response.end();
}
function upload(response, postData) {
	console.log("Request handler 'upload' was called.");
//	response.writeHead(200, {
//		"Content-Type" : "text/plain"
//	});
	response.writeHead(200, {
		"Content-Type" : "text/plain",
		"Access-Control-Allow-Origin" : "*",
		"Access-Control-Allow-Headers" : "X-Requested-With"			
	});
	response.write(""+JSON.stringify(array));
	response.end();
}
function remove(response, postData) {
	console.log("Request handler 'remove' was called.");
//	response.writeHead(200, {
//		"Content-Type" : "text/plain"
//	});
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
	   /*
	    Function: getUrlParameters
	    Description: Get the value of URL parameters either from 
	                 current URL or static URL
	    Author: Tirumal
	    URL: www.code-tricks.com
	   */
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
exports.start = start;
exports.upload = upload;
exports.remove = remove;