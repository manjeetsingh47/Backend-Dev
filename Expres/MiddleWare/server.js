import express from 'express';

const app = express();

let mid1 = (req, res, next) => {
    console.log("middlaware 1")
    next()
}

let mid2 = (req, res, next) => {
    console.log("middlaware 2")
    next()
}
app.use(mid1)
app.use(mid2)

app.get("/", (req, res) => {
    console.log("req url-> " + req.url)

    res.send("server is running")
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})