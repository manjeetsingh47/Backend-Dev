import express from "express";
import session from "express-session";

const app = express();

app.use(express.json());


// Session setup
app.use(
    session({
        secret: "admin-secret-key",
        resave: false,
        saveUninitialized: true,
    })
);


// Fake users database (for testing)
const users = [

    { username: "admin", password: "123", role: "admin" },

    { username: "manjeet", password: "123", role: "user" }

];


// LOGIN ROUTE
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    const user = users.find(
        (u) =>
            u.username === username &&
            u.password === password
    );

    if (!user) {

        return res.status(401).send("Invalid credentials");

    }

    // Save session
    req.session.user = user;

    res.send("Login successful");

});


// ROLE-BASED ACCESS CONTROL MIDDLEWARE
const isAdmin = (req, res, next) => {

    if (
        req.session.user &&
        req.session.user.role === "admin"
    ) {

        return next();

    }

    res.status(403).send("Access denied: Admins only");

};


// ADMIN PANEL ROUTE
app.get("/admin", isAdmin, (req, res) => {

    res.send("Welcome to Admin Panel");

});


// NORMAL USER ROUTE
app.get("/dashboard", (req, res) => {

    if (!req.session.user) {

        return res.status(401).send("Login required");

    }

    res.send(
        `Welcome ${req.session.user.username}`
    );

});


app.listen(5000, () =>
    console.log("Exercise 3 running on port 5000")
);