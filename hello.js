const express = require('express')
const app = express()
 
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/webdev-data')

const session = require('express-session')
app.use(session({
    resave: false,
    saveUninitilized: true,
    secret: 'any string'
}));


setSession = (req, res) => {
    var n = req.param['name'];
    var v = req.param['value'];
    req.session[n] = v;
    res.send(req.session)
}

getSession = (req, res) => {
    var n = req.param['name'];
    var v = req.session[n];
    res.send(v);
}

app.get('api/session/set/:name/:value', setSession);
app.get('api/session/get/:name/', getSession);

var userSchema = mongoose.Schema({
    userName : String,
    password : String,
    firstName : String,
    lastName : String,
    role : String
}, {collection: 'user'})

var userModel = mongoose.model('UserModel', userSchema)

app.get('/api/users', findAllUsers);

function findAllUsers(req,res) {
    userModel.find()
        .then(function(users){
            res.send(users)
        })
}
app.get('/hello', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)