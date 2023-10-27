/**
 * Grab XKCD comic + alt text
 * @param {string[]} XKCD ID - uses only the first one, ignores the rest
 * @returns {string} XKCD comic image embed + title + alt text
 */
async function xkcdCommand(id) {
  if (id.length < 1) {
    return 'Specify XKCD ID';
  }

  id = id[0];
  const urlStr = `https://xkcd.com/${id}/info.0.json`;
  const response = await fetch(urlStr);

  return response.json().then((data) => {
    if (data.length < 1) {
      return 'XKCD comic does not exist.';
    }

    return `**${data.title}**\n*${data.alt}*\n${data.img}`;
  });
}
module.exports = xkcdCommand;
