import express from "express";

const port = 3000;
const app = express();

// static files
app.use("/static", express.static("public"));

// ejs setup
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {

    const images = [
        "/static/img1.jpg",
        "/static/img2.jpg"
    ];

    res.render("gallery", { images });
});

app.listen(port, () => {
    console.log("The server is running " + port);
});