const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Product_Name: {type: String, required: true},
    Vendor_id :{type: Number, required: true},
    Product_Title :{type: String, required: true},
    Product_Description :{type: String, required: true},
    Product_Type :{type: String, required: true},
    // Product_Url:{type: String, required: true}
    
});

module.exports = mongoose.model('product', productSchema);