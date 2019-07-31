const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'client/build')))

var port = (process.env.VMC_APP_PORT || 3000)
var host = (process.env.VCAP_APP_HOST || 'localhost')

if(process.env.VCAP_SERVICES){
  var env = JSON.parse(process.env.VCAP_SERVICES);
  console.log('env ', env)
  var mongo = env['mlab'][0]['credentials'];
}
else{
  var mongo = {
    "hostname":"localhost",
    "port":27017,
    "username":"",
    "password":"",
    "name":"",
    "db":"webdev-course-db"
  }
}

console.log('mongo ', mongo)

var generate_mongo_url = function(obj){
  obj.hostname = (obj.hostname || 'localhost')
  obj.port = (obj.port || 27017)
  obj.db = (obj.db || 'webdev-course-db')

  if(obj.username && obj.password){
    return "mongodb://" + obj.username + ":" + obj.password + "@" + 
        obj.hostname + ":" + obj.port + "/" + obj.db
  }
  else{
    return "mongodb://" +  obj.hostname + ":" + obj.port + "/" + obj.db
  }
}

var mongourl = generate_mongo_url(mongo);
console.log('mongourl ', mongourl)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001" );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(session({ saveUninitilized: true,
    resave: false,
    secret: 'any string'
}));

// mongoose.connect('mongodb://localhost/california',
//   { useNewUrlParser: true })

mongoose.connect(mongourl,
  { useNewUrlParser: true })

require('./services/user.service.server')(app);
require('./services/file.service.server')(app);

app.listen(port,host)
console.log("Express server running on port %d in %s mode ", port, app.settings.env)