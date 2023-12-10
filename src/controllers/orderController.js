
const db = require('../../database/models');

const orderController = {
    index: (req,res) => {//Obtener todas las ordenes del usuario logueado
        if(res.locals.userLogged){
            db.Order.findAll({
                where: {
                    user_id: res.locals.userLogged.id
                },
                include: [{
                    model: db.Cart,
                    as: "cart",
                    include: [{
                        model: db.Product,
                        as: "product"
                    }]
                }]
            })
            .then(result => {
                orders = result.map(order => {
                    cant = 0;
                    total = 0;
                    order.cart.map(book => {
                        cant = cant + book.cantidad;
                        total = total + (book.precio * cant);
                    });
                    order.cantidad = cant;
                    order.total = total;
                    return order;
                });
                res.render('orders/index',{orders: orders});
            })
            .catch(error => {
                console.log("Error al obtener las ordenes",error);
            })
        }else{
            res.render('users/login');
        }
    },

    getOrder: (req,res) => {//Obtener una orden en especifico
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
                order_id: req.params.id
            }
        })
        .then(result => {
            cant = 0;
            total = 0;
            result.map(book => {
                cant = cant + book.cantidad;
                total = total + (book.precio * cant);
            });
            books = {
                libros: result,
                cantidad: cant,
                total: total
            };
            res.render('orders/orderDetail',{books: books});
        })
        .catch(error => {
            console.log("Error al encontrar pedido: ",error);
        })
       
    },

    store:async (req, res) => {//Generar pedido
        try {
            if( req.session.userLogged){
                books = await db.Cart.findAll({
                    where: {
                        order_id: null
                    }
                });
                if(books.length > 0){
                    order = await db.Order.create({
                        user_id: req.session.userLogged.id,
                        fecha: new Date()
                    });
                    await db.Cart.update({order_id: order.id},{
                        where: {
                            order_id: null
                        }
                    });
                }
                res.redirect('/orders');
            }else{
                res.redirect('/user/login');
            }
        } catch (error) {
            console.log("Error al generar orden: ",error);
        }
    }
}

module.exports = orderController;