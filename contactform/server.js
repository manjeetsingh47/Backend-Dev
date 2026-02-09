import express from "express";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
    res.send(`Thank you ${name}, we received your message`);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});