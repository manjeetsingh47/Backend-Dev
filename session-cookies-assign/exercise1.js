import express from "express";
import session from "express-session";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: true,
    })
);


// STEP 1: Name
app.post("/step1", (req, res) => {

    req.session.name = req.body.name;

    res.send("Name saved. Go to Step 2");

});


// STEP 2: Email
app.post("/step2", (req, res) => {

    req.session.email = req.body.email;

    res.send("Email saved. Go to Step 3");

});


// STEP 3: Password
app.post("/step3", (req, res) => {

    req.session.password = req.body.password;

    res.send("Password saved. Submit registration");

});


// FINAL STEP
app.get("/submit", (req, res) => {

    res.json({
        name: req.session.name,
        email: req.session.email,
        password: req.session.password,
    });

});


app.listen(5000, () =>
    console.log("Exercise 1 running on port 5000")
);