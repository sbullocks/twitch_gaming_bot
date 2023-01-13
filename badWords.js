const badWords = ['ass', 'shit', 'fuck'];

// module.exports = function isBadWord(message) {
//     // convert message to lowercase for case-insensitive check
//     message = message.toLowerCase();

//     // check if message contains any of the bad words
//     for (let i = 0; i < badWords.length; i++) {
//         if (message.includes(badWords[i])) {
//             return true;
//         }
//     }

//     return false;
// }

module.exports = {
    isBadWord: function (message) {
      // convert message to lowercase for case-insensitive check
    message = message.toLowerCase();

    // check if message contains any of the bad words
    for (let i = 0; i < badWords.length; i++) {
        if (message.includes(badWords[i])) {
            return true;
        }
    }
}};  
