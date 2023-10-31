const {
  ActionRowBuilder,
  ButtonBuilder,
  ActionRow,
  ButtonInteraction,
} = require('discord.js');

function fischerYatesShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

/** @returns {import('discord.js').MessageReplyOptions} */
async function triviaCommand() {
  const triviaResponse = await fetch('https://opentdb.com/api.php?amount=1');

  /** @type {{
        response_code: number
        category: string
        difficulty: string
        question: string
        correct_answer: string
        incorrect_answers: string[]
    }} */
  const triviaQuestion = await triviaResponse.json();

  const answerButtons = fischerYatesShuffle([
    triviaQuestion.correct_answer,
    ...triviaQuestion.incorrect_answers,
  ]).map((answer) => {
    return new ButtonBuilder()
      .setLabel(answer)
      .setCustomId(
        answer === triviaQuestion.correct_answer ? 'correct' : 'incorrect',
      );
  });

  const row = new ActionRowBuilder().addComponents(...answerButtons);

  /** @type {import('discord.js').MessageReplyOptions} */
  const reply = {
    content: triviaQuestion.question,
    components: [row],
  };

  return reply;
}

/** @param {ButtonInteraction} interaction */
async function triviaInteractions(interaction) {
  switch (interaction.customId) {
    case 'correct':
      await interaction.update('Correct!');
    case 'incorrect':
    default:
      await interaction.update('Wrong answer!');
  }
}

module.exports = { triviaCommand, triviaInteractions };
