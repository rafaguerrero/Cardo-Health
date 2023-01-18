const Books = require('../../db/books');

module.exports = async function (req, res) {
    const hasBook = req.body.book;
    hasBook && Books.add(req.body.book);
    res.json({ added: !!hasBook });
};
