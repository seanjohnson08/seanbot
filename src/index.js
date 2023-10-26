const { botToken } = require("../config.json");

if (!botToken) {
  console.error("botToken not defined in ./config.json");
}
