const http = require('http');

const server = http.createServer(function (req, res) {
	res.end('Hello World');
});

server.listen(3000, function () {
	console.log('The server is listening to port 3000 now');
});
