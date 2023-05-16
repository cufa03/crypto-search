import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import showStore from '../stores/showStore';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Header from '../components/Header';

const Show = () => {
  const store = showStore();
  const params = useParams();
  useEffect(() => {
    store.fetchData(params.id);
    return () => {
      store.reset();
    };
  }, []);
  return (
    <div>
      <Header back={true} />
      {store.dataRes && (
        <>
          <header className="show-header">
            <img src={store.dataRes.image.large} alt="" />
            <h2>
              {store.dataRes.name} ({store.dataRes.symbol})
            </h2>
          </header>
          <div className="width">
            <div className="show-graph">
              {/* The graph is from recharts.org (SimpleAreaChart) */}
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={store.graphData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="Price"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="show-details">
            <div className="width">
              <h2>Details</h2>
              <div className="show-details-row">
                <h3>Market cap rank</h3>
                <span>{store.dataRes.market_cap_rank}</span>
              </div>
              <div className="show-details-row">
                <h3>24h high</h3>
                <span>${store.dataRes.market_data.high_24h.usd}</span>
              </div>

              <div className="show-details-row">
                <h3>24h low</h3>
                <span>${store.dataRes.market_data.low_24h.usd}</span>
              </div>
              <div className="show-details-row">
                <h3>Circulating supply</h3>
                <span>${store.dataRes.market_data.circulating_supply}</span>
              </div>
              <div className="show-details-row">
                <h3>Current price</h3>
                <span>${store.dataRes.market_data.current_price.usd}</span>
              </div>
              <div className="show-details-row">
                <h3>1 year change</h3>
                <span>
                  $
                  {store.dataRes.market_data.price_change_percentage_1y.toFixed(
                    2
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Show;
