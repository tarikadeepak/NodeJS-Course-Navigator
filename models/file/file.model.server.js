const fs = require('fs');
const mongoose = require('mongoose');
const paramSchema = require('./param.schema.server');
var paramModel = mongoose.model('ParamModel', paramSchema);
const app3Schema = require('./app3.schema.server');
var app3Model = mongoose.model('App3Model', app3Schema);

findparam = () =>
    paramModel.find();

filewrite = (policy) => {
  console.log('Data in Policy ', JSON.stringify(policy))
  fs.writeFile('PolicyCopyData.txt', JSON.stringify(policy), function (err) {
    if (err) throw err;
    console.log('Saved!');
  })
  return policy
}

findUserInApp3 = (polnbr,phone) =>{
  return app3Model.findOne({polnbr: polnbr, phone: phone});
}


module.exports = {
  filewrite,
  findparam,
  findUserInApp3
}