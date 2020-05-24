const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const Product = require("../models/product");

// dealing with /product with get request
router.get('/product', (req, res, next) => {

    Product.find()
        .select('Product_id Product_Name Vendor_id Product_Title Product_description Product_Type') // it will only show name, price and _id 
        .exec()
        .then(docs => {
            const response = {
                total_No_Of_Items: docs.length,
                product: docs.map(doc => {
                    return {
                        Product_Name: doc.Product_Name,
                        Vendor_id: doc.Vendor_id,
                        Product_Title: doc.Product_Title,
                        Product_Description: doc.Product_Description,
                        Product_Type: doc.Product_Type,
                        // Product_Url: doc.Product_Url,
                        // // price:doc.price,
                        Product_id: doc.Product_id,
                        request: {
                            type: "Get",
                            Product_Url: "localhost/product/" + doc._id
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
//to post new product
router.post('/product', (req, res, next) => {

    const product = new Product({
        Product_id: new mongoose.Types.ObjectId(),
        Product_Name: req.body.Product_Name,
        Vendor_id: req.body.Vendor_id,
        Product_Title: req.body.Product_Title,
        Product_Description: req.body.Product_Description,
        Product_Type: req.body.Product_Type
        // Product_Url : req.body.url,
        // Product_id: new mongoose.Types.ObjectId(),
        // Product_Name: "hello",
        // Vendor_id: 123,                     testing
        // Product_Title: "car",
        // Product_Description: "good car",
        // Product_Type: "good"
    })

    product.save( (err, product)=> {
        if (err){ return res.json({error})}



        res.status(201).json({
            message: "handling post request to /product",
            createdProduct: product,
            CompleteIfo: "localhost/product/" +product.Product._id
        });
    })
     
});
// to get product info with particular id
router.get('/product/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                Product_id: docs.Product_id,
                Product_Name: docs.Product_Name,
                Vendor_id: docs.Vendor_id,
                Product_Title: docs.Product_Title,
                Product_Description: docs.Product_Description,
                Product_Type: docs.Product_Type,
                


                
               
            });
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
    for (const ops of req.body) {
        update[ops.propName] = ops.value;
    }
    Product.update({ Product_id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(res);
            res.status(200).json({
                updated_data: result,
                url: "localhost/product/" + result._id
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        })
});


// to delete to particular product by id
router.delete('/product/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.remove({ Product_id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                deleted_data: result,
                url: "localhost/product/" + result._id
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