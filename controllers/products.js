const products = [];

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
    products.push({title:req.body.title})
    res.redirect('/');
}

exports.getShop = (req,res,next) => {
    res.render('shop',
        {prods: products, 
        docTitle:'Shop',
        path:'/admin/shop', 
        hasProduct: products.length > 0,
        shopActive: true,
        productCSS: true}
    );  
}

