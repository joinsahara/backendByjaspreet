const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const checkAuth = require('../middleware/chack-auth');
const History = require("../models/history");

// dealing with /product with get request
router.get('/',checkAuth, (req, res, next) => {

    History.find()
        .select('User_id Product_Title Product_description Product_Type Vendor_id Visit_Date   ') // it will only show name, price and _id 
        .exec()
        .then(docs => {
            const response = {
                total_No_Of_Search: docs.length,
                history: docs.map(doc => {
                    return {
                        User_id: doc.User_id,
                        Product_Title: doc.Product_Title,
                        Product_Description: doc.Product_Description,
                        Product_Type: doc.Product_Type,
                        Vendor_id: doc.Vendor_id,
                        Visit_Date: doc.Visit_Date,

                        request: {
                            type: "Get",
                            Product_Url: "localhost/history/" + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})



// to post new history
router.post('/',checkAuth, (req, res, next) => {
// router.post('/', (req, res, next) => {

    const history = new History({
        // User_id: req.body.User_id,
        Product_Title: req.body.Product_Title,
        Product_Description: req.body.Product_Description,
        Product_Type: req.body.Product_Type,
        Vendor_id: req.body.Vendor_id,
        // Visit_Date: req.body.Visit_Date,

    })

    history.save((err, history) => {
        if (err) { return res.json({ error }) }
        res.status(201).json({
            message: "handling post request to /product",
            createdProduct: history,
            Product_Url: "localhost/history/" + history._id
        });
    })

});

// to get history info with particular id
router.get('/:historyId',checkAuth, (req, res, next) => {
    const id = req.params.historyId;
    History.findById(id)
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({

                User_id: docs.User_id,
                Product_Title: docs.Product_Title,
                Product_Description: docs.Product_Description,
                Product_Type: docs.Product_Type,
                Vendor_id: docs.Vendor_id,
                Visit_Date: docs.Visit_Date,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });

});





// to delete to particular product by id
router.delete('/:productId',checkAuth, (req, res, next) => {
    const id = req.params.productId
    History.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                deleted_data: result,
                url: "localhost/product/" 
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

// export of product module
module.exports = router;