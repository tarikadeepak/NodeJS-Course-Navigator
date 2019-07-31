module.exports = app => {
  const userModel = require('../models/user/user.model.server');
  const fileModel = require('../models/file/file.model.server');

  findAllUsers = (req, res) =>
    userModel.findAllUsers()
    .then(users => {
        res.send(users);
      });

  login = (req, res) => {
  const user = req.body;
  console.log('User received ', user)
  userModel.findUserByCredentials(user.username, user.password)
    .then(user => {
      req.session['currentUser'] = user;
      console.log('User sent ', req.session.currentUser)
      res.send(req.session.currentUser);
    });
};

currentUser = (req, res) =>
  res.send(req.session['currentUser']);

  app.post('/login', login)
  app.get('/api/user', findAllUsers)
  app.get('/currentuser', currentUser)
}