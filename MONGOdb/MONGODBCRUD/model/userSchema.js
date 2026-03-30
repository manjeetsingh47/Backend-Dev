import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxLength: [25, "name must contain 25 char only"]
    },
    email: {
        type: String,
        require: true,
        uniqure: true,
    },
    password: {
        type: String,
        require: true,
        minLength: [8, "password must contain 8 char only"]
    },
    role: {
        type: String,

        enum: ["user", "admin"],
        default: "user"
    }
})
const user = mongoose.model("user", userSchema);
export default user;