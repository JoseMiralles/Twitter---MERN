const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Tweet = require("../../models/Tweet");
const validateTweetInput = require("../../validation/tweets");

// GET >> "/"
router.get("/", (req, res) => {
    // Get the latest tweets from everyone.
    Tweet.find()
        .sort({ date: -1 })
        .then(tweets => res.json(tweets))
        .catch(err => res.status(404).json({ notweetsfound: "No tweets found" }));
});

// GET >> "/user/:user_id"
router.get("/user/:user_id", (req, res) => {
    Tweet.find({user: req.params.user_id})
        .then(tweets => res.json(tweets))
        .catch(err => 
            res.status(404).json({ notweetsfound: "No tweets found from that user" }));
});

// GET >> "/:id"
router.get("/:id", (req, res) => {
    // Get a single specific tweet.
    Tweet.findById(req.params.id)
        .then(tweet => res.json(tweet))
        .catch(err => 
            res.status(404).json({ notweetfound: "No tweet found with that ID" }));
});

// POST >> "/"
router.post("/",
    // Protect this route
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = validateTweetInput(req, body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newTweet = new Tweet({
            text: req.body.text,
            user: req.user.id
        });

        newTweet.save().then(tweet => res.json(tweet));
    }
);

module.exports = router;