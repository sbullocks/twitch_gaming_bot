require('dotenv').config();
// console.log(`username: ${process.env.USERNAME}`);
// console.log(`password: ${process.env.OAUTH_TOKEN}`);
const { isBadWord } = require('./badWords');
const tmi = require('tmi.js');
const onMessageHandler = require('./onMessageHandler');
// const onConnectedHandler = require('./onConnectedHandler');
const words = ['!hello', 'hello', 'greetings', 'hi', 'howdy', 'welcome', 'bonjour', 'buenas noches', 'buenos dias', 'good day', 'good morning', 'hey', 'hi-ya', 'how are you', 'how goes it', 'howdy-do', 'shalom', 'yo', 'yoo', 'yooo'];


// Set up options for the tmi.js client
const opts = {
    options: { debug: true },
    identity: {
        username: 'process.env.USERNAME',
        // username: process.env.USERNAME,
        // USERNAME: process.env.USERNAME + Math.floor(Math.random()*100000),
        password: process.env.OAUTH_TOKEN
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
    // console.log(`Value of userstate: ${JSON.stringify(userstate)}`);
    onMessageHandler(client, channel, userstate, userstate.username, self);

    // Check for the !time command
    if(message.toLowerCase() === '!time') {
        const currentTime = new Date().toLocaleTimeString('en-US', {timeZone: 'EST'});
        client.say(channel, `@${userstate.username}, the current time is: ${currentTime} EST`)
            .catch(error => console.log(error));
    }

    // Check if message contains any bad words
    if (isBadWord(message)) {
        // take appropriate action
        // block the message or timeout the user 
        if(userstate.username) {
            client.say(channel, `@${userstate.username}, dont be a bitch, please do not use that language is this chat environment!`)
                .catch(error => console.log(error));
        }
    }

    if(words.includes(message.toLowerCase())) {
        client.say(channel, `@${userstate.username}, whats up!`).catch(error=> console.log(error));
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

// client.on('connected', onConnectedHandler);
client.on('message', onMessageHandler);