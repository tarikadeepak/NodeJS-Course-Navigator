const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    polnbr : String,
    phone : String
}, {collection: 'app3'})