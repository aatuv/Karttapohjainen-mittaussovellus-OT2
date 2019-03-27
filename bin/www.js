const app = require('../app');
const http = require('http');

const port = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});

// server.on('error', onError);
// server.on('listening', onListening);