const express = require("express")

const userdata = require("./data")

const app = express();



app.get("/", (req, res) => {
    res.send("hello dev")
})



app.get("/user/page", (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;

    const startindex = (page - 1) * limit;
    const endindex = page * limit;

    const pagedata = userdata.slice(startindex, endindex);
    res.json(pagedata);

});



app.listen(3000, () => {
    console.log("server is running")
})