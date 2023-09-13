const fs = require('fs');
const path = require('path');

const booksFilePath = path.join(__dirname, "../data/products.json");
const books = JSON.parse(fs.readFileSync(booksFilePath, "utf-8"));

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
    },
    store: (req, res)=>{
        const data = req.body;
        const index = books[books.length - 1].id;

        const newBook = {
            id: index + 1,
            titulo: data.titulo,
            autor: data.autor,
            editorial: data.editorial,
            paginas: data.paginas,
            idioma: data.idioma,
            tipo_tapa: data.tipo_tapa,
            tematica: data.tematica,
            precio: data.precio,
            sinopsis: data.sinopsis,
            stock: data.stock,
            fecha_emision: data.lanzamiento,
            imagen: req.file.filename,
        };
        books.push(newBook);
        fs.writeFileSync(booksFilePath, JSON.stringify(books));
        res.redirect("/products");
    },
    edit: (req, res)=>{
        const id = req.params.id;
        const product = books.find((product) => product.id == id);
        console.log(product);
        res.render("products/productEdit", { book: product });
    },
    update: (req, res)=>{
        const id = req.params.id;
        const editProduct = req.body;
        const index = books.findIndex((product) => product.id == id);
    
        books[index].titulo = editProduct.titulo;
        books[index].autor = editProduct.autor;
        books[index].editorial = editProduct.editorial;
        books[index].paginas = editProduct.paginas
        books[index].idioma = editProduct.idioma;
        books[index].tipo_tapa = editProduct.tipo_tapa;
        books[index].tematica = editProduct.tematica;
        books[index].precio = editProduct.precio;
        books[index].sinopsis = editProduct.sinopsis;
        books[index].stock = editProduct.stock;
        books[index].fecha_emision = editProduct.fecha_emision;
    
        fs.writeFileSync(booksFilePath, JSON.stringify(books));
    
        res.redirect("/products");
    },
    destroy: (req, res)=>{
        const id = req.params.id;

        const leftProducts = books.filter((product) => product.id != id);
        fs.writeFileSync(booksFilePath, JSON.stringify(leftProducts));

        res.redirect("/products");
    }
}

module.exports = productController;