require("dotenv").config();
const crypto = require('crypto');

// hashage en hexa de l'email
const calculateToken = (userEmail = "") => {
    return crypto.createHash('md5').update(userEmail + process.env.PRIVATE_KEY).digest("hex");
}

// test jetons

calculateToken('firstEmail@gmail.com');
// returns 731f04b6e83c8e911e0520a1994afaae

calculateToken('otherEmail@gmail.com');
// returns add347e092ce4da01f669b41b0b5354b

calculateToken('firstEmail@gmail.com')
// returns 731f04b6e83c8e911e0520a1994afaae (just as the first string)

module.exports = { calculateToken };