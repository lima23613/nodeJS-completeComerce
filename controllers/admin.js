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
    const title = req.body.title;
    const imageUrl =  req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title,imageUrl,price,description);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req,res,next) =>{
    Product.fetchAll(products => {
        res.render('admin/products',
        {
            prods: products,
            docTitle: 'All Products',
            path: '/admin/products'           
        });
    });
}