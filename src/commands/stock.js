const { stringify } = require('node:querystring');
const { getMarketstackToken } = require('../util');

/**
 * Grabs stock numbers
 * @param {string[]} positionalArgs - up to 10 stock symbols
 * @returns {string} The current latest price for each stock
 */
async function stockCommand(positionalArgs) {
  if (positionalArgs.length > 0) {
    const marketstackToken = getMarketstackToken();
    const symbols = positionalArgs.map((symbolStr) => String(symbolStr));
    const queryStr = stringify({
      access_key: marketstackToken,
      symbols: symbols.join(','),
    });

    const response = await fetch(
      'http://api.marketstack.com/v1/intraday/latest?'.concat(queryStr),
    );

    return response.json().then((data) => {
      console.log(data);
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
      }
    });
  }

  return 'Specify at least one stock symbol.';
}

module.exports = stockCommand;
