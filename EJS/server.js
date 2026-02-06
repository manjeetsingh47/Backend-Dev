import express from 'express';
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // to parse form data
//static server
//csr = client side rendering
//ssr = server side rendering - seo friendly (search engine optimization) fast than csr
//template engine
//ejs , pug , hbs
//react = csr 
//ejs - template engine runs dynamic html pages on server side (with help of express js)

app.get('/', (req, res) => {
    res.render('index');
});

// app.get('/user', (req, res) => {
//     //binding data to ejs template
//     let userData = { 
//         name: 'John Doe',
//         age: 30,
//     };
//     res.render('user',{userData});
// });
let userData = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Mike Johnson', age: 35 },
];

app.get('/user', (req, res) => {
    res.render('user', { userData });
});

app.post('/api/user', (req, res) => {
    const { name, age } = req.body;
    let newUserData = {
        id: userData.length + 1,
        name,
        age,
    }
    userData.push(newUserData);
    res.redirect('/user');
});

app.get("/api/user/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const useridx = userData.findIndex(u => u.id === userId);
    if (useridx === -1) {
        return res.status(404).render('404');
    }

    userData.splice(useridx, 1);
    res.redirect('/user');
});

app.get('/list', (req, res) => {
    let arr = ["apple", "banana", "grapes", "mango"];
    res.render('list', { arr });
});

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});