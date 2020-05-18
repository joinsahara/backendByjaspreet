const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');
// dealing with /order  get request to see all the orders made by user 
router.get('/order', (req, res, next) => {
    Order.find()
        .select('product quantity _id')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            urls: 'http://localhost/order/' + doc._id
                        }
                    }
                }),

            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});
// to handle with /order post request to post the new order 
router.post('/order', (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "product not found"
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save();
        })
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "order created",
                createdOrder: {
                    _id: result._id,
                    quantity: result.quantity,
                    product: result.product
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost/order/' + result._id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "product not found",
                error: err
            });
        });
});
// to see order having dedicated _id

router.get('/order/:orderId', (req, res, next) => {

    Order.findById(req.params.orderId)
        .exec()
        .then(order => {
            if (!order) {
                res.status(404).json({
                    message: " order not found"
                });
            }
            res.status(200).json({
                order: order,
                request: {

                    type: 'GET',
                    url: 'http://localhost/order/'

                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

});
// to delete the order
router.delete('/order/:orderId', (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order deleted',
                result: {
                    type: 'POST',
                    url: " http://localhost/order/",
                    body : {productId : "ID", quantity : "Number" }
                }
            })


        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

});

module.exports = router;