import express from "express";
const app = express();



import bcrypt from "bcryptjs"

const salt = bcrypt.genSaltSync(10);

console.log(salt)
const hash = await bcrypt.hash("anc@4", salt);

console.log(hash);


const valid = bcrypt.compareSync("abc@44", hash);

console.log(valid)