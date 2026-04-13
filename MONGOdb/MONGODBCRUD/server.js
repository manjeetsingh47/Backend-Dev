import connectDb from "./config/db.js";
import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoutes.js"


dotenv.config();
connectDb();


const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;



app.use("/api", userRoutes)
app.use("/api/auth", authRoutes)



app.listen(port, () => {
    console.log("server is running on port http://localhost:", port)
});