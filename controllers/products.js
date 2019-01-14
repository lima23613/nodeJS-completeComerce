const Product = require('../models/product');

exports.getAddproduct = (req,res,next) =>{
    res.render('admin/add-product',
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
    Product.fetchAll((products) => res.render('shop/product-list',
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

exports.getProductdetail = (req,res,next)=>{
    res.render('shop/product-detail',
    {   docTitle: 'Products detail',
        path:'/products'
    })
}

