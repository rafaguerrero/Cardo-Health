const Books = require('../../db/books');

module.exports = async function (req, res) {
    const { isbn, update } = req.body;

    if (update.isbn && update.isbn !== isbn && Books.get(update.isbn)) {
        return res.json({ duplicated: true });
    } else if (Books.get(isbn)) {
        Books.update(isbn, update);
        return res.json({ update: true });
    } else {
        Books.add(update);
        return res.json({ create: true });
    }
};
