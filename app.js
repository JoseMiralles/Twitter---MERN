const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// IMPORT ROUTES:
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

const app = express();
const db = require("./config/keys").mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.log(err));

// MIDDLEWARE:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTES:
app.get("/", (req, res) => {
    debugger
    res.send("Hello World, by Jose Miralles!")
});
app.use("/api/users", users);
app.use("/api/tweets", tweets);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on ${port}`));