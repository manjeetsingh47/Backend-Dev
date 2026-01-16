const fs = require("fs")

const readStream = fs.createReadStream("./log.txt")

const writeStream = fs.createWriteStream("./output2.txt")

// readStream.pipe(writeStream)

readStream.on("data", (chunk) => {

    let data = chunk.toString().toUpperCase();
    writeStream.write(data);
})

readStream.on("end", () => {
    writeStream.end();
})