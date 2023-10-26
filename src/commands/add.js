/**
 * Adds numbers input by the user.
 * @param {string[]} positionalArgs - Hopefully numbers.
 * @returns {string} The sum of all the input numbers.
 */
function addCommand(positionalArgs) {
  if (positionalArgs.length > 0) {
    const numbers = positionalArgs.map((numStr) => parseInt(numStr, 10));
    return String(numbers.reduce((total, current) => total + current, 0));
  }
  return 'Gimme some numbers breh.';
}
module.exports = addCommand;
