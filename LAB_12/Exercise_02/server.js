const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[Logger] ${req.method} ${req.url} - ${timestamp}`);
    next();
});

let requestCount = 0;
app.use((req, res, next) => {
    requestCount++;
    console.log(`[Counter] Total requests so far: ${requestCount}`);
    next();
});

app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'Custom-Express-Middleware');
    res.setHeader('X-Request-Id', Date.now().toString());
    console.log('[Header] Custom headers added to response');
    next();
});

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(`[Auth] Checking authorization...`);

    

    if (!token || token !== 'Bearer secret123') {
        console.log('[Auth] Authorization failed');
        return res.status(401).json({ error: 'Unauthorized - Invalid or missing token' });
    }

    console.log('[Auth] Authorization successful');
    next();
};

const validateBody = (req, res, next) => {
    console.log('[Validate] Checking request body...');
    if (!req.body || Object.keys(req.body).length === 0) {
        console.log('[Validate] Empty body detected');
        return res.status(400).json({ error: 'Request body cannot be empty' });
    }
    console.log('[Validate] Body is valid');
    next();
};

app.get('/', (req, res) => {
    res.json({ message: 'Welcome! This is a public route.', requestCount });
});

app.get('/api/status', (req, res) => {
    res.json({ status: 'running', uptime: process.uptime(), requestCount });
});

app.get('/api/dashboard', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome to the protected dashboard!', data: { users: 42, active: 15 } });
});

app.post('/api/data', authMiddleware, validateBody, (req, res) => {
    console.log('[Route] Processing data...');
    res.status(201).json({ message: 'Data received successfully', receivedData: req.body });
});

app.get('/api/time', (req, res, next) => {
    console.log('[Inline Middleware] Adding server time');
    req.serverTime = new Date().toISOString();
    next();
}, (req, res) => {
    res.json({ serverTime: req.serverTime });
});

app.listen(PORT, () => {
    console.log('=================================');
    console.log('  Express Middleware Demo');
    console.log('=================================');
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Endpoints:');
    console.log('  GET  /             (public)');
    console.log('  GET  /api/status   (public)');
    console.log('  GET  /api/time     (public + inline middleware)');
    console.log('  GET  /api/dashboard (protected - needs auth header)');
    console.log('  POST /api/data     (protected - needs auth + body)');
    console.log('Auth header: Authorization: Bearer secret123');
});
