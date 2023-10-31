const { DiceRoll } = require('@dice-roller/rpg-dice-roller');

/**
 * Simpler dice roller
 * @param {string[]} multiple dice roll requests
 * @returns {string} List of all roll results
 */
async function dnd(diceRolls) {
  return diceRolls
    .map((dr) => {
      try {
        console.log(dr);
        const roll = new DiceRoll(String(dr));
        return roll.output;
      } catch (e) {
        console.log(e);
        return `**${dr}** is an invalid notation`;
      }
    })
    .join('\n');
}
module.exports = dnd;
