const fs = require('fs');
const path = require('path');

const booksJson = fs.readFileSync(path.join(__dirname,"../data/products.json"),"utf-8");
const books = JSON.parse(booksJson);

const mainController = {
    home: (req, res)=>{
        res.render('main/home', {books: books});
    },
}

module.exports = mainController;