const addCommand = require('./add');
const stockCommand = require('./stock');
const xkcdCommand = require('./xkcd');
const asyncCommand = require('./async');
const { syncCommand } = require('../util');

/**
 * Returns a list of the names of available commands.
 * @returns {string} A list of available commands.
 */
const commandsCommand = syncCommand(() => {
  const commandEntries = Array.from(commands.entries());
  const commandsString = commandEntries
    .filter(([, cmd]) => !cmd.isHidden)
    .map(([key]) => key)
    .join(', ');
  return `Available commands: ${commandsString}`;
});

const commands = new Map([
  ['add', addCommand],
  ['commands', commandsCommand],
  ['async', asyncCommand],
  ['stock', stockCommand],
  ['xkcd', xkcdCommand],
]);

/**
 * Is there a handler defined for the provided command name?
 * @param {string} commandName - Name of the command to check for.
 * @returns {boolean} Is there a handler defined for the command?
 */
function isCommandHandlerDefined(commandName) {
  return commands.has(commandName);
}
exports.isCommandHandlerDefined = isCommandHandlerDefined;

/**
 * Dispatches arguments to command handler by name. Handlers are called with an
 * array of positional string arguments entered by the user.
 * @param {string} commandName - Name of the command to invoke.
 * @param {string[]} args - Positional arguments provided by the user.
 * @returns {string} The command output.
 */
function dispatchCommand(commandName, args) {
  const command = commands.get(commandName);
  return command(args);
}
exports.dispatchCommand = dispatchCommand;
