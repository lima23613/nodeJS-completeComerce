const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then(products =>{
        res.render('shop/product-list',{
            prods: products,
            docTitle:'All Products',
            path:'/products'           
         });
    })
    .catch(err=>
        { 
            console.log(err);
        });   
};

exports.getProduct = (req,res,next)=>{
    const prodId = req.params.productId;

   /*  Product.findAll({where:{id : prodId}})
    .then(product=>{            
        res.render('shop/product-detail',{
            docTitle: product[0].title,
            path: '/products',
            prods: product[0]
        });
    })
    .catch(err => console.log(err)); */

    Product.findById(prodId)
        .then(product=>{            
                res.render('shop/product-detail',{
                    docTitle: product.title,
                    path: '/products',
                    prods: product
                });
            }
        )
        .catch(err => console.log(err));   
};

//list all product on shop
exports.getIndex = (req,res,next)=>{

    Product.findAll()
        .then(products =>{
            res.render('shop/index',{
                prods: products,
                docTitle:'shop',
                path:'/'           
             });
        })
        .catch(err=>{ console.log(err);});    
};

exports.getCart = (req,res,next)=>{

    req.user.getCart()
    .then(cart =>
         {return cart.getProducts()
            .then(products =>{
                res.render('shop/cart', {
                    docTitle: 'Your Cart',
                    path: '/cart',
                    products: products 
                });

            })
            .catch(err=>consile.log(err))
        })
    .catch(err=> {console.log(err)});
    /* Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products){
                const carProductData = cart.products.find(prod=>prod.id === product.id);
                if(carProductData){
                    cartProducts.push({productData: product, Qty: carProductData.qty});
                }
            }
            res.render('shop/cart', {
                docTitle: 'Your Cart',
                path: '/cart',
                products: cartProducts 
            });
        });
    });   */  
}

exports.postCart = (req,res,next) =>{

    const prodId = req.body.productId;
    let fetchedCard;

    req.user.getCart()
        .then(cart=>{
            fetchedCard = cart;
            return cart.getProducts({where:{id:prodId}});                
        })
        .then(products =>{
            let product;
            if(products.lenght > 0){
                product = products[0];                
            }

            let newQuantity = 1;
            if(product){
                //...
            }
            return Product.findById(prodId)
                .then(product =>{
                    return fetchedCard.addProduct(product, {through: {quantity:newQuantity}});
                })
                .catch(err=>console.log(err))
        })
        .then(res.redirect('/cart'))
        .catch(err=>console.log(err))
     
   /*  const prodId = req.body.productId;
    Product.findById(prodId,product =>{
        Cart.addProduct(prodId,product.price);
    })
    res.redirect('/cart'); */
};

exports.postDeleteCart = (req,res,next)=>{
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId,product.price);
        res.redirect('/cart')
    });     
}


exports.getOrder = (req,res,next) => {
    res.render('shop/orders',{
        docTitle:'Order',
        path:'/orders'
    });
}

exports.getCheckout = (req,res,next)=>{
    res.render('shop/checkout',{
        docTitle: 'checkout',
        path:'/checkout'
    });
}

