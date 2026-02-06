import express from 'express';

const reg = express.Router();

reg.get("/", (req, res) => {
    res.send("Registration Route");
});

reg.get('/login', (req, res) => {
    res.send('User Login');
});

reg.get('/signup', (req, res) => {
    res.send('User Sign up');
})
export default reg;