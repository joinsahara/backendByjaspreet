const mongoose = require('mongoose');
const externalSchema = mongoose.Schema({
    _id :mongoose.Schema.Types.ObjectId})


module.exports = mongoose.model('Order',externalSchema)