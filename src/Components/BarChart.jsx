import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    uv: 7000,
    pv: 6400,
    amt: 2400,
  },
  {
    uv: 7000,
    pv: 9998,
    amt: 2210,
  },
  {
    uv: 5000,
    pv: 9800,
    amt: 2290,
  },
  {
    uv: 8980,
    pv: 7908,
    amt: 2000,
  },
  {
    uv: 9890,
    pv: 7800,
    amt: 2181,
  },
  {
    uv: 5390,
    pv: 9800,
    amt: 2500,
  },
  {
    uv: 8980,
    pv: 6908,
    amt: 2000,
  },
];

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={50} height={300} data={data}>
          <XAxis dataKey="name" hide /> {/* Hide XAxis labels */}
          <YAxis hide /> {/* Hide YAxis labels */}
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
