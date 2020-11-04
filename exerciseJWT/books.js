// microservice gestion des livres
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.json());
const accessTokenSecret = 'youraccesstokensecret';
const books = [
    {
        "author": "Chinua Achebe",
        "country": "Nigeria",
        "language": "English",
        "pages": 209,
        "title": "Things Fall Apart",
        "year": 1958
    },
    {
        "author": "Hans Christian Andersen",
        "country": "Denmark",
        "language": "Danish",
        "pages": 784,
        "title": "Fairy tales",
        "year": 1836
    },
    {
        "author": "Dante Alighieri",
        "country": "Italy",
        "language": "Italian",
        "pages": 928,
        "title": "The Divine Comedy",
        "year": 1315
    },
];
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                res.send( {"reqState" :'Token error'} );
            }
            req.user = user;
            next();
        });
    } else {
        res.send( {"reqState" :'Authorization required'} );
    }
};
app.get('/books' , authenticateJWT, (req, res) => {
    res.json(books);
});
app.post('/books', authenticateJWT, (req, res) => {
    const { role } = req.user;
    if (role !== 'admin') {
        return res.send( {"reqState" :'not allowed to add books'} );
    }
    const book = req.body;
    books.push(book);
    res.send( {"reqState" :'Book added successfully'} );
});
app.listen(4000, () => {
    console.log('Books service on http://localhost:4000');
});