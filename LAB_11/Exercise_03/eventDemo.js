const EventEmitter = require('events');

const emitter = new EventEmitter();

console.log('=== Node.js Event-Driven Programming Demo ===\n');

emitter.on('greet', (name) => {
    console.log(`[Listener 1] Hello, ${name}! Welcome to the event demo.`);
});

emitter.on('greet', (name) => {
    console.log(`[Listener 2] Hi ${name}, this is a second listener on the same event!`);
});

emitter.on('calculate', (a, b, operation) => {
    let result;
    switch (operation) {
        case 'add':
            result = a + b;
            break;
        case 'subtract':
            result = a - b;
            break;
        case 'multiply':
            result = a * b;
            break;
        default:
            result = 'Unknown operation';
    }
    console.log(`[Calculate] ${a} ${operation} ${b} = ${result}`);
});

emitter.on('log', (message, level) => {
    const timestamp = new Date().toISOString();
    console.log(`[${level.toUpperCase()}] [${timestamp}] ${message}`);
});

emitter.on('userAction', (action, details) => {
    console.log(`[User Action] Action: ${action}`);
    console.log(`[User Action] Details:`, details);
});

emitter.on('shutdown', () => {
    console.log('\n[Shutdown] Cleaning up resources...');
    console.log('[Shutdown] Application shutting down gracefully.');
    console.log('\n=== Event Demo Completed ===');
});

console.log('--- Emitting "greet" event ---');
emitter.emit('greet', 'Student');

console.log('\n--- Emitting "calculate" events ---');
emitter.emit('calculate', 10, 5, 'add');
emitter.emit('calculate', 20, 8, 'subtract');
emitter.emit('calculate', 7, 6, 'multiply');

console.log('\n--- Emitting "log" events ---');
emitter.emit('log', 'Application started', 'info');
emitter.emit('log', 'Processing data', 'info');
emitter.emit('log', 'Something might be wrong', 'warning');

console.log('\n--- Emitting "userAction" event ---');
emitter.emit('userAction', 'login', { userId: 101, timestamp: Date.now() });

console.log('\n--- Emitting "shutdown" event ---');
emitter.emit('shutdown');
