import express from 'express';

const router = express.Router();

let logging = (req, res, next) => {
    console.log("This is middleware");
    console.log(req.url);
    next();
}
router.use(logging);

router.get('/', (req, res) => {
    res.send('Server is running');
});

router.get("/user", (req, res) => {
    res.send("User Route");
});



export default router;