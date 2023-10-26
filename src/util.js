const fs = require('node:fs');

/**
 * Is the message a command for the provided bot?
 * @param {string} messageContent - The message sent by a user.
 * @param {string} botName - The name of the bot to check for.
 * @returns {string} Is the message a command for the bot?
 */
function isBotCommand(messageContent, botName = 'noyesbot') {
  return messageContent.startsWith(botName + ' ');
}
exports.isBotCommand = isBotCommand;

/**
 * A structure used for passing command info around.
 * @typedef ParsedCommand
 * @property {string} commandName - The name of the command.
 * @property {string[]} args - Arguments to pass to the command.
 */

/**
 * Parses a message and returns a structure containing the command name and the
 * positional arguments provided for it.
 * @param {string} messageContent - Bot command message sent by user.
 * @returns {ParsedCommand} The parsed command structure.
 */
function parseCommand(messageContent) {
  // Only support 10 args to prevent DoS type shenanigans.
  const [, commandName, ...args] = messageContent.split(/\s+/, 12);
  return {
    commandName,
    args,
  };
}
exports.parseCommand = parseCommand;

/**
 * Loads a configuration file.
 * @param {string} configFilePath - Path to the configuration file.
 * @returns {object} Parsed object from configuration file.
 */
function loadConfig(configFilePath) {
  const configFileContents = fs.readFileSync(configFilePath);
  return JSON.parse(configFileContents);
}
exports.loadConfig = loadConfig;

/**
 * Attempts to find the bot token either from environment variable or in config
 * file in the project root.
 * @returns {string} The bot token.
 */
function getBotToken() {
  if (process.env.BOT_TOKEN) {
    console.log('Using bot token from BOT_TOKEN env variable.');
    return process.env.BOT_TOKEN;
  } else {
    const config = loadConfig(path.join(__dirname, '../config.json'));
    if (config.botToken) {
      console.log('Using bot token from config.json.');
      return config.botToken;
    }
  }
}
exports.getBotToken = getBotToken;

/**
 * Wraps a command that doesn't behave asynchronously in a promise so it can be
 * consumed by the dispatcher.
 * @param {function(string[])} command - The synchronous command function.
 * @returns {function(string[]): Promise<string>} A function that returns a promise with the command's result.
 */
function syncCommand(command) {
  return (...args) => {
    return Promise.resolve(command(...args));
  };
}
exports.syncCommand = syncCommand;

/*
 * Grab the marketstack token from the env or config
 * file in the project root.
 * @returns {string} The marketstack token.
 */
function getMarketstackToken() {
  if (process.env.MARKETSTACK_TOKEN) {
    console.log('Using token from MARKETSTACK_TOKEN env variable.');
    return process.env.MARKETSTACK_TOKEN;
  } else {
    const config = loadConfig(path.join(__dirname, '../config.json'));
    if (config.marketstackToken) {
      console.log('Using bot token from config.json.');
      return config.marketstackToken;
    }
  }
}
exports.getMarketstackToken = getMarketstackToken;
