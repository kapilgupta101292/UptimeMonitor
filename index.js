const http = require('http');
const url = require('url');

const server = http.createServer(function (req, res) {
	// Get the URL and parse it
	var parsedUrl = url.parse(req.url, true);

	// Get the path
	var path = parsedUrl.pathname;
	var trimmedPath = path.replace(/^\/+|\/+$/g, '');

	// Send the response
	res.end('Hello World');

	// Log the request path
	console.log('Request Received on path:' + trimmedPath);
});

// Start the server, and have it listen on the port 3000
server.listen(3000, function () {
	console.log('The server is listening to port 3000 now');
});
