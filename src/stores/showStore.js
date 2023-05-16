import axios from 'axios';
import { create } from 'zustand';

const showStore = create((set) => ({
  graphData: [],
  dataRes: null,
  reset: () => {
    set({ graphData: [], dataRes: null });
  },
  fetchData: async (id) => {
    const [graphRes, dataRes] = await Promise.all([
      axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365`
      ),
      axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`
      ),
    ]);

    const graphData = graphRes.data.prices.map((price) => {
      const [timeStamp, p] = price;
      const date = new Date(timeStamp).toLocaleDateString('en-us');
      return {
        date: date,
        Price: p,
      };
    });
    set({ graphData: graphData });
    set({ dataRes: dataRes.data });
  },
}));
export default showStore;
