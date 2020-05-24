const mongoose = require('mongoose');
const vendorSchema = mongoose.Schema({
    Vendor_id: mongoose.Schema.Types.ObjectId,
    Vendor_Name: { type: String, required: true }


});

module.exports = mongoose.model('vendor', vendorSchema);