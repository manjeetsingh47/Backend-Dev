import express from "express";
import exercise1 from "./exercise1.js";
import exercise2 from "./exercise2.js";
import exercise5 from "./exercise5.js";

const app = express();

app.use(express.json());


app.use(exercise1);


exercise5(app);


app.get("/", (req, res) => {
    res.send("Middleware assignment running");
});


app.get("/secure", exercise2, (req, res) => {
    res.send("Secure route accessed");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});