const http = require('http');
const url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer(function (req, res) {
	// Get the URL and parse it
	var parsedUrl = url.parse(req.url, true);

	// Get the path
	var path = parsedUrl.pathname;
	var trimmedPath = path.replace(/^\/+|\/+$/g, '');

	// Get the query string as an object
	var queryStringObject = parsedUrl.query;
	console.log('query string is ' + JSON.stringify(queryStringObject));

	// Get the HTTP method
	var method = req.method.toLowerCase();
	console.log('Method is ' + method);

	// Get the headers as an object
	var headers = req.headers;
	console.log('Headers is', headers);

	// Get the payload if any
	var decoder = new StringDecoder('utf-8');
	var buffer = '';

	req.on('data', function (data) {
		buffer += decoder.write(data);
	});

	req.on('end', function () {
		buffer += decoder.end();

		var chosenHandler =
			typeof router[trimmedPath] !== 'undefined'
				? router[trimmedPath]
				: handlers.notFound;

		// construct the data object to send to the handler.
		var data = {
			trimmedPath: trimmedPath,
			queryStringObject: queryStringObject,
			method: method,
			header: headers,
			payload: buffer,
		};

		// Route the request
		chosenHandler(data, function (statusCode, payload) {
			// use the status code called back by the handler or default to empty object.
			statusCode = typeof statusCode == 'number' ? statusCode : 200;

			// use the payload called back by the handler or default to empty object.
			payload = typeof payload == 'object' ? payload : {};

			// convert the payload to a string.
			var payloadString = JSON.stringify(payload);

			// return the response
			res.writeHead(statusCode);
			res.end(payloadString);

			// Log the request path
			console.log('Returning the response', statusCode, payload);
		});
	});
});

// Start the server, and have it listen on the port 3000
server.listen(3000, function () {
	console.log('The server is listening to port 3000 now');
});

// Define the handler
var handlers = {};
handlers.sample = function (data, callback) {
	// Callback a http sattus code and a payload object.
	callback(406, { name: 'sample handler' });
};

// Not found handler
handlers.notFound = function (data, callback) {
	callback(404);
};

// Define a request router
var router = {
	sample: handlers.sample,
};
