const Books = require('../../db/books');

module.exports = async function (req, res) {
  res.json(Books.all());
};