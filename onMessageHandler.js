module.exports = function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    // If the command is known, let's execute it
    if (commandName === '!dice') {
        const num = rollDice();
        client.say(target, `You rolled a ${num}`);
        console.log(`* Executed ${commandName} command`);
    } else if (commandName === '!promote') {
        client.say(target, `Check out my channel at https://www.twitch.tv/paid4hire`);
        console.log(`* Executed ${commandName} command`);
    } else if (commandName.includes('!hello')) {
        client.say(target, `Hello there!`);
        console.log(`* Executed ${commandName} command`);
    } else {
        console.log(`* Unknown command ${commandName}`);
    }
};

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

module.exports = function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    // If the command is known, let's execute it
    if (commandName === '!dice') {
        const num = rollDice();
        client.say(target, `You rolled a ${num}`);
        console.log(`* Executed ${commandName} command`);
    } else if (commandName === '!promote') {
        client.say(target, `Check out my channel at https://www.twitch.tv/paid4hire`);
        console.log(`* Executed ${commandName} command`);
    } else if (commandName.includes('!hello')) {
        client.say(target, `Hello there!`);
        console.log(`* Executed ${commandName} command`);
    } else {
        console.log(`* Unknown command ${commandName}`);
    }
};
