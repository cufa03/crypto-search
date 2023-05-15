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
} from 'recharts';

const Show = () => {
  const store = showStore();
  const params = useParams();
  useEffect(() => {
    store.fetchData(params.id);
  }, []);
  if (store.dataRes.length === 0) return <></>;
  return (
    <div>
      <header>
        <img src={store.dataRes.image.large} alt="" />
        <h2>
          {store.dataRes.name} ({store.dataRes.symbol})
        </h2>
      </header>
      <AreaChart
        width={500}
        height={400}
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
        <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </div>
  );
};

export default Show;
