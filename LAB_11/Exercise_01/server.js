const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    if (req.url === '/' && req.method === 'GET') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;

        res.write('<html>');
        res.write('<head><title>Node.js Web Server</title></head>');
        res.write('<body>');
        res.write('<h1>Welcome to Node.js Web Server</h1>');
        res.write('<p>This server is built using the built-in http module.</p>');
        res.write('<p>Try visiting <a href="/about">/about</a> or <a href="/contact">/contact</a></p>');
        res.write('</body>');
        res.write('</html>');
        
        res.end();

    } else if (req.url === '/about' && req.method === 'GET') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.write('<html><body>');
        res.write('<h1>About Page</h1>');
        res.write('<p>This is a simple Node.js HTTP server exercise.</p>');
        res.write('<p><a href="/">Back to Home</a></p>');
        res.write('</body></html>');
        res.end();

    } else if (req.url === '/contact' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        const contactInfo = {
            message: 'Contact Page',
            email: 'example@example.com',
            phone: '123-456-7890'
        };
        res.end(JSON.stringify(contactInfo, null, 2));

    } else {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 404;
        res.write('<html><body>');
        res.write('<h1>404 - Page Not Found</h1>');
        res.write('<p>The requested resource was not found.</p>');
        res.write('<p><a href="/">Back to Home</a></p>');
        res.write('</body></html>');
        res.end();
    }
});

server.listen(port, hostname, () => {
    console.log('=================================');
    console.log('  Node.js HTTP Server Started');
    console.log('=================================');
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log('Press Ctrl+C to stop the server');
});
