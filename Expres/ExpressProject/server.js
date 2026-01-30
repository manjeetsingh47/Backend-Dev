const express = require("express")

const userdata = require("./data")

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
    res.json(userdata);
})

let a = [1, 2, 3, 4, 5];

app.get("/userdetail1", (req, res) => {
    let ans = {
        time: "morning ",
        month: "january",
        year: "2026"
    }
    res.json(ans);
})

app.get("/userAge", (req, res) => {
    let userGreaterThan25 = userdata.filter((ele) => ele.age > 25)
    console.log(userGreaterThan25)
    res.json(userGreaterThan25);
})


app.get("/Mr&Mrs", (req, res) => {

    let finaldata = userdata.map((ele) => {
        let finalName = "";

        if (ele.gender === "male") {
            finalName = "Mr. " + ele.name;
        } else if (ele.gender === "female") {
            finalName = "Mrs. " + ele.name;
        }
        return { finalName }
    });

    res.json(finaldata);
});


app.get("/user/:id", (req, res) => {
    const id = parseInt(req.params.id)

    let user = userdata.find((ele) => ele.id === id)

    res.json(user);
})

app.get("/user/page", (req, res) => {
    let name = req.query.name;
    let size = req.query.size;

    res.json({
        name: name,
        size: size
    });

})



app.listen(3000, () => {
    console.log("server is running")
})