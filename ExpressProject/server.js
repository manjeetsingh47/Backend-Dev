const express = require("express")

const app = express();



app.get("/", (req, res) => {
    res.send("hello dev")
})

app.get("/user", (req, res) => {
    res.send("user route")
})

app.get("/about", (req, res) => {
    res.send("about")
})

app.get("/userdetail", (req, res) => {
    let user = {
        status: "success",
        message: "hello from express",
        timestamp: new Date().toISOString()
    }
    res.status(200).json(user);
});

app.get("/userdetail1", (req, res) => {
    let ans = {
        time: "morning ",
        month: "january",
        year: "2026"
    }
    res.json(ans);
})


app.listen(3000, () => {
    console.log("server is running")
})