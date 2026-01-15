const http = require("http");
const queryString = require('querystring')

const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url == "/login" && req.method == "POST") {
        let data = "";

        req.on("data", (chunk) => {
            data += chunk.toString();
        });

        req.on("end", () => {
            console.log("raw data in form urlencoded" + data)
            let parsedData = queryString.parse(data)
            console.log("passed raw to js object", parsedData)

            let jsonString = JSON.stringify(parsedData);
            console.log("js object to json string" + jsonString)

            let final = JSON.parse(jsonString);

            console.log("jsonstring to json data", final);

            res.writeHead(200, { "content-type": "application/json" });
            res.end({ msg: "Data received", jsonString });

        });
        return;
    }

    res.end("server is running");
});
server.listen(port, () => {
    console.log(`srver is runnung in ${port}`);

})