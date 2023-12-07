

const orderController = {
    index: (req,res) => {
        res.render('orders/index');
    },

    getOrder: (req,res) => {
        res.render('orders/orderDetail');
    }
}

module.exports = orderController;