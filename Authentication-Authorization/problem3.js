const express = require("express");
const session = require("express-session");

const app = express();

app.use(express.json());



app.use(
    session({
        secret: "auth-secret",
        resave: false,
        saveUninitialized: false
    })
);




const users = [
    { id: 1, username: "manjeet", role: "user" },
    { id: 2, username: "mod", role: "moderator" },
    { id: 3, username: "admin", role: "admin" }
];

const posts = [];




app.post("/login", (req, res) => {

    const { username } = req.body;

    const user = users.find(
        u => u.username === username
    );

    if (!user) {

        return res.status(404).json({
            message: "User not found"
        });

    }

    req.session.user = user;

    res.json({
        message: "Login successful",
        user
    });

});




const isAuthenticated = (req, res, next) => {

    if (!req.session.user) {

        return res.status(401).json({
            message: "Login required"
        });

    }

    next();
};



const requireRole = (role) => {

    return (req, res, next) => {

        const user = req.session.user;

        if (!user) {

            return res.status(401).json({
                message: "Login required"
            });

        }

        if (
            user.role === role ||
            user.role === "admin"
        ) {

            return next();

        }

        res.status(403).json({
            message: "Access denied"
        });

    };

};




const isOwnerOrModerator = (req, res, next) => {

    const post = posts.find(
        p => p.id == req.params.id
    );

    if (!post) {

        return res.status(404).json({
            message: "Post not found"
        });

    }

    const user = req.session.user;

    if (
        post.userId === user.id ||
        user.role === "moderator" ||
        user.role === "admin"
    ) {

        req.post = post;

        return next();

    }

    res.status(403).json({
        message: "Not authorized to edit this post"
    });

};



app.post("/posts", isAuthenticated, (req, res) => {

    const newPost = {

        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
        userId: req.session.user.id
    };

    posts.push(newPost);

    res.status(201).json(newPost);

});




app.put(
    "/posts/:id",
    isAuthenticated,
    isOwnerOrModerator,
    (req, res) => {

        req.post.title = req.body.title;
        req.post.content = req.body.content;

        res.json({
            message: "Post updated",
            post: req.post
        });

    }
);




app.delete(
    "/posts/:id",
    isAuthenticated,
    requireRole("moderator"),
    (req, res) => {

        const index = posts.findIndex(
            p => p.id == req.params.id
        );

        if (index === -1) {

            return res.status(404).json({
                message: "Post not found"
            });

        }

        posts.splice(index, 1);

        res.json({
            message: "Post deleted"
        });

    }
);




app.get(
    "/users",
    isAuthenticated,
    requireRole("admin"),
    (req, res) => {

        res.json(users);

    }
);


app.listen(3000, () =>
    console.log("Problem 3 server running on port 3000")
);