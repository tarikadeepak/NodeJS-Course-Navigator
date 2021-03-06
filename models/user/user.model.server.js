const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');

var userModel = mongoose.model('UserModel', userSchema);

findAllUsers = () =>
    userModel.find();

findUserByCredentials = (username,password) =>{
    console.log('findUserByCredentials ', username , password);
    return userModel.findOne({username: username, password: password});
}
module.exports = {
    findAllUsers,
    findUserByCredentials
}