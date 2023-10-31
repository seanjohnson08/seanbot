const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ButtonInteraction,
} = require('discord.js');

function fisherYatesShuffle(array) {
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
        results: [{
          category: string
          difficulty: string
          question: string
          correct_answer: string
          incorrect_answers: string[]
        }]
    }} */
  const triviaAPIResponse = await triviaResponse.json();
  const triviaQuestion = triviaAPIResponse.results[0];

  const answerButtons = fisherYatesShuffle([
    triviaQuestion.correct_answer,
    ...triviaQuestion.incorrect_answers,
  ]).map((answer, i) => {
    return new ButtonBuilder()
      .setLabel(answer)
      .setCustomId(
        answer === triviaQuestion.correct_answer ? 'correct' : `incorrect-${i}`,
      )
      .setStyle(ButtonStyle.Primary);
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
    default:
      await interaction.update('Wrong answer!');
  }
}

module.exports = { triviaCommand, triviaInteractions };
