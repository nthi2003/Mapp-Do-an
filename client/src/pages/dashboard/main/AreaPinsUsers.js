import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useValue } from '../../../context/ContextProvider';

const months = 2;
const today = new Date();
const tempData = [];
for (let i = 0; i < months; i++) {
  const date = new Date(
    today.getFullYear(),
    today.getMonth() - (months - (i + 1))
  );
  tempData.push({
    date,
    name: moment(date).format('MMM YYYY'),
    users: 0,
    pins: 0,
  });
}

export default function AreaPinsUsers() {
  const {
    state: { pins, users },
  } = useValue();
  const [data, setData] = useState([]);

  useEffect(() => {
    for (let i = 0; i < months; i++) {
      tempData[i].users = 0;
    }
    users.forEach((user) => {
      for (let i = 0; i < months; i++) {
        if (moment(tempData[i].date).isSame(user?.createdAt, 'month'))
          return tempData[i].users++;
      }
    });
    setData([...tempData]);
  }, [users]);

  useEffect(() => {
    for (let i = 0; i < months; i++) {
      tempData[i].pins = 0;
    }
    pins.forEach((pin) => {
      for (let i = 0; i < months; i++) {    
        if (moment(tempData[i].date).isSame(pin?.createdAt, 'month'))
          return tempData[i].pins++;
      }
    });
    setData([...tempData]);
  }, [pins]);
  return (
    <div style={{ width: '100%', height: 300, minWidth: 250 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="users"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="pins"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}