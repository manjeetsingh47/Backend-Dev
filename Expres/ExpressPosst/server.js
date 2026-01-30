import express from "express";

const app = express();

app.use(express.json());

let logfun = (req, res, next) => {
    let log = `timestamp: ${new Date.toString()} url ${req.url}
    method ${req.method}`

    console.log(log);
    next()
}


app.use(logfun)
let data = [{
        id: 1,
        username: "qwert",
        password: "qwer123",
    },
    {
        id: 2,
        username: "ramesh",
        password: "1234",
    },
];



app.get("/", (req, res) => {
    res.status(200).json({
        message: "home route",
    });
});

app.get("/user", (req, res) => {
    res.status(200).json({
        message: "all user",
        data,
    });
});



app.post("/user", (req, res) => {
    console.log(req.body);

    const { username, password } = req.body;
    //validation
    if (!username || !password) {
        return res.status(400).json({
            message: "username and password require",
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "password strength is weak",
        });
    }

    let newuser = {
        id: user.length + 1,
        ...req.body,
    };

    data.push(newuser);

    res.status(200).json({
        message: "user created",
    });
});



app.put("/user/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let { username } = req.body;
    // find user by id
    let userIdx = data.findIndex((ele) => ele.id == id);

    if (userIdx == -1) {
        res.status(400).json({
            message: "user not found",
        });
    }
    // create new updated user
    let updatedUser = {...data[userIdx], username: username };

    // updated the data array
    data[userIdx] = updatedUser;

    res.status(200).json({
        message: "user updated",
    });
});



app.delete("/user/:id", (req, res) => {

    const id = parseInt(req.params.id)
    const userIdx = data.findIndex((ele) => ele.id === id);
    const userdeleted = data[userIdx];
    if (userIdx == -1) {
        return res.status(400).json({
            message: "user not found"
        })
    }
    data.splice(userIdx, 1);
    res.status(200).json({
        message: "user deleted",
        user: userdeleted
    })
})



app.listen(3000, () => {
    console.log("server is running on port 3000");
});