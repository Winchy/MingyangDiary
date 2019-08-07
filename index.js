const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 80;

const server = http.createServer((req, res) => {
    console.log(req.method);
    console.log(req.url)
    console.dir(req);
    // console.log(new URL(req.url))
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
});
