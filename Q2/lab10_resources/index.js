const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let books = [
    { "bookNo": 1, "bookName": "Game of Thrones" },
    { "bookNo": 2, "bookName": "Clash of Kings" },
    { "bookNo": 3, "bookName": "Name of the Wind" },
    { "bookNo": 4, "bookName": "The Wise Man’s Fear" }
];


app.get('/api/books', (req, res) => {
    res.json(books);
});

app.post('/api/books', (req, res) => {
    const name = req.body.bookName;
    
    const newBook = {
        bookNo: books.length > 0 ? Math.max(...books.map(b => b.bookNo)) + 1 : 1,
        bookName: name
    };
    
    books.push(newBook);
    res.status(201).json(books);
});

app.delete('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    books = books.filter(book => book.bookNo !== id);
    
    res.json(books);
});

app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const newName = req.body.bookName;
    
    const book = books.find(b => b.bookNo === id);
    if (book) {
        book.bookName = newName;
        res.json(books); 
    } else {
        res.status(404).send('Book not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});