const Users = require('../../db/users');
const bcrypt = require('bcrypt');

module.exports = async function (req, res) {
  const token = await Users.auth(req.body.user);

  res.json(token);
};