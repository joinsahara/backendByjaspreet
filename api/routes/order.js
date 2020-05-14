const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');

const Order = require('../models/order')

router.get('/order',(req,res,next)=>{
   Order.find()
   .exec()
   .then()
   .then(docs => {
       console.log(docs);
       res.status(200).json(docs);
   })
   .catch(err =>{
       console.log(err);
       res.status(500).json({
           error: err
       })
   })
});
router.post('/order',(req,res,next)=>{
    const order = new Order({
        _id : new mongoose.Types.ObjectId(),
        product : req.body.product,
        quantity : req.body.quantity
    });
    order.save(function(err,order){
        if(err){
            return console.error(err);
            
        }
        else{
            return console.log("added into database")
        }
      

    });

    res.status(201).json({
        message : "we have accepted your orders",
        order : order
    });
});
router.get('/order/:orderId',(req,res,next)=>{
    res.status(200).json({
        message : "order Details",
        id : req.params.orderId
    });
});
router.delete('/order/:orderId',(req,res,next)=>{
    res.status(200).json({
        message : "order is terminated ",
        id : req.params.orderId

    });
});

module.exports = router;