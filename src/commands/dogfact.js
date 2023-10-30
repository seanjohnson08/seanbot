/**
 * Grabs a random dogfact
 * @returns {string} A random dogfact from dogapi.dog API
 */
async function dogfactCommand() {
  const response = await fetch('https://dogapi.dog/api/v2/facts?limit=1');
  const data = await response.json();

  if (data.data.length > 0) {
    return data.data[0].attributes.body;
  } else {
    return 'Error retrieving dog fact from API.';
  }
}
module.exports = dogfactCommand;
