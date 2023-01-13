// require('dotenv').config();
// const tmi = require('tmi.js');

// const opts = {
//     identity: {
//         // username: 'your_bot_username',
//         // password: 'oauth:YOUR_OAUTH_TOKEN'
//         username: 'paid4hire',
//         password: 'oauth:uob9ay4yr2l4ib491wxnq52b37r09f'
//     },
//     channels: [
//         // 'channel_name_to_join'
//         'paid4hire'

//     ]
// };

// const client = new tmi.Client(opts);

// client.on('error', (err) => {
//     console.error(`Error: ${err}`);
// });

// try {
//     client.connect()
//         .then(() => {
//             console.log('connected!');
//         }).catch(err => {
//             console.error(`Error: ${err}`);
//         });
// } catch (err) {
//     console.error(`Error: ${err}`);
// }

// require('dotenv').config();
// const tmi = require('tmi.js');

// const client = new tmi.Client({
// 	options: { debug: true },
// 	identity: {
// 		USERNAME: process.env.USERNAME + Math.floor(Math.random()*100000),
// 		PASSWORD: process.env.OAUTH_TOKEN
// 	},
//     channels: [
//                 // 'channel_name_to_join'
//                 'paid4hire'
        
//             ]
// });

// client.connect();

// client.on('connected', (addr, port) => {
//     console.log(`Connected to ${addr}:${port}`);
// });

// client.on('message', (channel, tags, message, self) => {
//     // Ignore echoed messages.
//     if(self) return;

//     if(message.toLowerCase() === '!hello') {
//         // "@alca, heya!"
//         client.say(channel, `@${tags.username}, heya!`);
//     }
// });

// client.on('disconnected', (reason) => {
//     console.log('Disconnected due to: '+ reason);
// });

// client.connect();

// // Create a client with our options
// const client = new tmi.client(opts);

// // Register our event handlers (defined below)
// client.on('message', onMessageHandler);
// client.on('connected', onConnectedHandler);

// // Connect to Twitch:
// client.connect();

// // Called every time a message comes in
// function onMessageHandler (target, context, msg, self) {
//   if (self) { return; } // Ignore messages from the bot

//   // Remove whitespace from chat message
//   const commandName = msg.trim();

//   // If the command is known, let's execute it
//   if (commandName === '!hello') {
//     client.say(target, `Hello, ${context.username}!`);
//     console.log(`* Executed ${commandName} command`);
//   } else {
//     console.log(`* Unknown command ${commandName}`);
//   }
// }

require('dotenv').config();
// const {isBadWord} = require('./badWords');
// const badWords = require('./badWords');
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

// client.on('message', (channel, tags, message, self) => {
//     // Ignore echoed messages
//     if(self) return;

//     // Check for the !hello command
//     if(message.toLowerCase() === '!hello') {
//         client.say(channel, `@${tags.username}, heya!`);
//     }
// });

client.on('message', (channel, tags, message, self) => {
    // Ignore messages from the bot
    if (self) return;

    // Check if message contains any bad words
    if (isBadWord(message)) {
        // take appropriate action
        // block the message or timeout the user 
        console.log("bad word found")
    }

    // Check for the !hello command
    if(message.toLowerCase() === '!hello') {
        client.say(channel, `@${tags.username}, heya!`).catch(error=> console.log(error));
    }
});

client.on('disconnected', (reason) => {
    console.log('Disconnected due to: '+ reason);
});

// Connect to Twitch
client.connect()
.catch(err => {
    console.error(`Error: ${err}`);
});