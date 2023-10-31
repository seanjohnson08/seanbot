const { DiceRoll } = require('@dice-roller/rpg-dice-roller');

/**
 * Simpler dice roller
 * @param {string[]} multiple dice roll requests
 * @returns {string} List of all roll results
 */
async function roll(diceRolls) {
  return diceRolls
    .map((dr) => {
      try {
        const roll = new DiceRoll(String(dr));
        return roll.output;
      } catch (e) {
        console.error(e);
        return `**${dr}** is an invalid notation`;
      }
    })
    .join('\n');
}
module.exports = roll;
