module.exports = app => {
    const fileModel = require('../models/file/file.model.server');
  
    fileWrite = (req, res) =>
    fileModel.filewrite(req.body)
    .then((response) => {
          res.send(response);
        });

    var checkData = function (data, res) {
        console.log('check', data);
        return new Promise(function(resolve, reject) {
            resolve(data);
           })
        res.send(data);
    }

    findParam = (req, res) =>
    fileModel.findparam()
    .then(param => {
        console.log('Param ', param)
        res.send(param);
      });

    findInfoInApp3 = (req, res) => {
      const user = req.body;
      fileModel.findUserInApp3(user.polnbr, user.phone)
        .then(user => {
          console.log('User sent ', user)
          res.send(user);
        });
    };

    app.post('/api/write', fileWrite)
    app.get('/api/param', findParam)
    app.post('/api/info', findInfoInApp3)
    
  }