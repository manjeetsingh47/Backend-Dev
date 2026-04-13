import express from "express";
import session from "express-session";

const app = express();

app.use(express.json());


// Session configuration
app.use(
    session({
        secret: "timeout-secret",
        resave: false,
        saveUninitialized: true,

        cookie: {
            maxAge: 30000 // session expires after 30 seconds
        }
    })
);


// LOGIN ROUTE
app.get("/login", (req, res) => {

    req.session.user = "Manjeet";

    res.send("User logged in. Session started.");

});


// SESSION STATUS CHECK ROUTE
app.get("/session-status", (req, res) => {

    if (!req.session.user) {

        return res.send("Session expired. Please login again.");

    }

    const remainingTime =
        req.session.cookie.maxAge / 1000;

    if (remainingTime <= 10) {

        return res.send(
            `⚠️ Warning: Session expiring in ${remainingTime} seconds`
        );

    }

    res.send(
        `Session active. Time left: ${remainingTime} seconds`
    );

});


// KEEP SESSION ALIVE ROUTE
app.get("/keep-alive", (req, res) => {

    if (!req.session.user) {

        return res.send("Session expired");

    }

    req.session.touch(); // refresh session timer

    res.send("Session extended");

});


// LOGOUT ROUTE
app.get("/logout", (req, res) => {

    req.session.destroy(() => {

        res.send("Session destroyed. Logged out.");

    });

});


app.listen(5000, () => {

    console.log("Exercise 4 running on port 5000");

});