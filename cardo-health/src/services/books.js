import { authAPI } from '../utils/api';

export const listBooks = async () => {
    return authAPI('books/list', {});
};

export const addBook = async (book) => {
    return authAPI('books/add', { book });
};

export const updateBook = async (isbn, update) => {
    return authAPI('books/update', { isbn, update });
};

export const deleteBook = async (isbn) => {
    return authAPI('books/delete', { isbn });
};
