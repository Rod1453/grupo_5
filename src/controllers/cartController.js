const db = require('../../database/models');

const cartController = {
    index: (req,res) => {
        db.Cart.findAll({
            include: [{
                model: db.Product,
                as: "product",
                include: [{
                    model: db.Theme,
                    as: "theme"
                }]
            }],
            where: {
                order_id: null
            }
        })
        .then(result => {
            cant = 0;
            total = 0;
            result.map(book => {
                cant = cant + book.cantidad;
                total = total + (book.precio * cant);
            });
            cart = {
                books: result,
                cantidad: cant,
                total: total
            };
            res.render('carts/index',{cart:cart});
        })
        .catch(error => {
            console.log("Error al traer productos: ",error);
        });
    },
    store: async (req,res) => {
        try {
            book = await db.Product.findByPk(req.body.id);
            aux = await db.Cart.findOne({
                where: {
                    product_id: book.id,
                    order_id: null
                }
            });
            if(!aux){
                db.Cart.create({
                    product_id: book.id,
                    order_id: null,
                    precio: book.precio,
                    cantidad: 1,
                });
            }
            res.redirect('/products/detail/'+req.body.id);
        } catch (error) {
            console.log("Error al agregar al carrito: ",error);
        }
    },
    destroy: (req,res) => {
        db.Cart.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(res.redirect("/carts"))
        .catch(error => {
            console.log(error);
        })
    }
}

module.exports = cartController;