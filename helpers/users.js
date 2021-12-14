require("dotenv").config();
/*
// plus besoin avec jwt

const crypto = require('crypto');

// hashage en hexa de l'email
const calculateToken = (userEmail = "") => {
    return crypto.createHash('md5').update(userEmail + process.env.PRIVATE_KEY).digest("hex");
} */

const jwt = require('jsonwebtoken');

const PRIVATE_KEY = "superSecretStringNowoneShouldKnowOrTheCanGenerateTokens"

const calculateToken = (userEmail = "", users_id) => {
    return jwt.sign({email: userEmail, user_id : users_id }, PRIVATE_KEY);
}

const decode = (token) => {
    return jwt.decode(token);
}
// test jetons

calculateToken('firstEmail@gmail.com');
// returns 731f04b6e83c8e911e0520a1994afaae

calculateToken('otherEmail@gmail.com');
// returns add347e092ce4da01f669b41b0b5354b

calculateToken('firstEmail@gmail.com')
// returns 731f04b6e83c8e911e0520a1994afaae (just as the first string)

module.exports = { calculateToken, decode };