const Product = require('../models/product');
//const db = require('../util/database');

exports.getAddproduct = (req,res,next) =>{
    res.render('admin/edit-product',{
        docTitle:'Add Product', 
        path:'/admin/add-product',
        editing: false
    });
    //...
};

exports.postAddproduct = (req,res,next) =>{
    const title = req.body.title;
    const imageUrl =  req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    req.user.createProduct({
        title:title,
        price: price,
        imageUrl:imageUrl,
        description:description,
        
    }).then(result=> {
        console.log(result);
        res.redirect('/admin/products');
    }
    ).catch(err=>{console.log(err)});
    /*  const product = new Product(null,title,imageUrl,price,description);
    product.save().then(()=>{
        res.redirect('/');
    }).catch(err=>console.log(err));  */         
};

exports.getEditproduct = (req,res,next) =>{
    const editMode = req.query.edit;

    if(!editMode){
        return res.redirect('/');
    }

    const prodId = req.params.productId;

    req.user.getProducts({where:{id : prodId}})    
    .then(prods =>{
        const prod = prods[0];
        if(!prod){
            return res.redirect('/');
        }
        res.render('admin/edit-product',{
            docTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: prod
        })
    })
    .catch(err=>{console.log(err);
    });
   /*  Product.findById(prodId, product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            docTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    }); */
}
exports.postEditproduct = (req,res,next)=>{
    const id = req.body.productId;
    const title = req.body.title;
    const imageUrl =  req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    Product.findById(id)
    .then(prod=>{
        prod.title = title;
        prod.imageUrl = imageUrl;
        prod.price = price;
        prod.description = description;
        return prod.save();
    })
    .then(reult => {
        console.log(reult);
        res.redirect('/admin/products');
    })
    .catch(err=>{console.log(err);
    });
    /* const updateProduct = new Product(id,title,imageUrl,price,description);
    updateProduct.save(); */    
}

exports.getProducts = (req,res,next) =>{
    //Product.findAll()
    req.user.getProducts()
    .then(products => {
        res.render('admin/products',
        {
            prods: products,
            docTitle: 'All Products',
            path: '/admin/products'           
        });
    })
    .catch(err=>console.log(err));
}

exports.postDeleteproduct = (req,res,next)=>{
    const prodId = req.params.productId;
    Product.findByPk(prodId)
    .then(prod =>{
        return prod.destroy();        
    }
    ).then(result =>{
        console.log(result);
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}