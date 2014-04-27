var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/remove"] = requestHandlers.remove;
handle["/info"] = requestHandlers.info;
handle["/getinfo"] = requestHandlers.getinfo;
handle["/removeinfo"] = requestHandlers.removeinfo;

server.start(router.route, handle);