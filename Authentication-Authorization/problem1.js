const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

const users = [];




function validatePassword(password) {

    const errors = [];

    if (password.length < 8)
        errors.push("Password must be at least 8 characters");

    if (!/[A-Z]/.test(password))
        errors.push("Must contain uppercase letter");

    if (!/[a-z]/.test(password))
        errors.push("Must contain lowercase letter");

    if (!/[0-9]/.test(password))
        errors.push("Must contain number");

    if (!/[!@#$%^&*]/.test(password))
        errors.push("Must contain special character");

    return errors;
}



app.post("/register", async (req, res) => {

    try {

        const { username, email, password } = req.body;


        if (!username || !email || !password) {

            return res.status(400).json({
                message: "All fields required"
            });

        }


       

        const validationErrors = validatePassword(password);

        if (validationErrors.length > 0) {

            return res.status(400).json({
                errors: validationErrors
            });

        }



        const existingUser = users.find(
            user => user.email === email
        );

        if (existingUser) {

            return res.status(409).json({
                message: "Email already registered"
            });

        }



        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        const newUser = {

            username,
            email,
            password: hashedPassword
        };


        users.push(newUser);


        res.status(201).json({
            message: "User registered successfully"
        });


    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

});


app.listen(3000, () =>
    console.log("Problem 1 server running on port 3000")
);