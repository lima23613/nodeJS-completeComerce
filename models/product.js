const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductFromFile = (cb)=>{
    
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            cb([]);
        }else{
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product{
    constructor(title,imageUrl,price,description){
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save(){
        this.id = Math.random().toString();
        getProductFromFile(products =>{
            products.push(this); 
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err);
            });
        });
    }

    static fetchAll(cb){
        getProductFromFile(cb);    
    }

    static findById(id,cb){
        getProductFromFile(products=>{
            const product = products.find(p=>p.id===id);
            cb(product);
        });
    }
}