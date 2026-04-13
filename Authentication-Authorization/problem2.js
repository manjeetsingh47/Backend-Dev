const express = require("express");
const session = require("express-session");

const app = express();

app.use(express.json());


/*
SESSION CONFIGURATION
*/

app.use(
    session({
        secret: "cart-secret",
        resave: false,
        saveUninitialized: false,
    })
);


/*
INITIALIZE CART MIDDLEWARE
*/

const initCart = (req, res, next) => {

    if (!req.session.cart) {

        req.session.cart = [];

    }

    next();
};

app.use(initCart);


/*
ADD ITEM TO CART
*/

app.post("/cart/add", (req, res) => {

    const { productId, name, price, quantity } = req.body;

    if (!productId || !price) {

        return res.status(400).json({
            message: "Product ID and price required",
        });

    }

    const existingItem = req.session.cart.find(
        (item) => item.productId === productId
    );

    if (existingItem) {

        existingItem.quantity += quantity || 1;

    } else {

        req.session.cart.push({
            productId,
            name,
            price,
            quantity: quantity || 1,
        });

    }

    res.json({
        message: "Item added",
        cart: req.session.cart,
    });
});


/*
UPDATE ITEM QUANTITY
*/

app.put("/cart/update/:productId", (req, res) => {

    const { quantity } = req.body;

    const item = req.session.cart.find(
        (item) =>
            item.productId === req.params.productId
    );

    if (!item) {

        return res.status(404).json({
            message: "Item not found",
        });

    }

    item.quantity = quantity;

    res.json({
        message: "Quantity updated",
        cart: req.session.cart,
    });
});


/*
REMOVE ITEM
*/

app.delete("/cart/remove/:productId", (req, res) => {

    req.session.cart =
        req.session.cart.filter(
            (item) =>
                item.productId !== req.params.productId
        );

    res.json({
        message: "Item removed",
        cart: req.session.cart,
    });
});


/*
VIEW CART WITH TOTAL PRICE
*/

app.get("/cart", (req, res) => {

    const totalPrice = req.session.cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    res.json({
        cart: req.session.cart,
        totalPrice,
    });
});


/*
CLEAR CART
*/

app.delete("/cart/clear", (req, res) => {

    req.session.cart = [];

    res.json({
        message: "Cart cleared",
    });
});


app.listen(3000, () =>
    console.log("Problem 2 server running on port 3000")
);