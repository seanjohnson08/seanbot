/**
 * Grab XKCD comic + alt text
 * @param {string[]} XKCD ID - uses only the first one, ignores the rest
 * @returns {string} XKCD comic image embed + title + alt text
 */
async function xkcdCommand([comicId]) {
  const maxId = 2846; // hard-coding this for now, we can probably just keep increasing this if needed, no sense adding more complicated logic to get the true max

  if (!comicId) {
    comicId = 'random';
  }

  if (comicId == 'random') {
    comicId = Math.floor(Math.random() * maxId);
    urlStr = `https://xkcd.com/${comicId}/info.0.json`;
  } else if (comicId == 'latest') {
    urlStr = `https://xkcd.com/info.0.json`;
  } else {
    urlStr = `https://xkcd.com/${comicId}/info.0.json`;
  }

  const response = await fetch(urlStr);

  return response.json().then((data) => {
    if (data.length < 1) {
      return `XKCD comic #${comicId} does not exist.`;
    }

    return `**XKCD #${data.num}: ${data.title}**\n*${data.alt}*\n${data.img}`;
  });
}
module.exports = xkcdCommand;
