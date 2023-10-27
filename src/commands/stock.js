const { stringify } = require('node:querystring');
const { getMarketstackToken } = require('../util');

/**
 * Grabs stock numbers
 * @param {string[]} positionalArgs - up to 10 stock symbols
 * @returns {string} The current latest price for each stock
 */
async function stockCommand(symbols) {
  const marketstackToken = getMarketstackToken();

  if (!marketstackToken) {
    console.error('marketstack API token not provided.');
    return 'Sorry, having issues fetching stock prices right now.';
  }

  if (symbols.length > 0) {
    const marketstackToken = getMarketstackToken();
    const queryStr = stringify({
      access_key: marketstackToken,
      symbols: symbols.join(','),
    });

    const response = await fetch(
      'http://api.marketstack.com/v1/intraday/latest?'.concat(queryStr),
    );

    return response.json().then((data) => {
      if (data.data.length > 0) {
        return data.data
          .map((d) => {
            if (d.symbol !== undefined) {
              return `**${d.symbol}**: ${d.last}`;
            } else {
              return '';
            }
          })
          .join('\n');
      } else {
        return 'Specify at least one stock symbol.';
      }
    });
  } else {
    return 'Specify at least one stock symbol.';
  }
}

module.exports = stockCommand;
