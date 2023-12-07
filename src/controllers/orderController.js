
const db = require('../../database/models');

const orderController = {
    index: (req,res) => {
        db.Order.findAll({
            where: {
                user_id: res.locals.userLogged.id
            }
        })
        .then(result => {
            res.render('orders/index',{orders: result});
        })
        .catch(error => {
            console.log("Error al obtener las ordenes",error);
        })
    },

    getOrder: (req,res) => {
        res.render('orders/orderDetail');
    }
}

module.exports = orderController;