const authRouter = require("express").Router();
const UsersModel = require('../models/usersModel');

authRouter.post('/api/auth/checkCredentials', async (req,res, next) => {
    const { email, hashedPassword } = req.body;
    try{
        await UsersModel.verifmail({filters: { email }}).then( async (user) => {
            if (!user) return Promise.reject("email_is_not_found");
            else{
                await UsersModel.verifyPassword(
                    hashedPassword,
                    user.hashedPassword,
                  ).then((passwordIsCorrect) => {
                      console.log(passwordIsCorrect)
                        if(passwordIsCorrect) res.send('Your credentials are valid !');
                        else return Promise.reject("password_is_not_found");
                  });
            }
        })
    } catch(err) {
        if(err === "email_is_not_found") return res.status(401).send('Invalid email');
        else if(err === "password_is_not_found") return res.status(401).send('Invalid password');
        else res.status(500).send("Error authetification a user");
    }
})

module.exports = authRouter;