module.exports = app => {
    const fileModel = require('../models/file/file.model.server');
  
    fileWrite = (req, res) =>
    fileModel.filewrite(req.body)
    .then(response => {
          res.send(response);
        });
  
    app.post('/api/write', fileWrite)
  }