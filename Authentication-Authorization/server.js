const express = require("express");
const session = require("express-session");
const passport = require("passport");

const app = express();

app.use(express.json());



app.use(
    session({
        secret: "passport-secret-key",
        resave: false,
        saveUninitialized: false
    })
);



app.use(passport.initialize());
app.use(passport.session());




require("./problem1")(app);
require("./problem2")(app);
require("./problem3")(app);
require("./problem4")(app);
require("./problem5")(app);




app.get("/", (req, res) => {

    res.send("Passport Assignment Server Running 🚀");

});




const PORT = 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});