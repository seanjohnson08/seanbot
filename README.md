# noyesbot

A Discord bot.

## Configuration

Secrets are passed into the program through environment variables in dev and production. BOT_TOKEN is required and is the secret key provided by the Discord developer panel for your bot application. The MARKETSTACK_TOKEN is a [marketstack.com](https://marketstack.com/) API token and must be provided for the `noyesbot stock` command to work.

Note: if you are a contributor to this Github repo and you are using Github Codespaces, that environment is configured with tokens for both of these. The BOT_TOKEN maps to an account running on a test server. Please reach out to Andrew for an invite.

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
