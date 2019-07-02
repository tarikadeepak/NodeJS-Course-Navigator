const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    username : String,
    password : String,
    firstname : String,
    lastname : String,
    role : String
}, {collection: 'user'})