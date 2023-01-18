const Books = require('../../db/books');

module.exports = async function (req, res) {
  Books.delete(req.body.isbn)
  res.json({ delete : true });
};