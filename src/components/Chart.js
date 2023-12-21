import React, { useContext, useState, useEffect } from 'react'
import Card from './Card';
import { converUnixTimestampToDate, convertDateToUnixTimestamp, createDate } from '../helpers/date-helper';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { chartConfig } from '../constants/config';
import ChartFilter from './ChartFilter';
import ThemeContext from '../context/ThemeContext';
import { fetchHistoricalData } from '../api/stock-api';
import StockContext from '../context/StockContext';

const Chart = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("1W");

const {darkMode} = useContext(ThemeContext);
const {stockSymbol} = useContext(StockContext);

useEffect(() => {
    const getDateRange = () => {
        const {days, weeks, months, years} = chartConfig[filter];

        const endDate = new Date();
        const startDate = createDate(endDate, -days, -weeks, -months, -years);

        const startTimeStampUnix = convertDateToUnixTimestamp(startDate)
        const endTimestampUnix = convertDateToUnixTimestamp(endDate);

        return (startTimeStampUnix, endTimestampUnix);
    };
    const updateChartData = async () => {
        try {
            const {startTimeStampUnix, endTimestampUnix} = getDateRange();
            const resolution = chartConfig[filter].resolution;
            const result = await fetchHistoricalData(stockSymbol, resolution, startTimeStampUnix, endTimestampUnix);
            setData(formatData(result));
        }
        catch(error) {
            setData([]);
            console.log(error);
        }
    };

    updateChartData();
}, [stockSymbol, filter]);


const formatData = (data) => {
    return data.c.map((item, index) => {
        return {
            value: item.toFixed(2),
            date: converUnixTimestampToDate(data.t[index]),
        };
    });
};

  return ( 
    <Card>
        <div className=' w-100 h-96 flex justify-center items-center'>
        <h1 className='text-xl text-justify'>sumpah disini harusnya ada graph and IT SHOULD BE WORKING JUKK CUMAN TERNYATA API KU HARUS PREMIUMMM AGHH sorryyy i promise i'll make you one sooner or later, ohiyaa search stock nya work kokk (di beberapa stock doang keknya, beberapa harus punya API premium juga deh rasanya..) coba test-test ajaaa. huuu maunya i buatin biar u enak ngeliat naiknya berapa etc tp ADUHHHHH SETAN KENAPA HARUS PREMIUM SIHHH MERUSAK SUASANA BGTTTT MANA MAHAL LAGI DUHHHHHHHH</h1>
        </div>
    {/* <ul className='flex absolute top-2 right-2 z-40'>
        {Object.keys(chartConfig).map((item) => (
            <li key={item}>
                <ChartFilter 
                text={item} 
                active={filter === item} 
                onClick={() => {
                    setFilter(item);
                }} 
                />
            </li>
        ))}
    </ul>
    <ResponsiveContainer>
        <AreaChart data={data}>
        <defs>
         <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
            <stop 
            offset="5%" 
            stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"} 
            stopOpacity={0.8}
            />
          <stop offset="95%" stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"} stopOpacity={0}/>
    </linearGradient>
  </defs>
            <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#312e81" 
            fillOpacity={1} 
            strokeWidth={0.5}
            fill='url(#chartColor)'
            />
            <Tooltip contentStyle={darkMode ? {backgroundColor: "#111827"} : null} itemStyle={darkMode ? {color: "#818cf8"} : null} />
            <XAxis dataKey={"date"} />
            <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
            </ResponsiveContainer> */}
  </Card>
  );
};

export default Chart