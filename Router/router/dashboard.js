import express from 'express';

const dash = express.Router();

let fun = (req, res, next) => {
    console.log("Dashboard Middleware");
    console.log(req.url);
    next();
};
dash.use(fun);

dash.get('/', (req, res) => {
    res.send('Dashboard Home');
});

dash.get('/profile', (req, res) => {
    res.send('User Profile');
});

dash.get('/report', (req, res) => {
    res.send("User Report");
})
export default dash;