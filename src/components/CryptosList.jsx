import React from 'react';
import ListItem from '../components/ListItem';

const CryptosList = ({ store }) => {
  return (
    <>
      <div className="home-cryptos">
        <div className="width">
          <h2>{store.searched ? 'Search results' : 'Trending Coins'}</h2>
          <div className="home-cryptos-list">
            {store.coins.map((coin) => {
              return <ListItem key={coin.id} coin={coin} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptosList;
