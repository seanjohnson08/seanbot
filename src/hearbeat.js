const http = require('node:http');
const { env } = require('node:process');

/**
 * Gets the port number that should be used for heartbeat checks.
 * @returns {number} Port number to listen for heartbeat checks
 */
function getHeartbeatPort() {
  if (env.PORT) {
    console.log(
      `Using heartbeat port ${env.PORT} from PORT environment variable.`,
    );
    return env.PORT;
  }
  console.log('Defaulting to heartbeat port 8080.');
  return 8080;
}

/**
 * Creates an HTTP server that listens for heartbeat checks.
 * @returns {http.Server} HTTP server listening for heartbeat checks
 */
function createHeartbeatServer() {
  const server = http.createServer((req, res) => {
    console.log('Received heartbeat check, responding OK.');
    res.writeHead(200);
    res.end('OK');
  });

  const port = getHeartbeatPort();
  server.listen(port, () => {
    console.log(`Heartbeat is listening on port ${port}.`);
  });

  return server;
}
exports.createHeartbeatServer = createHeartbeatServer;
