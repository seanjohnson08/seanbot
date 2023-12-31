/**
 * Grabs a random catfact
 * @returns {string} A random catfact from catfact.ninja API
 */
async function catfactCommand() {
  const response = await fetch('https://catfact.ninja/fact');
  const data = await response.json();

  if (data.fact !== undefined) {
    return data.fact;
  } else {
    return 'Error retrieving catfact from API.';
  }
}
module.exports = catfactCommand;
