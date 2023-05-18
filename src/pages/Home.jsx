// import classNames from 'classnames';
import React, { useEffect } from 'react';
import CryptosList from '../components/CryptosList';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import homeStore from '../stores/homeStore';
const Home = () => {
  const store = homeStore();
  useEffect(() => {
    if (store.trending.length === 0) store.fetchCoins();
  }, []);
  return (
    <div>
      <Header back={false} />
      <SearchBar store={store} />
      <CryptosList store={store} />
    </div>
  );
};

export default Home;
