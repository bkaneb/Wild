const authRouter = require("express").Router();
const { calculateToken } = require("../helpers/users");
const UsersModel = require('../models/usersModel');

authRouter.post('/api/auth/checkCredentials', async (req,res, next) => {
    const { email, password } = req.body;
    try{
        // verification email si ok on continue
        await UsersModel.verifmail({filters: { email }}).then( async (user) => {
            if (!user) return Promise.reject("email_is_not_found");
            else{
                // verification mot de passe
                await UsersModel.verifyPassword(
                    password, // mot de passe recu
                    user.hashedPassword, // mot de passe du user qui correspond à l'email
                  ).then((passwordIsCorrect) => {
                      // si true on envoie la clé privé (email -> hexa) dans un cookie
                        if(passwordIsCorrect){
                            const token = calculateToken(email, user.id);//(email -> hexa)
                            UsersModel.update(user.id, { token: token });// update de la clé privée dans la bd
                            res.cookie('user_token', token);// création cookie
                            res.send();
                        }
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