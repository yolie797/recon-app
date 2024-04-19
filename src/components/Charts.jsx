import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Charts() {
    const [validTransactions, setValidTransactions] = useState([]);
    const [invalidTransactions, setInvalidTransactions] = useState([]);
    const [markoffValidTransactions, setMarkoffValidTransactions] = useState([]);
    const [markoffInvalidTransactions, setMarkoffInvalidTransactions] = useState([]);
    const [settlementValidTransactions, setSettlementValidTransactions] = useState([]);
    const [settlementInvalidTransactions, setSettlementInvalidTransactions] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        try{
         getPaymentDoughnutChartData();
        getMarkoffDoughnutChartData();
        getSettlementDoughnutChartData();
        } catch (error) {
            console.error("Error fetching doughnut chart data:", error);
        }
        
    }, []);

    useEffect(() => {
        try{
            if (validTransactions.length > 0 && invalidTransactions.length > 0 && 
                markoffValidTransactions.length > 0 && markoffInvalidTransactions.length > 0 &&
                settlementValidTransactions.length > 0 && settlementInvalidTransactions.length > 0) {
                navigate('/end-of-day', { state: { 
                    validTransactions, invalidTransactions, 
                    markoffValidTransactions, markoffInvalidTransactions, 
                    settlementValidTransactions, settlementInvalidTransactions 
                } });
            }
         } catch (error) {
                console.error("Error fetching doughnut chart data:", error);
            }
        
    }, [validTransactions, invalidTransactions, markoffValidTransactions, markoffInvalidTransactions, settlementValidTransactions, settlementInvalidTransactions]);

    const getPaymentDoughnutChartData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/recon/validTransactionsCount?fileType=payment');
            setValidTransactions(response.data);
            const response2 = await axios.get('http://localhost:8080/recon/invalidTransactionsCount?fileType=payment');
            setInvalidTransactions(response2.data);
        } catch (error) {
            console.error("Error fetching payment doughnut chart data:", error);
        }
    }

    const getMarkoffDoughnutChartData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/recon/validTransactionsCount?fileType=markoff');
            setMarkoffValidTransactions(response.data);
            const response2 = await axios.get('http://localhost:8080/recon/invalidTransactionsCount?fileType=markoff');
            setMarkoffInvalidTransactions(response2.data);
        } catch (error) {
            console.error("Error fetching markoff doughnut chart data:", error);
        }
    }

    const getSettlementDoughnutChartData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/recon/validTransactionsCount?fileType=settlement');
            setSettlementValidTransactions(response.data);
            const response2 = await axios.get('http://localhost:8080/recon/invalidTransactionsCount?fileType=settlement');
            setSettlementInvalidTransactions(response2.data);
        } catch (error) {
            console.error("Error fetching settlement doughnut chart data:", error);
        }
    }

    return (
        <div className="flex justify-between space-x-8">
            <div className="w-1/3 shadow-lg bg-white p-3 rounded-lg border border-deepMidnight">
    <h2 className="text-xl font-semibold mb-4 text-deepMidnight">Latest Payment volumes</h2>
    <div style={{width: '100%', height: '200px'}}> 
        <Doughnut 
            data={{
                labels: ["Valid", "Invalid", "Duplicate"],
                datasets: [
                    {
                        data: [validTransactions, invalidTransactions, 0],
                        backgroundColor: [
                            'rgb(180, 229, 36)',
                            'rgb(153, 27, 27)',
                            'rgb(2, 40, 64)'
                        ]
                    }
                ]
            }}
            options={{
                maintainAspectRatio: false
            }}
        />
    </div>
    <button onClick={() => {window.location.href = '/view-all';}} className="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-bold text-sm py-1 px-2 rounded mt-2">
        View All
    </button>            
</div>

            <div className="w-1/3 shadow-lg bg-white p-3 rounded-lg border border-deepMidnight">
    <h2 className="text-xl font-semibold mb-4 text-deepMidnight">Latest Markoff volumes</h2>
    <div style={{width: '100%', height: '200px'}}>
        <Doughnut
            data={{
                labels: ["Valid", "Invalid", "Duplicate"],
                datasets: [
                    {
                        data: [markoffValidTransactions, markoffInvalidTransactions, 0],
                        backgroundColor: [
                            'rgb(180, 229, 36)',
                            'rgb(153, 27, 27)',
                            'rgb(2, 40, 64)'
                        ]
                    }
                ]
            }}
            options={{
                maintainAspectRatio: false
            }}
        />
    </div>
    <button onClick={() => {window.location.href = '/view-all';}} className="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-bold text-sm py-1 px-2 rounded mt-2">
        View All
    </button>   
</div>

<div className="w-1/3 shadow-lg bg-white p-3 rounded-lg border border-deepMidnight">
    <h2 className="text-xl font-semibold mb-4 text-deepMidnight">Latest Settlement volumes</h2>
    <div style={{width: '100%', height: '200px'}}>
        <Doughnut
            data={{
                labels: ["Valid", "Invalid", "Duplicate"],
                datasets: [
                    {
                        data: [settlementValidTransactions, settlementInvalidTransactions, 0],
                        backgroundColor: [
                            'rgb(180, 229, 36)',
                            'rgb(153, 27, 27)',
                            'rgb(2, 40, 64)'
                        ]
                    }
                ]
            }}
            options={{
                maintainAspectRatio: false
            }}
        />
    </div>
    <button onClick={() => {window.location.href = '/view-all';}} className="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-bold text-sm py-1 px-2 rounded mt-2">
        View All
    </button>            
</div>

        </div>
    );
}
