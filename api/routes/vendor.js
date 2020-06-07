const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const Vendor = require("../models/vendor");

// dealing with /product with get request
router.get('/', (req, res, next) => {

    Vendor.find()
        .select(' Vendor_id Vendor_Name ') // it will only show name, price and _id 
        .exec()
        .then(docs => {
            const response = {
                total_No_Of_Vendors: docs.length,
                vendors: docs.map(doc => {
                    return {
                        Vendor_Name: doc.Vendor_Name,
                        Vendor_id: doc.Vendor_id,
                        
                        
                        request: {
                            type: "Get",
                            Vendor_Url: "localhost/vendor/" + doc._id
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
router.post('/', (req, res, next) => {

    const vendor = new Vendor({
     
     Vendor_Name: req.body.Vendor_Name
    
    })

    vendor.save( (err, vendor)=> {
        if (err){ return res.json({error})}



        res.status(201).json({
            message: "handling post request to /product",
            createdVendor: vendor,
            CompleteIfo: "localhost/vendor/" +vendor._id
        });
    })
     
});
// to get product info with particular id
router.get('/:vendorId', (req, res, next) => {
    const id = req.params.vendorId;
    Vendor.findById(id)
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                Vendor_Name: docs.Vendor_Name
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });

});


//to update the particular product
router.patch('/:vendorId', async (req, res, next) => {
   try{
       const updatedVendor = await Vendor.updateOne(
           {_id: req.params.vendorId},
           {$set:{Vendor_Name : req.body.Vendor_Name }}
       )
       res.status(200).json({
        updated_data: updatedVendor,
        url: "localhost/vendor/" + updatedVendor._id
   })
    }catch(err ) {
        console.log(err)
        res.status(500).json({
            error: err
        });
    }
    
})

// to delete to particular product by id
router.delete('/:vendorId', (req, res, next) => {
    const id = req.params.vendorId
    Vendor.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                deleted_data: result,
                url: "localhost/vendor/" 
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