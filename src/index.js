const { createHeartbeatServer } = require('./hearbeat');
const { createDiscordBot } = require('./discord-bot');

createHeartbeatServer();
createDiscordBot();
