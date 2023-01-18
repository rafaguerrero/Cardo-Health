const Books = require('./index.js');

describe('DBS BOOKS', () => {
    afterEach(async () => oldBOOKS = Books.clear());

    describe('Add', () => {
        it('Add book', () => {
            const book = { title: 'Name1', isbn: '1234', author: 'Author' };

            expect(Books.all().length).toBe(0);
            
            Books.add(book);

            const all = Books.all();
            expect(all.length).toBe(1);
            expect(all[0]).toEqual(book);
        });
    });

    describe('All', () => {
        it('0 books by default', () => {
            expect(Books.all()).toEqual([]);
        });
        
        it('Gives all books', () => {
            const book1 = { title: 'Name1', isbn: '1234', author: 'Author' };
            const book2 = { title: 'Name2', isbn: '1234', author: 'Author' };

            Books.add(book1);
            Books.add(book2);

            expect(Books.all().length).toBe(2);
            expect(Books.all()).toEqual([ book1, book2 ]);
        });
    });

    describe('Delete', () => {
        beforeEach(() => {
            const book = { title: 'Name1', isbn: '1234', author: 'Author' };

            expect(Books.all().length).toBe(0);
            
            Books.add(book);

            const all = Books.all();
            expect(all.length).toBe(1);
            expect(all[0]).toEqual(book);
        })

        it('Deletes a book given a isbn', () => {
            Books.delete('1234');

            expect(Books.all().length).toBe(0);
        });

        it('Doesn\'t delete anything is isbn can\'t be found', () => {
            Books.delete('11231234');

            expect(Books.all().length).toBe(1);
        });
    });

    describe('Update', () => {
        beforeEach(() => {
            Books.add({ title: 'Name1', isbn: '1234', author: 'Author' });
        })

        it('Updates a book given a isbn', () => {
            Books.update('1234', { title: 'Name2', isbn: '541' });

            expect(Books.all()[0]).toEqual({ title: 'Name2', isbn: '541', author: 'Author' });
        });

        it('Doesn\'t update anything is isbn can\'t be found', () => {
            Books.update('11231234', { title: 'Name3' });

            expect(Books.all()[0]).toEqual({ title: 'Name1', isbn: '1234', author: 'Author' });
        });
    });
});