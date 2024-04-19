import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MultiAxisLineChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    fetchMonthlyTransactionsData();
  }, []);

  const fetchMonthlyTransactionsData = async () => {
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      const currentDay = currentDate.getDate();
      const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

      const validResponse = await axios.get(`http://localhost:8080/recon/validMonthlyTransactions?month=${currentMonth}&fileType=payment`);
      const invalidResponse = await axios.get(`http://localhost:8080/recon/invalidMonthlyTransactions?month=${currentMonth}&fileType=payment`);
      const unreconciledResponse = await axios.get(`http://localhost:8080/recon/unreconciledMonthlyTransactions?month=${currentMonth}&fileType=payment`);
      const reconciledResponse = await axios.get(`http://localhost:8080/recon/reconciledMonthlyTransactions?month=${currentMonth}&fileType=payment`);

      
      const validData = validResponse.data;
      const invalidData = invalidResponse.data;
      const unreconciledData = unreconciledResponse.data;
      const reconciledData = reconciledResponse.data;

      console.log(currentMonth,currentDay);
      const data = [];
      for (let i = 1; i <= daysInMonth; i += 6) {
        const labels = `${currentMonth}/${i}`.toString();
        setLabels(labels);
        if (i <= currentDay && i + 5 >= currentDay) {
            data.push({
                name: labels, // Convert to string to avoid NaN
                valid: validData,
                invalid: invalidData,
                unreconciled: unreconciledData,
                reconciled: reconciledData,
            });
        } else {
            data.push({
                name: labels, // Convert to string to avoid NaN
                valid: 0,
                invalid: 0,
                unreconciled: 0,
                reconciled: 0,
            });
        }
    }
    
    
     
      setMonthlyData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      {/* {monthlyData.length > 0 && ( // Conditionally render the chart when data is available */}
        <LineChart
          width={600}
          height={300}
          data={monthlyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <XAxis dataKey="name" orientation="bottom" />
          {/* <YAxis yAxisId="left" /> */}
          <YAxis yAxisId="right"/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="valid" stroke="#8884d8" yAxisId="right" />
          <Line type="monotone" dataKey="reconciled" stroke="#82ca9d" yAxisId="right" />
          <Line type="monotone" dataKey="unreconciled" stroke="#ffc658" yAxisId="right" />
          <Line type="monotone" dataKey="invalid" stroke="#ff0000" yAxisId="right" />
        </LineChart>
      {/* )} */}

      
      <LineChart
          width={600}
          height={300}
          data={monthlyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <XAxis dataKey="name" orientation="bottom" />
          {/* <YAxis yAxisId="left" /> */}
          <YAxis yAxisId="right"/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="valid" stroke="#8884d8" yAxisId="right" />
          <Line type="monotone" dataKey="reconciled" stroke="#82ca9d" yAxisId="right" />
          <Line type="monotone" dataKey="unreconciled" stroke="#ffc658" yAxisId="right" />
          <Line type="monotone" dataKey="invalid" stroke="#ff0000" yAxisId="right" />
        </LineChart>
    </>
  );
};

export default MultiAxisLineChart;
