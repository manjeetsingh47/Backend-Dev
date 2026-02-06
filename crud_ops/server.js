import express from 'express';
const app = express();
import { logFun, userValidation, authMiddleware } from './middleware.js';
import { config } from 'dotenv';
config(); //to load .env file
app.use(express.json()); //middleware to parse json body

let port = process.env.PORT || 3000;

//global middleware
app.use(logFun); //mounting the middleware , isse har request pe ye middleware chalega and sare requests ko log karega
let data = [{
        id: 1,
        username: "yash",
        password: "yash123"
    },
    {
        id: 2,
        username: "john",
        password: "john123"
    }
]

app.get('/', (req, res) => {
    res.status(200).json({
        message: "home route"
    });
});

app.get('/user', (req, res) => {
    res.status(200).json({
        message: "all users",
        user: data
    });
});

app.post('/user', userValidation, (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    //validation
    if (!username || !password) {
        return res.status(400).json({
            message: "username and password are required"
        });
    }
    if (password.length < 6) {
        return res.status(400).json({
            message: "password must be at least 6 characters long"
        });
    }
    // let newUser={
    //     id:user.length+1,
    //     username,
    //     password
    // };
    //using rest spread operator
    let newUser = {
        id: data.length + 1,
        ...req.body
    }
    data.push(newUser);
    res.status(201).json({
        message: "user created",
        user: newUser
    });
})

app.get('/profile', authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Welcome to admin profile"
    });
});


app.put('/user/:id', userValidation, (req, res) => {
    let id = parseInt(req.params.id);
    let { username } = req.body;
    let userIdx = data.findIndex((ele) => ele.id === id);
    if (userIdx === -1) {
        return res.status(404).json({
            message: "user not found"
        });
    }
    let updatedUser = {...data[userIdx], ...req.body };
    data[userIdx] = updatedUser;
    res.status(200).json({
        message: "user updated",
        user: updatedUser
    });
});

app.delete('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIdx = data.findIndex((ele) => ele.id === id);
    if (userIdx === -1) {
        return res.status(404).json({
            message: "user not found",
        });
    }
    const userDeleted = data[userIdx];
    //deleting using splice
    data.splice(userIdx, 1);
    //deleting using filter
    //data=data.filter((ele)=>ele.id!==id);
    res.status(200).json({
        message: "user deleted",
        user: userDeleted
    });
});
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});