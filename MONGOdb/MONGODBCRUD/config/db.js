import mongoose from "mongoose";
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log("connection done");

    } catch (error) {
        console.log("connection fail", error)
    }

}
export default connectDB;