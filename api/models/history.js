const mongoose = require('mongoose');
const historySchema = mongoose.Schema({
    User_id: mongoose.Schema.Types.ObjectId,
    Product_Title :{type: String, required: true},
    Product_Description :{type: String, required: true},
    Product_Type :{type: String, required: true},
    Vendor_id :{type: Number, required: true},
    
    Visit_Date: {type: Date, required: true}
    
    
});

module.exports = mongoose.model('history', historySchema);