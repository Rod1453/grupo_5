const fs = require('fs');
const path = require('path');

const booksJson = fs.readFileSync(path.join(__dirname,"../data/products.json"),"utf-8");
const books = JSON.parse(booksJson);

const productController = {
    index: (req, res)=>{
        res.render('products/index', {books: books});
    },
    details: (req, res)=>{
        const book = books.find(item => item.id == req.params.id);
        res.render('products/productDetails', {book: book});
    },
    create: (req, res)=>{
        res.render('products/productForm');
    }
}

module.exports = productController;