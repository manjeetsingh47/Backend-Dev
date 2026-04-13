import fs from "fs";

const exercise1 = (req, res, next) => {

    const startTime = Date.now();

    res.on("finish", () => {

        const logMessage =
            `${new Date().toISOString()} | ${req.method} | ${req.originalUrl} | ${res.statusCode} | ${Date.now() - startTime}ms\n`;

        fs.appendFileSync("requestLogs.txt", logMessage);

    });

    next();
};

export default exercise1;