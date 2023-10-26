const { syncCommand } = require('../util');

/**
 * Adds numbers input by the user.
 * @param {string[]} positionalArgs - Hopefully numbers.
 * @returns {string} The sum of all the input numbers.
 */
const addCommand = syncCommand((args) => {
  if (args.length > 0) {
    const numbers = args.map((numStr) => parseInt(numStr, 10));
    const result = numbers.reduce((total, current) => total + current, 0);
    if (Number.isNaN(result)) {
      return 'NaNaNaNaNaNaNaNa BATMAN!';
    }
    return String(result);
  }
  return 'Gimme some numbers breh.';
});
module.exports = addCommand;
