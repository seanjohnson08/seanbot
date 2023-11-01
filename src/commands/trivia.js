const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ButtonInteraction,
  MessageReplyOptions,
} = require('discord.js');

const questionStore = new Map();

/** @type Map<string, number> */
const leaderBoard = new Map();

function fisherYatesShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

let uuid = 0;

/** @returns {MessageReplyOptions} */
async function triviaCommand(args) {
  if (args[0] === 'leaderboard') {
    const winners = [...leaderBoard.entries()].sort(
      ([_aName, _aScore], [_bName, _bScore]) => _bScore - _aScore,
    );
    return (
      "Today's top players:\n" +
      winners.map(([name, score]) => `${name}: ${score}`).join('\n')
    );
  }

  const triviaResponse = await fetch(
    'https://opentdb.com/api.php?amount=1&encode=url3986',
  );

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

  // OpenTDB encodes all of the properties. I chose URL instead of HTML encoding because it's easier to decode.
  triviaQuestion.question = decodeURIComponent(triviaQuestion.question);
  triviaQuestion.correct_answer = decodeURIComponent(
    triviaQuestion.correct_answer,
  );
  triviaQuestion.incorrect_answers =
    triviaQuestion.incorrect_answers.map(decodeURIComponent);

  uuid++;
  questionStore.set(`trivia|${uuid}`, triviaQuestion);

  const answerButtons = fisherYatesShuffle([
    triviaQuestion.correct_answer,
    ...triviaQuestion.incorrect_answers,
  ]).map((answer, i) => {
    return new ButtonBuilder()
      .setLabel(answer)
      .setCustomId(
        answer === triviaQuestion.correct_answer
          ? `correct|${uuid}`
          : `incorrect|${uuid}|${i}`,
      )
      .setStyle(ButtonStyle.Primary);
  });

  const row = new ActionRowBuilder().addComponents(...answerButtons);

  /** @type {MessageReplyOptions} */
  const reply = {
    content: triviaQuestion.question,
    components: [row],
  };

  return reply;
}

/** @param {ButtonInteraction} interaction */
async function triviaInteractions(interaction) {
  const parts = interaction.customId.split('|');
  const status = parts[0];
  const messageId = parseInt(parts[1]);
  const questionData = questionStore.get(`trivia|${messageId}`);
  switch (status) {
    case 'correct':
      await interaction.update({
        content: `Correct! The answer to "${questionData.question}" is indeed "${questionData.correct_answer}". This was a ${questionData.difficulty} question."`,
        components: [],
      });
      // Update score
      const username = interaction.user.username;
      leaderBoard.set(username, (leaderBoard.get(username) ?? 0) + 1);
      break;
    default:
      await interaction.update({
        content: `Bzzzt! The answer to "${questionData.question}" is actually "${questionData.correct_answer}". This was a ${questionData.difficulty} question.`,
        components: [],
      });
      break;
  }
  // clean up
  questionStore.delete(`trivia|${messageId}`);
}

module.exports = { triviaCommand, triviaInteractions };
