import express from "express";
import methodOverride from "method-override"

const app = express();

app.set("view engine", "ejs");
app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: true }))


let userData = [
    { id: 1, name: "amit", age: 23, },
];

// render index page
app.get("/", (req, res) => {
    res.render("index");
});

//render edit page
app.get("/editpage/:id", (req, res) => {
    const id = req.params.id;

    const user = userData.find((ele) => ele.id == id);
    console.log(user)

    res.render("edit", { userData: [user] })
})

// get user
app.get("/user", (req, res) => {
    res.render("user", { userData });
});

// add user
app.post("/api/user", (req, res) => {

    const { name, age } = req.body;

    let newUserData = {
        id: userData.length + 1,
        name,
        age
    }
    userData.push(newUserData);
    res.redirect('/user')

})

//delete user
app.delete("/api/user/:id", (req, res) => {

    const userid = req.params.id;

    const useridx = userData.findIndex((ele) => ele.id == userid);

    if (useridx == -1) {
        return res.send("user not found")
    }

    userData.splice(useridx, 1);

    res.redirect("/user")

})

app.put("/api/user/:id", (req, res) => {
    const { name, age } = req.body;
})

app.listen(3000, () => {
    console.log("server is running");
});


// staic server
//csr
//ssr
// template engine
// ejs, pug, hbs
//seo friendly