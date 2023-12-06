const fs = require('fs');
const path = require('path');

const booksJson = fs.readFileSync(path.join(__dirname,"../data/products.json"),"utf-8");
const books = JSON.parse(booksJson);

const db = require('../../database/models');

const mainController = {
    home: (req,res) => {
        db.Product.findAll()
        .then(result => {
            res.render('main/home', {books: result});
        })
        .catch(error => {
            console.log(error);
        })
    }
}

/*Utilizado por las estructura JSON*/
// const mainController = {
//     home: (req, res)=>{
//         res.render('main/home', {books: books});
//     },
// }

module.exports = mainController;