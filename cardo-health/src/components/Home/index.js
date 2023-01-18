import React, { useState, useEffect } from 'react';
import Header from '../Header';
import { addBook, listBooks } from '../../services/books';
import './styles.scss';

const addRandomly = (updates, setUpdates) => {
  const book = {
    title: "Random",
    isbn: Math.random(),
    author: "HOLA"
  }

  addBook(book).then(() => setUpdates(updates + 1));
}

function Home() {
  const [updates, setUpdates] = useState(0);
  const [list, setList] = useState([]);

  useEffect(() => listBooks().then(setList), [updates])

  return (
    <div className='page-list'>
      <Header />
      
      <div className='page-list-content'>

        { list.map(book => {
          return <h2 key={book.isbn}>{book.title}</h2>
        }) }
        
        <div onClick={() => addRandomly(updates, setUpdates)}>
          Add
        </div>
      </div>
    </div>
  );
}

export default Home;
