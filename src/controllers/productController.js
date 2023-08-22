const productController = {
    index: (req, res)=>{
        res.render('products/index');
    },
    details: (req, res)=>{
        res.render('products/productDetails');
    },
    create: (req, res)=>{
        res.render('products/productForm');
    }
}

module.exports = productController;