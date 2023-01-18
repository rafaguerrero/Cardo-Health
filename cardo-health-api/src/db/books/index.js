let BOOKS = [];

module.exports = {
    all: () => BOOKS,

    clear: () => (BOOKS = []),

    add: (book) => BOOKS.push(book),

    get: (isbn) => BOOKS.find((book) => book.isbn === isbn),

    delete: (isbn) => {
        BOOKS = BOOKS.filter((book) => book.isbn !== isbn);
    },

    update: (isbn, update) => {
        BOOKS = BOOKS.map((book) => {
            if (book.isbn === isbn) return Object.assign(book, update);
            return book;
        });
    }
};
