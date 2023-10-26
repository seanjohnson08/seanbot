# noyesbot

A Discord bot.

## config.json

Secrets are passed to the program through a file in the project root named
config.json. It is not commited to the repo. It must be created and the
"botToken" property filled with the bot token for the bot to be able to log in.

# Running the bot

The bot is written in node. Before running for the first time, you need to
install its dependencies using npm.

## First time setup

```
npm install
```

## Running the bot

To run the bot, simply run the index.js file using node:

```
node src/index.js
```

If everything is working successfully, you should see a message that the bot is
listening.
