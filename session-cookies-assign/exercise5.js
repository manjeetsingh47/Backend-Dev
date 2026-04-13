import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());


// SESSION SETUP
app.use(
    session({
        secret: "cart-secret",
        resave: false,
        saveUninitialized: true,
    })
);



// ADD ITEM TO CART (ANONYMOUS USER → COOKIE)
app.post("/add-to-cart", (req, res) => {

    const { item } = req.body;

    let cart = req.cookies.cart
        ? JSON.parse(req.cookies.cart)
        : [];

    cart.push(item);

    res.cookie(
        "cart",
        JSON.stringify(cart),
        { maxAge: 600000 }
    );

    res.send("Item added to anonymous cart");
});



// LOGIN ROUTE (MIGRATE COOKIE CART → SESSION CART)
app.get("/login", (req, res) => {

    req.session.user = "Manjeet";

    // migrate cookie cart into session cart
    if (req.cookies.cart) {

        req.session.cart =
            JSON.parse(req.cookies.cart);

        res.clearCookie("cart");

    }

    res.send(
        "Logged in. Cookie cart migrated to session cart."
    );
});



// ADD ITEM AFTER LOGIN (SESSION CART)
app.post("/add-session-cart", (req, res) => {

    if (!req.session.user) {

        return res.send(
            "Login first to use session cart"
        );

    }

    const { item } = req.body;

    if (!req.session.cart) {

        req.session.cart = [];

    }

    req.session.cart.push(item);

    res.send("Item added to session cart");
});



// VIEW CART
app.get("/view-cart", (req, res) => {

    if (req.session.user) {

        return res.send({
            type: "Session Cart",
            cart: req.session.cart || [],
        });

    }

    const cookieCart = req.cookies.cart
        ? JSON.parse(req.cookies.cart)
        : [];

    res.send({
        type: "Cookie Cart",
        cart: cookieCart,
    });
});



// LOGOUT
app.get("/logout", (req, res) => {

    req.session.destroy(() => {
s
        res.send("Logged out successfully");

    });
});


app.listen(5000, () =>
    console.log("Exercise 5 running on port 5000")
);