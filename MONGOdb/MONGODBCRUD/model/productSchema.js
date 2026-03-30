import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [20, "Name cannot exceed 50 characters"]
    },
    price: {
        type: Number,
        min: [1, "price must be greater then 1 "]
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    userId: { //connecting userSchema with productSchema
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    specs: {
        type: Object,
    },
    tags: [{ type: String }]

});

const product = mongoose.model("products", productSchema);
export default product;