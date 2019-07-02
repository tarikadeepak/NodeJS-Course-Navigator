module.exports = app => {
  const userModel = require('../models/user/user.model.server');

  findAllUsers = (req, res) =>
    userModel.findAllUsers()
    .then(users => {
        res.send(users);
      });

  login = (req, res) => {
  const user = req.body;
  console.log('User req ', req);
  console.log('User Details ', user);
  console.log('Now  ', user.username, user.password)
  userModel.findUserByCredentials(user.username, user.password)
    .then(user => {
      req.session['currentUser'] = user;
      res.send(req.session);
    });
};

currentUser = (req, res) =>
  res.send(req.session['currentUser']);

  app.post('/login', login)
  app.get('/api/user', findAllUsers)
  app.get('/currentuser', currentUser)
}