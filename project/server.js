const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to the Home Page");
    } else if (req.url === "/about" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("This is the About Page");
    } else if (req.url === "/user" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const user = { name: "manjeet", age: 25, city: "New ork" };
        res.end(JSON.stringify(user));
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
})