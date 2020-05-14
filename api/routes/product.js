const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const Product = require("../models/product");


router.get('/product', (req, res, next) => {

    Product.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
               error : err 
            })
        })
})
router.post('/product', (req, res, next) => {
    // const product ={
    //  name : req.body.name,
    //  price : req.body.price
    //       };
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save(function (err, product) {
        if (err) return console.error(err);
        console.log("added in database")
    });
    res.status(201).json({
        message: "handling post request to /product",
        createdProduct: product
    });
});
router.get('/product/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });

});
// product.findById(function(err,id){
//     if(err){
//         return console.error(err);
//     } 
//     else{
//       res.status(200).json({
//           name : id,
//           message:"hurry up this item is in limited editions"

//       })
//     }

// })




router.patch('/product/:productId', (req, res, next) => {
    const id = req.params.productId
    const update = {};
    for(const ops of req.body){
        update[ops.propName] = ops.value;
    }
    Product.update({_id : id},{$set:update})
    .exec()
    .then(result=>{
        console.log(res);
        res.status(200).json(result)
    })
    .catch(err =>{
      console.log(err)
      res.status(500).json({
          error: err
      });
    })
});
router.delete('/product/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.remove({_id : id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err =>{
        res.status(500).json({
            error : err
        })
    })
    });


module.exports = router;