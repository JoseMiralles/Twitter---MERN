const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

router.post("/register", (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user){
                // Throw error, this email is already taken.
                return res.status(400).json({email: "The Email address is already in use!"});
            } else {
                // Email not in use, create the user.
                const newUser = new User({
                    handle: req.body.handle,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash; // Replace the password with the hashed password.
                        newUser.save()
                            .then(user => res.json(user)) // Return the user if the creation was successful.
                            .catch(err => console.log(err)) // Log the errors to the console if failed.
                    });
                });
            }
        })
});

module.exports = router;