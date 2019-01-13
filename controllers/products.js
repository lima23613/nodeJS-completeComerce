const Product = require('../models/product');

exports.getAddproduct = (req,res,next) =>{
    res.render('add-product',
    {docTitle:'Add Product', 
    path:'/admin/add-product',
    productCSS: true,
    addprodActive: true}
    );
    //...
}

exports.postAddproduct = (req,res,next) =>{
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getShop = (req, res, next) => {
    Product.fetchAll((products) => res.render('shop',
        {
            prods: products,
            docTitle: 'Shop',
            path: '/admin/shop',
            hasProduct: products.length > 0,
            shopActive: true,
            productCSS: true
        }
    ));
}

