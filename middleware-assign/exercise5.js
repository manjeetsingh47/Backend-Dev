import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

const exercise5 = (app) => {

    // Prevent MongoDB injection attacks
    app.use(mongoSanitize());

    // Prevent XSS attacks
    app.use(xss());

};

export default exercise5;