const fs = require("fs")
const { Transform } = require("stream")

const upper = new Transform({
    transform(chunk, encoding, cb) {
        const modifiedData = chunk.toString().toUpperCase();
        cb(null, modifiedData);
    }
})

const removeVowels = new Transform({
    transform(chunk, encoding, cb) {
        let modifiedData = chunk.toString().replace(/[aeiouAEIOU]/g, "*");
        cb(null, modifiedData);
    }
})

const readStream = fs.createReadStream("./info.txt")
const writeStream = fs.createWriteStream("./output.txt")

readStream
    .pipe(upper)
    .pipe(removeVowels)
    .pipe(writeStream)