const express = require('express'); 
const mongoose = require('mongoose');
const router = express.Router();


const Product = require("../models/product");

// dealing with /product with get request
router.get('/product', (req, res, next) => {

    Product.find()
    .select('name price _id') // it will only show name, price and _id 
        .exec()
        .then(docs => {
            const response ={
                total_No_Of_Items : docs.length,
                product : docs.map(doc=>{
                    return {
                        name : doc.name,
                        price:doc.price,
                        _id : doc._id,
                        request :{
                            type: "Get",
                            url : "localhost/product/"+doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
               error : err 
            })
        })
})
//to post new product
router.post('/product', (req, res, next) => {
    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,

       

    })
    //save data in database 
    product.save(function (err, product) {
        if (err){ return res.json({error})}
       
        
    
      res.status(201).json({
        message: "handling post request to /product",
        createdProduct: product ,
        CompleteIfo : "localhost/product/"+product._id
    });
 });
});
// to get product info with particular id
router.get('/product/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({name : docs.name,
            price: docs.price,
        _id: docs._id });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });

});


//to update the particular product
router.patch('/product/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        update[ops.propName] = ops.value;
    }
    Product.update({_id : id},{$set:updateOps})
    .exec()
    .then(result=>{
        console.log(res);
        res.status(200).json({updated_data: result,
       url: "localhost/product/"+result._id })
    })
    .catch(err =>{
      console.log(err)
      res.status(500).json({
          error: err
      });
    })
});


// to delete to particular product by id
router.delete('/product/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.remove({_id : id})
    .exec()
    .then(result => {
        res.status(200).json({deleted_data: result,
            url: "localhost/product/"+result._id});
    })
    .catch(err =>{
        res.status(500).json({
            error : err
        })
    })
    });

// export of product module
module.exports = router;