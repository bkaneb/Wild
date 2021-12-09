const User = require("./models/usersModel");

/* User.hashPassword("myPlainPassword").then((hashedPassword) => {
  console.log(hashedPassword);
}); */

User.verifyPassword(
  "myWrongPlainPassword",
  "$argon2id$v=19$m=65536,t=5,p=1$yQJjFhHgrlncpv3Q/DIRhw$MyIxYxtWTuJRt9kqvcc99qd7j8CCHXbYhSBEo9O/psw"
).then((passwordIsCorrect) => {
  console.log(passwordIsCorrect);
});
