import React, { useState, useEffect } from 'react';
import { addBook, listBooks } from '../../services/books';
import Book from '../Book';
import './styles.scss';

const addRandomly = (updates, setUpdates) => {
    const book = {
        title: '',
        isbn: '',
        author: ''
    };

    addBook(book).then(() => setUpdates(updates + 1));
};

function List() {
    const [updates, setUpdates] = useState(0);
    const [list, setList] = useState([]);

    useEffect(() => {
        listBooks().then(setList);
    }, [updates]);

    return (
        <div className="comp-list">
            {list.map((book) => (
                <Book
                    key={book.isbn}
                    book={book}
                    onChange={() => setUpdates(updates + 1)}
                />
            ))}

            <button
                className="comp-list-add"
                disabled={list.some((book) => !book.isbn)}
                onClick={() => addRandomly(updates, setUpdates)}
            >
                Add
            </button>
        </div>
    );
}

export default List;
