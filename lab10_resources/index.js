const express = require('express'); // Import Express.js framework
const bodyParser = require('body-parser'); // Import body-parser middleware

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Sample book data stored in-memory
let books = [
    { bookNo: 1, bookName: "Game of Thrones" },
    { bookNo: 2, bookName: "Clash of Kings" },
    { bookNo: 3, bookName: "Name of the Wind" },
    { bookNo: 4, bookName: "The Wise Man’s Fear" }
];

// Write APIs to support CRUD operations
app.get('/api/books', (req, res) => {
    res.json(books);
});

app.post('/api/books', (req, res) => {
    const newBook = {
        bookNo: books.length > 0 ? books[books.length - 1].bookNo + 1 : 1,
        bookName: req.body.bookName
    };
    books.push(newBook);
    res.json(books);
});

app.delete('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    books = books.filter(book => book.bookNo !== id);
    res.json(books);
});

app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedName = req.body.bookName;
    
    const book = books.find(b => b.bookNo === id);
    if (book) {
        book.bookName = updatedName;
    }
    res.json(books);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});