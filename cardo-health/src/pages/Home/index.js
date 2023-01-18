import React from 'react';
import Header from '../../components/Header';
import List from '../../components/List';
import './styles.scss';

function Home() {
  return (
    <div className='page-home'>
      <Header />
      <List />
    </div>
  );
}

export default Home;
