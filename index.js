require('dotenv').config();
const { isBadWord } = require('./badWords');
const tmi = require('tmi.js');

// Set up options for the tmi.js client
const opts = {
    options: { debug: true },
    identity: {
        USERNAME: process.env.USERNAME,
        // USERNAME: process.env.USERNAME + Math.floor(Math.random()*100000),
        PASSWORD: process.env.OAUTH_TOKEN
    },
    channels: [ 'paid4hire' ]
};

// Create a client with the options
const client = new tmi.Client(opts);

// Register event handlers
client.on('connected', (addr, port) => {
    console.log(`Connected to ${addr}:${port}`);
});

client.on('message', (channel, userstate, message, self) => {
    // Ignore messages from the bot
    if (self) return;

    // Check if message contains any bad words
    if (isBadWord(message)) {
        // take appropriate action
        // block the message or timeout the user 
        if(userstate.username) {
            client.say(channel, `@${userstate.username}, please do not use bad language`)
                .catch(error => console.log(error));
        }
    }

    // Check for the !hello command
    if(message.toLowerCase() === '!hello') {
        client.say(channel, `@${userstate.username}, heya!`).catch(error=> console.log(error));
    }
});

client.on('disconnected', (reason) => {
    console.log('Disconnected due to: '+ reason);
});

// Connect to Twitch
client.connect()
.then(() => {
    console.log("Connected Successfully!");
})
.catch(err => {
    console.error(`Error: ${err}`);
});