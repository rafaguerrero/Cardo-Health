import React, { useState } from 'react';
import { deleteBook, updateBook } from '../../services/books';
import TextInput from '../TextInput';
import './styles.scss';

const updateValue = (update, key, value) => {
  return Object.assign({}, update, { [key]: value })
}

const renderEditBook = (book, update, setUpdate) => {
  const updatedBook = Object.assign({}, book, update);

  return <>
    <TextInput name="Title" value={ updatedBook.title } onChange={(value) => setUpdate(updateValue(update, 'title', value))}/>
    <TextInput name="ISBN" value={ updatedBook.isbn } onChange={(value) => setUpdate(updateValue(update, 'isbn', value))}/>
    <TextInput name="Author" value={ updatedBook.author } onChange={(value) => setUpdate(updateValue(update, 'author', value))}/>
  </>
}

const renderBook = (book) => {
  return <>
    <p><b>Name: </b>{ book.title }</p>
    <p><b>ISBN: </b>{ book.isbn }</p>
    <p><b>Author: </b>{ book.author }</p>
  </>
}

const canSaveData = (book, update) => {
  return Object.keys(update).length > 0 &&
          !('isbn' in update && !update.isbn) && 
          !(!book.isbn && !update.isbn);
}

function Book({ book, onChange }) {
  const [update, setUpdate] = useState({});
  const [isEdit, setIsEdit] = useState(!book.isbn);
  const [isLoading, setIsLoading] = useState(false);

  return <div className='comp-book'>
    { isLoading && <div>Saving...</div>}
    { !isLoading && <>
      <div className='comp-book-wrapper'>
        <img src="/assets/book.png" alt="book"/>
        <div className='comp-book-text'>
          { isEdit ? renderEditBook(book, update, setUpdate) : renderBook(book) }
        </div>
      </div>

      <div className='comp-book-actions'>
        <button className="comp-book-btn comp-book-delete"
                onClick={() => {
                  setIsLoading(true);

                  deleteBook(book.isbn)
                      .then(onChange)
                }}>
          Delete
        </button>

        { book.isbn && <button className="comp-book-btn comp-book-edit"
                onClick={() => {
                  setIsEdit(!isEdit);
                  setUpdate({});
                }}>
          { isEdit ? 'Cancel' : 'Edit' }
        </button>
        }

        {
          isEdit && <button className="comp-book-btn comp-book-save"
                            onClick={() => {
                              setIsLoading(true);

                              updateBook(book.isbn, update)
                                  .then((data) => {
                                    if(data.duplicated) window.alert("This isbn is already in use");
                                  })
                                  .then(() => setIsLoading(false))
                                  .then(() => setIsEdit(false))
                                  .then(onChange)
                            }}
                            disabled={!canSaveData(book, update)}>
            Save
          </button>
        }
      </div>
    </>}

  </div>;
}

export default Book;
