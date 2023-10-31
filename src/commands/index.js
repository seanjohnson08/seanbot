const addCommand = require('./add');
const stockCommand = require('./stock');
const xkcdCommand = require('./xkcd');
const catfactCommand = require('./catfact');
const dogfactCommand = require('./dogfact');
const asyncCommand = require('./async');
const { triviaCommand, triviaInteractions } = require('./trivia');
const dndCommand = require('./dnd');
const { syncCommand } = require('../util');
const { Message } = require('discord.js');

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
  ['catfact', catfactCommand],
  ['dogfact', dogfactCommand],
  ['trivia', triviaCommand],
  ['dnd', dndCommand],
]);

const interactiveCommands = new Map([['trivia', triviaInteractions]]);

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
 * @param {Message<boolean>} message
 * @param {string} commandName - Name of the command to invoke.
 * @param {string[]} args - Positional arguments provided by the user.
 */
async function dispatchCommand(message, commandName, args) {
  const command = commands.get(commandName);
  const response = await message.reply(await command(args));
  if (interactiveCommands.has(commandName)) {
    const interaction = await response.awaitMessageComponent({
      time: 60_000,
    });

    try {
      await interactiveCommands.get(commandName)(interaction);
    } catch (e) {
      console.log('Error', e);
      await interaction.editReply(
        'Took longer than a minute to reply, cancelling.',
      );
    }
  }
}
exports.dispatchCommand = dispatchCommand;
