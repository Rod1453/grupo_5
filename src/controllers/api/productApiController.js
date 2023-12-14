
const db = require('../../../database/models');
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('mysql://usuario:root@localhost:3306/book_market');

const productApiController = {
    list:async (req, res) => {
        try {//Mostrar todos los libros
            let books = await db.Product.findAll();
            let themes = await db.Theme.findAll();
            countByCategory = themes.map(theme => {//Cantidad de libros por categoria
                count = 0;
                books.map(book => {
                    if(book.theme_id == theme.id){
                        count = count + 1;
                    }
                });
                category = {
                    theme: theme.nombre,
                    count: count 
                }
                return category;
            });
            books = books.map(book => {//Estructuro lo que quiero mostrar
                return {
                    id: book.id,
                    titulo: book.titulo,
                    theme_id: book.theme_id,
                    sinopsis: book.sinopsis,
                    imagen: "http://localhost:3000/img/products/"+book.imagen,
                    detail: "http://localhost:3000/api/products/"+book.id
                }
            })
            if(books.length > 0){
                return res.status(200).json({
                    count: books.length,
                    products: books,
                    countByCategory: countByCategory,
                    status: 200
                });
            }else{
                res.status(404).json({error: "Sin libros."});
            }
        } catch (error) {
            console.error("Error al consultar libros", error);
            res.status(500).json({ error: "Error al consultar libros." });
        }
    },
    show:async (req, res) => {//Mostrar un libro
        try {
            let book = await db.Product.findByPk(req.params.id);
            if(book){
                book.imagen = "http://localhost:3000/img/products/"+book.imagen;
                return res.status(200).json({
                    product: book,
                    status: 200
                });
            }else{
                res.status(404).json({error: "No se encontro el libro."});
            }
        } catch (error) {
            console.error("Error al consultar el libro", error);
            res.status(500).json({ error: "Error al consultar el libro." });
        }
    },
    store:async (req, res) => {
        try {
            const nuevo = await db.Product.create({
                theme_id: req.body.tematica,
                titulo: req.body.titulo,
                autor: req.body.autor,
                editorial: req.body.editorial,
                paginas: req.body.paginas,
                idioma: req.body.idioma,
                tipo_tapa: req.body.tipo_tapa,
                precio: req.body.precio,
                sinopsis: req.body.sinopsis,
                stock: req.body.stock,
                fecha_emision: req.body.lanzamiento,
                imagen: req.body.imagen || 'images.png'
            });
            return res.status(201).json(nuevo);
        } catch (error) {
            console.error("Error al crear un producto", error);
            res.status(500).json({ error: "Error al crear un producto." });
        }
    },
    update:async (req, res) => {
        try {
            let book= await db.Product.findByPk(req.params.id);
            if (!book) {
                res.status(404).json({ error: "Producto no encontrado." });
                return;
            }
            await db.Product.update({
                theme_id: req.body.tematica,
                titulo: req.body.titulo,
                autor: req.body.autor,
                editorial: req.body.editorial,
                paginas: req.body.paginas,
                idioma: req.body.idioma,
                tipo_tapa: req.body.tipo_tapa,
                precio: req.body.precio,
                sinopsis: req.body.sinopsis,
                stock: req.body.stock,
                fecha_emision: req.body.lanzamiento
            },{
                where: {
                    id: req.params.id
                }
            });
            book = await db.Product.findByPk(req.params.id);
            return res.status(201).json(book);
        } catch (error) {
            console.error("Error al actualizar un producto", error);
            res.status(500).json({ error: "Error al actualizar un producto." });
        }
    },
    destroy:async (req, res) => {
        try {
            const book = await db.Product.findByPk(req.params.id);
            if (!book) {
              res.status(404).json({ error: "Producto no encontrado." });
              return;
            }
            await book.destroy();
            res.json({ mensaje: "Producto eliminado con éxito." });
        } catch (error) {
            console.error("Error al eliminar el producto: ", error);
            res.status(500).json({ error: "Error al eliminar el producto." });
        }
    },
    acountSoldAndOrders:async (req, res) => {//Total de productos vendidos y total de ventas
        try {
            const countSold = await db.Cart.sum('cantidad');
            const countOrders = await db.Order.count();
            const count = await db.Product.count();
            res.status(200).json({
                productSold: countSold,
                acountOrders: countOrders,
                count: count
            });
        } catch (error) {
            console.error("Error al consultar la cantidad de productos vendidios y total de ventas.", error);
            res.status(500).json({ error: "Error al consultar la cantidad de productos vendidios y total de ventas" });
        }
    },
    last5Products:async (req, res) => {// Últimos 5 productos vendidos y los 5 más vendidos.
        try {
            const books = await db.Product.findAll({
                order: [['id','DESC']],
                limit: 5,
            });
            const mostSold = await db.Cart.findAll({
                attributes: ['product_id',[sequelize.fn('SUM', sequelize.col('cantidad')),'acountSold']],
                group: ['product_id'],
                order: ['acountSold'],
                limit: 5
            });
            books.forEach(book=>book.imagen="http://localhost:3000/img/products/"+book.imagen)
            res.status(200).json({
                lastProducts: books,
                mostSold: mostSold 
            });
        } catch (error) {
            console.error("Error al realizar la consulta: ", error);
            res.status(500).json({ error: "Error al realizar la consulta." });
        }
    }
}

module.exports = productApiController;