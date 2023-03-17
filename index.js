require('dotenv').config();
// console.log(`username: ${process.env.USERNAME}`);
// console.log(`password: ${process.env.OAUTH_TOKEN}`);
const { isBadWord } = require('./badWords');
const tmi = require('tmi.js');
const onMessageHandler = require('./onMessageHandler');
// const onConnectedHandler = require('./onConnectedHandler');
const words = ['!hello', 'hello', 'greetings', 'hi', 'howdy', 'welcome', 'bonjour', 'buenas noches', 'buenos dias', 'good day', 'good morning', 'hey', 'hi-ya', 'how are you', 'how goes it', 'howdy-do', 'shalom', 'yo', 'yoo', 'yooo'];
const loadoutOptions = ['Loadout 1', 'Loadout 2', 'Loadout 3', 'Loadout 4'];
const loadoutWeapons = {
    'Loadout 1': ['dual hawk', 'locus'],
    'Loadout 2': ['stingray', 'vpm'],
    'Loadout 3': ['no guns'],
    'Loadout 4': ['no blackjack'],  
  };

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

let pollResults = {};
loadoutOptions.forEach(option => {
    pollResults[option] = 0;
});

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
            client.say(channel, `@${userstate.username}, dont be that person, please do not use that language in this chat environment!`)
                .catch(error => console.log(error));
        }
    }

    if(words.includes(message.toLowerCase())) {
        client.say(channel, `@${userstate.username}, whats up!`).catch(error=> console.log(error));
    }

//     let pollResults = {};
// loadoutOptions.forEach(option => {
//     pollResults[option] = 0;
// });

      // Check for the !vote command
      if(message.toLowerCase().startsWith('!vote')) {
        // Extract the loadout option from the message
        const vote = message.split(' ')[1];
        if(loadoutOptions.includes(vote)) {
            // Increment the vote count for the chosen option
            pollResults[vote]++;
            client.say(channel, `@${userstate.username} has voted for ${vote}.`)
                .catch(error => console.log(error));
        } else {
            client.say(channel, `@${userstate.username}, please vote for one of the following options: ${loadoutOptions.join(', ')}`)
                .catch(error => console.log(error));
        }
    }
    // Check for the !results command
    if(message.toLowerCase() === '!results') {
        // Display the current poll results
        let resultsString = "";
        for(let option in pollResults) {
            resultsString += `${option}: ${pollResults[option]} votes \n`;
        }
        client.say(channel, `Current poll results: \n ${resultsString}`)
                .catch(error => console.log(error));
    }
    // Check for the !chooseloadout command
    if(message.toLowerCase() === '!chooseloadout') {
        // Find the loadout option with the most votes
        let chosenOption = "";
        let maxVotes = 0;
        for(let option in pollResults) {
            if(pollResults[option] > maxVotes) {
                maxVotes = pollResults[option];
                chosenOption = option;
            }
        }
        // Display the chosen loadout option
        client.say(channel, `The chosen loadout is ${chosenOption} with ${maxVotes} votes!`)
            .catch(error => console.log(error));
        // reset the pollResults object to its initial state
        pollResults = { ...initialPollResults };
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