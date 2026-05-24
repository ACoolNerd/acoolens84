const express = require('express');
const path = require('path');
const app = express();

const DEFAULT_PORT = process.env.PORT || 3030;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Direct root route to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve events JSON database directly
app.get('/la28_events.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'la28_events.json'));
});

// Fallback listener to find an open port if DEFAULT_PORT is occupied
function startServer(port) {
    const server = app.listen(port, () => {
        console.log("================================================================================");
        console.log(`  DISCOVER LA & ACCESSFriendly GLOBAL PORTAL ACTIVE 🌐`);
        console.log(`  URL: http://localhost:${port}`);
        console.log(`  MTA Paratransit Routing Engine & LA84 HUD Stream Online 🟢`);
        console.log("================================================================================");
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is currently occupied. Trying fallback port ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error("Server startup failed:", err);
        }
    });
}

startServer(DEFAULT_PORT);
