# Twitch Chat Bot ![License Badge](https://img.shields.io/badge/license-MIT-green) ![Node.js Badge](https://img.shields.io/badge/technology-Node.js-green) ![JavaScript Badge](https://img.shields.io/badge/technology-JavaScript-green)


## Description

This is a chat bot for Twitch that can perform various functions such as moderating chat, providing information, and interacting with viewers.

## Table of Contents:

- [Repo](#repo)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Screenshot](#screenshot)
- [Usage](#usage)
- [GitHub](#github)

## Repo

[Twitch Gaming Bot](https://github.com/sbullocks/twitch_gaming_bot)

## Features

- Moderation: The bot can be configured to automatically moderate chat by filtering out inappropriate language and blocking users who violate the chat rules.
- Commands: The bot can respond to custom commands that can be triggered by viewers using the ! symbol. Examples of commands include displaying the current song playing, starting in-game challenges, providing information about the streamer, and more.
- Interactivity: The bot can interact with viewers by responding to their messages and providing useful information, such as upcoming events, social media links, current time/weather and more.

## Installation

To use the bot, you will need to have Node.js installed on your machine. Once you have installed Node.js, you can clone this repository to your local machine and install the required dependencies by running the following commands in your terminal:

    git clone https://github.com/sbullocks/twitch_gaming_bot
    cd twitch_gaming_bot
    npm install

## Configuration

Before using the bot, you will need to configure it with your Twitch credentials and other settings. You can do this by creating a .env file in the root directory of the project with the following format:


    TWITCH_USERNAME='ystwitchbot'
    TWITCH_PASSWORD='your-twitch-oauth-token'
    TWITCH_CHANNEL='your-twitch-channel-username'

TWITCH_USERNAME: ystwitchbot is the username created for the bot.

TWITCH_PASSWORD: Your Twitch OAuth token. You can generate one here.

TWITCH_CHANNEL: Your Twitch Channel username.

## Screenshot

  ![Terminal successfully connecting to the server.](./Screenshot%202023-03-16%20214832.png)
  ![Twitch chat showing bot interacting with live chatters.](./Screenshot%202023-03-16%20225106.png)
  ![Capture of terminal chat history.](./Screenshot%202023-03-16%20225158.png)

## Usage

To start the bot, run the following command in your terminal:
  
    node index.js

The bot will connect to your Twitch chat and start listening for commands and messages.

## Contributing

If you would like to contribute to the project, you can create a pull request with your changes. Please ensure that your code follows the existing coding style and that it has been thoroughly tested.

## GitHub

Click to access my page: [sbullocks](https://github.com/sbullocks).
