const fs = require('fs');
const path = require('path');

const booksFilePath = path.join(__dirname, "../data/products.json");
const books = JSON.parse(fs.readFileSync(booksFilePath, "utf-8"));

const { validationResult } = require("express-validator");

const db = require('../../database/models');
const { error } = require('console');

const productController = {
    index: (req,res) => {
        db.Product.findAll().then(result => {
            res.render('products/index',{books: result});
        }).catch((error) => console.log(error));
    },
    details: (req,res) => {
        db.Product.findByPk(req.params.id,{
            include: [{
                model: db.Theme,
                as: "theme",
                attributes: ["nombre"]
            }]
        })
        .then(result => {
            book = result;
            book.tematica = result.theme.nombre
            res.render('products/productDetails', {book: book});
        }).catch((error) => console.log(error));
    },
    create: (req,res) => {
        db.Theme.findAll()
            .then(result => {
                res.render('products/productForm',{themes: result});
            }) 
            .catch(error => {
                console.log(error);
            });
    },
    store: (req,res) => {
        const resultValidations = validationResult(req);
        if (resultValidations.errors.length > 0) {
            db.Theme.findAll()
            .then(result => {console.log(req.body)
                res.render("products/productForm", {
                    errors: resultValidations.mapped(),
                    oldData: req.body,
                    themes: result
                });
            }) 
            .catch(error => {
                console.log(error);
            });
        } else {
            const data = req.body;

            const newBook = {
                theme_id: data.tematica,
                titulo: data.titulo,
                autor: data.autor,
                editorial: data.editorial,
                paginas: data.paginas,
                idioma: data.idioma,
                tipo_tapa: data.tipo_tapa,
                precio: data.precio,
                sinopsis: data.sinopsis,
                stock: data.stock,
                fecha_emision: data.lanzamiento,
                imagen: req.file.filename,
            };

            db.Product.create({...newBook})
                .then(res.redirect("/products"))
                .catch(error => {
                    console.log(error);
                });
        }
    },
    edit: async (req,res) => {
        try {
            book = await db.Product.findByPk(req.params.id);
            themes = await db.Theme.findAll();
            res.render("products/productEdit", { book: book, themes: themes});
        } catch(error) {
            console.log(error);
        }
    },
    update: (req,res) => {
        const resultValidations = validationResult(req);
        if (resultValidations.errors.length > 0) {
            db.Theme.findAll()
            .then(result => {console.log(req.body)
                res.render("products/productEdit", {
                    errors: resultValidations.mapped(),
                    oldData: req.body,
                    themes: result
                });
            }) 
            .catch(error => {
                console.log(error);
            });
        } else {
            const data = req.body;

            const editBook = {
                theme_id: data.tematica,
                titulo: data.titulo,
                autor: data.autor,
                editorial: data.editorial,
                paginas: data.paginas,
                idioma: data.idioma,
                tipo_tapa: data.tipo_tapa,
                precio: data.precio,
                sinopsis: data.sinopsis,
                stock: data.stock,
                fecha_emision: data.lanzamiento
            };

            db.Product.update({...editBook},{ where: {
                id: req.params.id
              }})
                .then(res.redirect("/products"))
                .catch(error => {
                    console.log(error);
                });
        }
    },
    destroy: (req,res) => {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(res.redirect("/products"))
        .catch(error => {
            console.log(error);
        })
    }
}

/*Utilizando estructura JSON*/
// const productController = {
//     index: (req, res)=>{
//         const booksFilePath = path.join(__dirname, "../data/products.json");
//         const books = JSON.parse(fs.readFileSync(booksFilePath, "utf-8"));
//         res.render('products/index', {books: books});
//     },
//     details: (req, res)=>{
//         const book = books.find(item => item.id == req.params.id);
//         res.render('products/productDetails', {book: book});
//     },
//     create: (req, res)=>{
//         res.render('products/productForm');
//     },
//     store: (req, res)=>{
//         const resultValidations = validationResult(req);
//         if (resultValidations.errors.length > 0) {
//             res.render("products/productForm", {
//                 errors: resultValidations.mapped(),
//                 oldData: req.body,
//             });
//         } else {
//             const data = req.body;
//             const index = books[books.length - 1].id;

//             const newBook = {
//                 id: index + 1,
//                 titulo: data.titulo,
//                 autor: data.autor,
//                 editorial: data.editorial,
//                 paginas: data.paginas,
//                 idioma: data.idioma,
//                 tipo_tapa: data.tipo_tapa,
//                 tematica: data.tematica,
//                 precio: data.precio,
//                 sinopsis: data.sinopsis,
//                 stock: data.stock,
//                 fecha_emision: data.lanzamiento,
//                 imagen: req.file.filename,
//             };
//             books.push(newBook);
//             fs.writeFileSync(booksFilePath, JSON.stringify(books));
//             res.redirect("/products");
//         }
//     },
//     edit: (req, res)=>{
//         const id = req.params.id;
//         const product = books.find((product) => product.id == id);
//         // console.log(product);
//         res.render("products/productEdit", { book: product });
//     },
//     update: (req, res)=>{
//         const resultValidations = validationResult(req);
//         if (resultValidations.errors.length > 0) {
//             const book = req.body;
//             book.id = req.params.id
//             res.render("products/productEdit", {
//                 book: book,
//                 errors: resultValidations.mapped(),
//                 oldData: req.body,
//             });
//         } else {
//             const id = req.params.id;
//             const editProduct = req.body;
//             const index = books.findIndex((product) => product.id == id);
        
//             books[index].titulo = editProduct.titulo;
//             books[index].autor = editProduct.autor;
//             books[index].editorial = editProduct.editorial;
//             books[index].paginas = editProduct.paginas
//             books[index].idioma = editProduct.idioma;
//             books[index].tipo_tapa = editProduct.tipo_tapa;
//             books[index].tematica = editProduct.tematica;
//             books[index].precio = editProduct.precio;
//             books[index].sinopsis = editProduct.sinopsis;
//             books[index].stock = editProduct.stock;
//             books[index].fecha_emision = editProduct.lanzamiento;
        
//             fs.writeFileSync(booksFilePath, JSON.stringify(books));
        
//             res.redirect("/products");
//         }
//     },
//     destroy: (req, res)=>{
//         const id = req.params.id;

//         const leftProducts = books.filter((product) => product.id != id);
//         fs.writeFileSync(booksFilePath, JSON.stringify(leftProducts));

//         res.redirect("/products");
//     }
// }

module.exports = productController;