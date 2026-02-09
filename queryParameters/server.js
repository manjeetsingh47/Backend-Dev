import express from "express";
const app = express();

const users = [
    { id: 1, name: "qwerty" },
    { id: 2, name: "asdfghjk" },
    { id: 3, name: "qwe" }
];

app.get("/users", (req, res) => {
    const { name } = req.query;

    const result = name ? users.filter(u => u.name.toLowerCase().includes(name.toLowerCase())) : users;

    res.json(result);
});

app.listen(3000, () => {
    console.log("server is running")
});