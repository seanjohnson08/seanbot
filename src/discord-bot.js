const { Client, Events, GatewayIntentBits } = require('discord.js');
const {
  isCommandHandlerDefined,
  dispatchCommand,
} = require('./commands/index');
const { isBotCommand, parseCommand, getBotToken } = require('./util');

const botToken = getBotToken();
if (!botToken) {
  console.error('Unable to find bot token in env or config.');
  process.exit(1);
}

/**
 * Creates the Discord client instance and sets up event handlers.
 * @returns {Client} Discord client
 */
function createDiscordBot() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.once(Events.ClientReady, (c) => {
    console.log(`Logged in and listening as ${c.user.tag}`);
  });

  client.on(Events.MessageCreate, async (message) => {
    if (isBotCommand(message.content)) {
      const { commandName, args } = parseCommand(message.content);
      if (isCommandHandlerDefined(commandName)) {
        console.log(
          `Handling command "${commandName}" from ${message.author.username}`,
        );
        await dispatchCommand(message, commandName, args);
      } else {
        console.log(
          `Received command "${commandName}" with no handler from user ${message.author.username}`,
        );
        message.reply('wtf');
      }
    }
  });

  client.login(botToken);

  return client;
}
exports.createDiscordBot = createDiscordBot;
