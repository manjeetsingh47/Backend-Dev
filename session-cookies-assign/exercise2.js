import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());


// Language dictionary
const messages = {

    en: "Hello Manjeet! Welcome back 👋",

    hi: "नमस्ते Manjeet! स्वागत है 👋",

    fr: "Bonjour Manjeet! Bienvenue 👋"

};


// Route to set language preference
app.get("/set-language/:lang", (req, res) => {

    const lang = req.params.lang;

    res.cookie("language", lang, {
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.send(`Language set to ${lang}`);

});


// Route to read language preference
app.get("/", (req, res) => {

    const lang = req.cookies.language || "en";

    res.send(messages[lang] || messages.en);

});


app.listen(5000, () => {

    console.log("Exercise 2 running on port 5000");

});