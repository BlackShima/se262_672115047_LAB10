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








app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});