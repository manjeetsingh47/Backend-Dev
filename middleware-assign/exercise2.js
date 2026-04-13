import jwt from "jsonwebtoken";

const exercise2 = (req, res, next) => {

    const authHeader = req.headers.authorization;
    const otp = req.headers.otp;

    if (!authHeader) {

        return res.status(401).json({
            message: "Token missing"
        });

    }

    if (!otp) {

        return res.status(401).json({
            message: "OTP missing"
        });

    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Example temporary OTP check
        if (otp !== "123456") {

            return res.status(403).json({
                message: "Invalid OTP"
            });

        }

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid token"
        });

    }

};

export default exercise2;