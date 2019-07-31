const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    appname : String,
    key : []
}, {collection: 'param'})