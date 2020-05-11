const path = require('path');
const express = require('express'); 
//not need for pug
/* const expressHbrs = require('express-handlebars'); */
const bodyParser = require('body-parser');
const app = express();

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

//const sequelize = require('./util/database');
//we don't need this for pug 

/* app.engine('hbs',expressHbrs({layoutsDir:'views/layouts/',
    defaultLayout:'main-layout', 
    extname:'hbs'
}));
 */
app.set('view engine','ejs');
//app.set('view engine','pug');
app.set('views','views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorConttroller = require('./controllers/error');

/* db.execute('SELECT * FROM products')
.then(result =>{console.log(result[0]);
})
.catch(err=>{console.log(err);
});   */

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user = user;
        next();
    })
    .catch(err=>{
        console.log(err);})
});

app.use(adminRoutes);
app.use(shopRoutes);

app.use(errorConttroller.notFound);

const port = 3000;

//relations between objects
/**************************************************************** */
Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'});
User.hasMany(Product);
//*********************************************** */
User.hasOne(Cart);
Cart.belongsTo(User);
/************************************************ */
Cart.belongsToMany(Product, {through:CartItem});
Product.belongsToMany(Cart, {through:CartItem});
/************************************************************** */
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through:OrderItem});
/************************************************************** */

//sequelize.sync({force:true})
sequelize.sync()
.then(result=>{
    //console.log(result);  
    return User.findByPk(1);  
})
.then(user =>{
    if(!user){
        return User.create({name: 'Roberto', email: 'lima.praxiteles@gmail.com'});
    }
    return user;
}).then(user=>{
    return user.createCart();
})
.then(cart=>{
    app.listen(port ,()=> {
        console.log('...Server is running on port $'+port+' !');
    }); 

})
.catch(err=>{console.log(err);});

