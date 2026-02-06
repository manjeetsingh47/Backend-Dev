import fs from 'fs';
import path from 'path';

//custom middleware to log request details
//req -> request, res-> response, next-> to pass control to next middleware
let logFun = (req, res, next) => {
    let log = `timestamp: ${new Date().toISOString()}, method: ${req.method}, url: ${req.originalUrl}\n`;
    //append the log to server.log file
    fs.appendFileSync(path.join(__dirname, './server.log'), log);
    console.log(log);
    next();
}

const userValidation = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({
            error: 'password kam se kam 6 characters ka hona chahiye'
        });
    }
    next();
}

const authMiddleware = (req, res, next) => {
    const { token } = req.query; // ?token=admin123

    if (!token || token !== "admin123") {
        return res.status(401).json({
            message: "Unauthorized access"
        });
    }

    next();
};


export { logFun, userValidation, authMiddleware };
//ek function ko export kar rhe to export default use karenge
//multiple functions ko export kar rhe to named export use karenge