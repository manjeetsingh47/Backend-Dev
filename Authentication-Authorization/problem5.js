const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());



const ACCESS_SECRET = "access-secret";
const REFRESH_SECRET = "refresh-secret";



const users = [
    { id: 1, username: "manjeet" }
];

const refreshTokens = new Set();




function generateAccessToken(user) {

    return jwt.sign(
        user,
        ACCESS_SECRET,
        { expiresIn: "15m" }
    );

}



function generateRefreshToken(user) {

    const refreshToken = jwt.sign(
        user,
        REFRESH_SECRET,
        { expiresIn: "7d" }
    );

    refreshTokens.add(refreshToken);

    return refreshToken;

}



app.post("/login", (req, res) => {

    const { username } = req.body;

    const user = users.find(
        u => u.username === username
    );

    if (!user) {

        return res.status(404).json({
            message: "User not found"
        });

    }

    const accessToken =
        generateAccessToken(user);

    const refreshToken =
        generateRefreshToken(user);

    res.json({
        accessToken,
        refreshToken
    });

});




app.post("/token/refresh", (req, res) => {

    const { token } = req.body;

    if (!token) {

        return res.status(401).json({
            message: "Refresh token required"
        });

    }

    if (!refreshTokens.has(token)) {

        return res.status(403).json({
            message: "Invalid refresh token"
        });

    }

    jwt.verify(
        token,
        REFRESH_SECRET,
        (err, user) => {

            if (err) {

                return res.status(403).json({
                    message: "Token expired"
                });

            }

            const accessToken =
                generateAccessToken({
                    id: user.id,
                    username: user.username
                });

            res.json({ accessToken });

        }
    );

});



app.post("/logout", (req, res) => {

    const { token } = req.body;

    refreshTokens.delete(token);

    res.json({
        message: "Logged out successfully"
    });

});




function authenticateToken(req, res, next) {

    const authHeader =
        req.headers["authorization"];

    const token =
        authHeader && authHeader.split(" ")[1];

    if (!token) {

        return res.status(401).json({
            message: "Access token required"
        });

    }

    jwt.verify(
        token,
        ACCESS_SECRET,
        (err, user) => {

            if (err) {

                return res.status(403).json({
                    message: "Invalid token"
                });

            }

            req.user = user;

            next();

        }
    );

}




app.get(
    "/protected",
    authenticateToken,
    (req, res) => {

        res.json({
            message:
                "Access granted to protected route",
            user: req.user
        });

    }
);


app.listen(3000, () =>
    console.log("Problem 4 server running on port 3000")
);