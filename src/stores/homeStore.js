import axios from 'axios';
import { create } from 'zustand';
import debounce from '../helpers/debounce';

const homeStore = create((set) => ({
  coins: [],
  trending: [],
  query: '',

  setQuery: (e) => {
    set({ query: e.target.value });
    homeStore.getState().searchCoins();
  },
  searchCoins: debounce(async () => {
    // here I'm searching for coins with a specific name
    // and seting to the state that searched coins
    // when the user delete the query then the trending coins shows again
    const { query, trending } = homeStore.getState();
    if (query.length > 2) {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      const coins = res.data.coins.map((coin) => {
        return {
          name: coin.name,
          image: coin.large,
          id: coin.id,
        };
      });
      set({ coins: coins });
    } else {
      set({ coins: trending });
    }
  }, 400),

  fetchCoins: async () => {
    const res = await axios.get(
      'https://api.coingecko.com/api/v3/search/trending'
    );
    // I create an array of coins just with the info that I want and
    // then set that array to the coin state
    const coins = res.data.coins.map((coin) => {
      return {
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        priceBtc: coin.item.price_btc,
      };
    });
    set({ trending: coins, coins: coins });
  },
}));
export default homeStore;
