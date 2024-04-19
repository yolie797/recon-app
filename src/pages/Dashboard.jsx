    import React, { useEffect , useState} from "react";
    import Sidebar from "../components/Sidebar";

    import { Doughnut, Bar } from "react-chartjs-2";
    import axios from 'axios';
    import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
 

    export default function Dashboard(){
        const [validTransactions, setValidTransactions] = useState([]);
        const [invalidTransactions, setInvalidTransactions] = useState([]);
        const [unreconciledTransactions, setUnreconciledTransactions] = useState([]);
        const [totalTransactions, setTotalTransactions] = useState([]);
        const [reconciledTransactions, setReconciledTransactions] = useState([]);


        const [validTransactionsValue, setValidTransactionsValue] = useState([]);
        const [invalidTransactionsValue, setInvalidTransactionsValue] = useState([]);
        const [unreconciledTransactionsValue, setUnreconciledTransactionsValue] = useState([]);
        const [totalTransactionsValue, setTotalTransactionsValue] = useState([]);
        const [reconciledTransactionsValue, setReconciledTransactionsValue] = useState([]);

        const [absaPayments, setAbsaPayments] = useState([]);
        const [nedbankPayments, setNedbankPayments] = useState([]);
        const [autoeftPayments, setautoeftPayments] = useState([]);

        const [monthlyData, setMonthlyData] = useState([]);
        const [monthlyValue, setMonthlyValue] = useState([]);
        const [annualData , setAnnualData] = useState([]);
        const [annualValue, setAnnualValue] = useState([]);

        const [labels, setLabels] = useState([]);
        const [dateInputValue, setDateInputValue] = useState('');

        useEffect(() => {
            try{
                fetchTransactionsData();
                fetchMonthlyTransactionsData();
                fetchAnnualTransactionsData();

            const currentDate = new Date().toISOString().split('T')[0];
            setDateInputValue(currentDate);
            } catch (error) {
                console.error("Error fetching transactions data:", error);
            }
        }, []);

        const fetchTransactionsData = async () => {
            try {
                const valid = await axios.get('http://localhost:8080/recon/validTransactionsCount?fileType=payment');
                setValidTransactions(valid.data);
        
                const invalid = await axios.get('http://localhost:8080/recon/invalidTransactionsCount?fileType=payment');
                setInvalidTransactions(invalid.data);
        
                const unreconciled = await axios.get('http://localhost:8080/recon/unreconciledTransactionsCount?fileType=payment');
                setUnreconciledTransactions(unreconciled.data);
        
                const total = await axios.get('http://localhost:8080/recon/transactionsCount?fileType=payment');
                setTotalTransactions(total.data);
        
                const reconciled = await axios.get('http://localhost:8080/recon/reconciledTransactionsCount?fileType=payment');
                setReconciledTransactions(reconciled.data);

                const validValue = await axios.get('http://localhost:8080/recon/validTransactionsValue?fileType=payment');
                setValidTransactionsValue(validValue.data);
        
                const invalidValue = await axios.get('http://localhost:8080/recon/invalidTransactionsValue?fileType=payment');
                setInvalidTransactionsValue(invalidValue.data);
        
                const unreconciledValue = await axios.get('http://localhost:8080/recon/unreconciledTransactionsValue?fileType=payment');
                setUnreconciledTransactionsValue(unreconciledValue.data);
        
                const totalValue = await axios.get('http://localhost:8080/recon/transactionsValue?fileType=payment');
                setTotalTransactionsValue(totalValue.data);
        
                const reconciledValue = await axios.get('http://localhost:8080/recon/reconciledTransactionsValue?fileType=payment');
                setReconciledTransactionsValue(reconciledValue.data);

                const absa = await axios.get('http://localhost:8080/recon/institutionPayments?institution=absa');
                setAbsaPayments(absa.data);

                const nedbank = await axios.get('http://localhost:8080/recon/institutionPayments?institution=nedbank');
                setNedbankPayments(nedbank.data);
                
                const autoeft = await axios.get('http://localhost:8080/recon/institutionPayments?institution=autoeft');
                setautoeftPayments(autoeft.data);


            }catch (error) {
                console.error('Error fetching transactions data:', error);
            }
        }; 
        const fetchMonthlyTransactionsData = async () => {
            try {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear();
            const currentDay = currentDate.getDate();
            const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

            //transaction for records    
            const validResponse = await axios.get(`http://localhost:8080/recon/validMonthlyTransactions?month=${currentMonth}&fileType=payment`);
            const invalidResponse = await axios.get(`http://localhost:8080/recon/invalidMonthlyTransactions?month=${currentMonth}&fileType=payment`);
            const unreconciledResponse = await axios.get(`http://localhost:8080/recon/unreconciledMonthlyTransactions?month=${currentMonth}&fileType=payment`);
            const reconciledResponse = await axios.get(`http://localhost:8080/recon/reconciledMonthlyTransactions?month=${currentMonth}&fileType=payment`);
            //value
            const validValueResponse = await axios.get(`http://localhost:8080/recon/validMonthlyTransactionsValue?month=${currentMonth}&fileType=payment`);
            const invalidValueResponse = await axios.get(`http://localhost:8080/recon/invalidMonthlyTransactionsValue?month=${currentMonth}&fileType=payment`);
            const unreconciledValueResponse = await axios.get(`http://localhost:8080/recon/unreconciledMonthlyTransactionsValue?month=${currentMonth}&fileType=payment`);
            const reconciledValueResponse = await axios.get(`http://localhost:8080/recon/reconciledMonthlyTransactionsValue?month=${currentMonth}&fileType=payment`);
        
            
            const validData = validResponse.data;
            const invalidData = invalidResponse.data;
            const unreconciledData = unreconciledResponse.data;
            const reconciledData = reconciledResponse.data;

            const validValueData = validValueResponse.data;
            const invalidValueData = invalidValueResponse.data;
            const unreconciledValueData = unreconciledValueResponse.data;
            const reconciledValueData = reconciledValueResponse.data;
        
           
            const data = [];
            const values = [];
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
            //values
            for (let i = 1; i <= daysInMonth; i += 6) {
                const labels = `${currentMonth}/${i}`.toString();
                setLabels(labels);
                if (i <= currentDay && i + 5 >= currentDay) {
                    values.push({
                        name: labels, // Convert to string to avoid NaN
                        validValue: validValueData,
                        invalidValue: invalidValueData,
                        unreconciledValue: unreconciledValueData,
                        reconciledValue: reconciledValueData,
                    });
                } else {
                    values.push({
                        name: labels, // Convert to string to avoid NaN
                        validValue: 0,
                        invalidValue: 0,
                        unreconciledValue: 0,
                        reconciledValue: 0,
                    });
                }
            }
            
            
            
            setMonthlyData(data);
            setMonthlyValue(values);
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        };

        const fetchAnnualTransactionsData = async () => {
            try {
                const currentDate = new Date();
                const currentMonth = currentDate.getMonth() + 1;
                const currentYear = currentDate.getFullYear();
                const currentDay = currentDate.getDate();
                const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
                const monthsInYear = 12;

                //transaction for records    
                const validResponse = await axios.get(`http://localhost:8080/recon/validAnnualTransactions?year=${currentYear}&fileType=payment`);
                const invalidResponse = await axios.get(`http://localhost:8080/recon/invalidAnnualTransactions?year=${currentYear}&fileType=payment`);
                const unreconciledResponse = await axios.get(`http://localhost:8080/recon/unreconciledAnnualTransactions?year=${currentYear}&fileType=payment`);
                const reconciledResponse = await axios.get(`http://localhost:8080/recon/reconciledAnnualTransactions?year=${currentYear}&fileType=payment`);
                //value
                const validValueResponse = await axios.get(`http://localhost:8080/recon/validAnnualTransactionsValue?year=${currentYear}&fileType=payment`);
                const invalidValueResponse = await axios.get(`http://localhost:8080/recon/invalidAnnualTransactionsValue?year=${currentYear}&fileType=payment`);
                const unreconciledValueResponse = await axios.get(`http://localhost:8080/recon/unreconciledAnnualTransactionsValue?year=${currentYear}&fileType=payment`);
                const reconciledValueResponse = await axios.get(`http://localhost:8080/recon/reconciledAnnualTransactionsValue?year=${currentYear}&fileType=payment`);
            
                
                const validData = validResponse.data;
                const invalidData = invalidResponse.data;
                const unreconciledData = unreconciledResponse.data;
                const reconciledData = reconciledResponse.data;
    
                const validValueData = validValueResponse.data;
                const invalidValueData = invalidValueResponse.data;
                const unreconciledValueData = unreconciledValueResponse.data;
                const reconciledValueData = reconciledValueResponse.data;
            
               
                const data = [];
                const values = [];
                for (let i = 1; i <= monthsInYear; i += 2) {
                    const labels = `${currentYear}/${i}`.toString();
                    setLabels(labels);
                    if (i <= currentMonth && i + 1 >= currentMonth) {
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
                //values
                for (let i = 1; i <= monthsInYear; i += 2) {
                    const labels = `${currentYear}/${i}`.toString();
                    setLabels(labels);
                    if (i <= currentMonth && i + 1 >= currentMonth) {
                        values.push({
                            name: labels, // Convert to string to avoid NaN
                            validValue: validValueData,
                            invalidValue: invalidValueData,
                            unreconciledValue: unreconciledValueData,
                            reconciledValue: reconciledValueData,
                        });
                    } else {
                        values.push({
                            name: labels, // Convert to string to avoid NaN
                            validValue: 0,
                            invalidValue: 0,
                            unreconciledValue: 0,
                            reconciledValue: 0,
                        });
                    }
                }
                
                
                
                setAnnualData(data);
                setAnnualValue(values);


                
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            
        }
        const doughnutChartData = {
            labels: ['Nedbank', 'Absa', 'Autoeft'],
            datasets: [
            {
                data: [nedbankPayments, absaPayments, autoeftPayments],
                backgroundColor: ['#b4e524', 'rgb(2, 40, 64)', 'rgb(128, 139, 239)'],
                hoverBackgroundColor: ['#b4e524', 'rgb(2, 40, 64)', 'rgb(128, 139, 239)'],
            },
            ],
        };

        
        return(
            <div className="flex h-screen text-white bg-offWhite">
                <Sidebar/>
                <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-8" >
            <div className="max-w-9xl px-6 py-8 shadow-lg bg-white rounded-lg border border-deepMidnight">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-content">
                <h3 className=" text-deepMidnight mb-5 text-xl font-semibold">Daily totals per institution</h3>
                <div>
                    {validTransactions === 0 && invalidTransactions === 0 && (
                        <p className="text-lg text-deepMidnight font-semibold">Files outstanding</p>
                    )}
                    <div style={{ maxWidth: '200px', margin: '0 auto' }}>
                        <Doughnut data={doughnutChartData} />
                    </div>
                    <div>
                        <button onClick={() => {window.location.href = '/view-all';}} class="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-bold text-sm py-1 px-2 rounded">
                            View All
                        </button> 
                        </div>
                </div>
            </div>

            <div className="card-content">
        <h3 className="text-base text-deepMidnight mb-2 font-semibold">Daily Payment Records</h3>
        <input type="date" value={dateInputValue} onChange={(e) => setDateInputValue(e.target.value)} className="block text-gray-700 w-1/2 mb-2  bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" readOnly/>
            <div className="flex justify-between items-center">
            <h5 className="info-heading text-gray-900 text-sm">Total number of daily Payments:</h5>
            <span className="text-deepMidnight font-semibold" >{totalTransactions.toLocaleString('en-US')}</span>
        </div>
        <div className="h-2 w-85 bg-gray-300 rounded-md ">
            <div className="h-full rounded-md bg-deepMidnight" style={{ width: totalTransactions ? `${(totalTransactions / totalTransactions) * 100}%` : 0 }}></div>
        </div>

        <div className="flex justify-between items-center">
            <h5 className="info-heading text-gray-900 text-sm">Valid Payments:</h5>
            <span className="text-electricLime font-semibold">{validTransactions.toLocaleString('en-US')}</span>
        </div>
        <div className="h-2 w-85 bg-gray-300 rounded-md">
            <div className="h-full rounded-md bg-electricLime" style={{ width: totalTransactions ? `${(validTransactions / totalTransactions) * 100}%` : 0 }}></div>
        </div>

        <div className="flex justify-between items-center">
            <h5 className="info-heading text-gray-900 text-sm">Unreconciled Payments:</h5>
            <span className="text-clearSkiesAhead font-semibold">{unreconciledTransactions.toLocaleString('en-US')}</span>
        </div>
        <div className="h-2 w-85 bg-gray-300 rounded-md">
            <div className="h-full rounded-md bg-clearSkiesAhead" style={{ width: totalTransactions ? `${(unreconciledTransactions / totalTransactions) * 100}%` : 0 }}></div>
        </div>

        <div className="flex justify-between items-center">
            <h5 className="info-heading text-gray-900 text-sm">Reconciled Payments:</h5>
            <span className="text-overTheAmazon font-semibold">{reconciledTransactions.toLocaleString('en-US')}</span>
        </div>
        <div className="h-2 w-85 bg-gray-300 rounded-md ">
            <div className="h-full rounded-md bg-overTheAmazon" style={{ width: totalTransactions ? `${(reconciledTransactions / totalTransactions) * 100}%` : 0 }}></div>
        </div>

        <div className="flex justify-between items-center">
            <h5 className="info-heading text-gray-900 text-sm">Invalid Payments:</h5>
            <span className="text-red-800 font-semibold">{invalidTransactions.toLocaleString('en-US')}</span>
        </div>
        <div className="h-2 w-85 bg-gray-300 rounded-md">
            <div className="h-full rounded-md bg-red-800" style={{ width: totalTransactions ? `${(invalidTransactions / totalTransactions) * 100}%` : 0 }}></div>
        </div>
        <br />
    </div>


    <div className="card-content">
        <h3 className="text-base text-deepMidnight mb-2 font-semibold">Daily Payment value</h3>
        <input type="date" value={dateInputValue} onChange={(e) => setDateInputValue(e.target.value)} className="block text-gray-700 w-1/2 mb-2 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" readOnly/>

        <div className="flex justify-between items-center">
            <h5 className="info-heading text-gray-900 text-sm">Total value of daily Payments:</h5>
            <span className="text-deepMidnight font-semibold">R {totalTransactionsValue.toLocaleString('en-US')}</span>
        </div>
        <div className="h-2 w-85 bg-gray-300 rounded-md">
            <div className="h-full rounded-md bg-deepMidnight" style={{ width: totalTransactionsValue ? `${(totalTransactionsValue / totalTransactionsValue) * 100}%` : 0 }}></div>
        </div>

        <div className="flex justify-between items-center">
            <h5 className="info-heading text-gray-900 text-sm">Valid Payments:</h5>
            <span className="text-electricLime font-semibold">R {validTransactionsValue.toLocaleString('en-US')}</span>
        </div>
        <div className="h-2 w-85 bg-gray-300 rounded-md">
            <div className="h-full rounded-md bg-electricLime" style={{ width: totalTransactionsValue ? `${(validTransactionsValue / totalTransactionsValue) * 100}%` : 0 }}></div>
        </div>

        <div className="flex justify-between items-center">
            <h5 className="info-heading text-gray-900 text-sm">Unreconciled Payments:</h5>
            <span className="text-clearSkiesAhead font-semibold">R {unreconciledTransactionsValue.toLocaleString('en-US')}</span>
        </div>
        <div className="h-2 w-85 bg-gray-300 rounded-md">
            <div className="h-full rounded-md bg-clearSkiesAhead" style={{ width: totalTransactionsValue ? `${(unreconciledTransactionsValue / totalTransactionsValue) * 100}%` : 0 }}></div>
        </div>

        <div className="flex justify-between items-center">
            <h5 className="info-heading text-gray-900 text-sm">Reconciled Payments:</h5>
            <span className="text-overTheAmazon font-semibold">R {reconciledTransactionsValue.toLocaleString('en-US')}</span>
        </div>
        <div className="h-2 w-85 bg-gray-300 rounded-md">
            <div className="h-full rounded-md bg-overTheAmazon" style={{ width: totalTransactionsValue ? `${(reconciledTransactionsValue / totalTransactionsValue) * 100}%` : 0 }}></div>
        </div>

        <div className="flex justify-between items-center">
            <h5 className="info-heading text-gray-900 text-sm">Invalid Payments:</h5>
            <span className="text-red-800 font-semibold">R {invalidTransactionsValue.toLocaleString('en-US')}</span>
        </div>
        <div className="h-2 w-85 bg-gray-300 rounded-md">
            <div className="h-full rounded-md bg-red-800" style={{ width: totalTransactionsValue ? `${(invalidTransactionsValue / totalTransactionsValue) * 100}%` : 0 }}></div>
        </div>
    </div>
        </div>
    </div>


        <br/>
        <div className="max-w-9xl px-6 py-8 shadow-lg bg-white rounded-lg border border-deepMidnight">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-content">
                <h3 className="text-xl font-semibold text-deepMidnight mb-5">Daily totals per institution </h3>
                <div>
                    <p className="text-lg text-deepMidnight font-semibold">Files outstanding</p>
                    <div style={{ maxWidth: '200px', margin: '0 auto' }}>
                        <Doughnut data={doughnutChartData} />
                    </div>
                    <div>
                        <button onClick={() => {window.location.href = '/view-all';}} class="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-bold text-sm py-1 px-2 rounded">
                            View All
                        </button> 
                        </div>
                </div>
            </div>

            <div className="card-content " >
                <h3 className="text-base text-deepMidnight mb-5 font-semibold">Monthly total records</h3>
        <input type="date" value={dateInputValue} onChange={(e) => setDateInputValue(e.target.value)} className="block text-gray-700 w-1/2 mb-2  bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" readOnly/>

                <div >
                <LineChart
        width={500}
        height={300}
        data={monthlyData}
        margin={{ top: 20, right: 80, left: 20, bottom: 4 }}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <XAxis dataKey="name" orientation="bottom" />
        {/* <YAxis yAxisId="left" /> */}
        <YAxis yAxisId="right"/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="valid" stroke="#8884d8" yAxisId="right" strokeWidth={3} />
        <Line type="monotone" dataKey="reconciled" stroke="#82ca9d" yAxisId="right" strokeWidth={3} />
        <Line type="monotone" dataKey="unreconciled" stroke="#ffc658" yAxisId="right" strokeWidth={3} />
        <Line type="monotone" dataKey="invalid" stroke="#ff0000" yAxisId="right" strokeWidth={3} />
    </LineChart>

                </div>
            </div>
            <div className="card-content">
                <h3 className="text-base text-deepMidnight mb-5 font-semibold">Monthly total value</h3>
        <input type="date" value={dateInputValue} onChange={(e) => setDateInputValue(e.target.value)} className="block text-gray-700 w-1/2 mb-2  bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" readOnly/>

                <div>
                <LineChart
        width={500}
        height={300}
        data={monthlyValue}
        margin={{ top: 20, right: 80, left: 20, bottom: 4 }}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <XAxis dataKey="name" orientation="bottom" />
        {/* <YAxis yAxisId="left" /> */}
        <YAxis yAxisId="right"/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="validValue" stroke="#8884d8" yAxisId="right" strokeWidth={3} />
        <Line type="monotone" dataKey="reconciledValue" stroke="#82ca9d" yAxisId="right" strokeWidth={3} />
        <Line type="monotone" dataKey="unreconciledValue" stroke="#ffc658" yAxisId="right" strokeWidth={3} />
        <Line type="monotone" dataKey="invalidValue" stroke="#ff0000" yAxisId="right" strokeWidth={3} />
    </LineChart>
                </div>
            </div>
        </div>
    </div>

                <br/>
                
                <div className="max-w-9xl px-6 py-8 shadow-lg bg-white rounded-lg border border-deepMidnight">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-content">
                <h3 className="text-xl text-deepMidnight mb-5 font-semibold">Annual totals values per institution</h3>

                <div>
                    <p className="text-lg text-deepMidnight font-semibold">Files outstanding</p>
                    <div style={{ maxWidth: '200px', margin: '0 auto' }}>
                        <Doughnut data={doughnutChartData} />
                    </div>
                    <div>
                        <button onClick={() => {window.location.href = '/view-all';}} class="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-bold text-sm py-1 px-2 rounded">
                            View All
                        </button> 
                        </div>
                                    </div>
            </div>
            <div className="card-content">
                <h3 className="text-base text-deepMidnight mb-5 font-semibold">Annual total records</h3>
        <input type="date" value={dateInputValue} onChange={(e) => setDateInputValue(e.target.value)} className="block text-gray-700 w-1/2 mb-2  bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" readOnly/>
            
                <LineChart
        width={500}
        height={300}
        data={annualData}
        margin={{ top: 20, right: 80, left: 20, bottom: 4 }}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <XAxis dataKey="name" orientation="bottom" />
        {/* <YAxis yAxisId="left" /> */}
        <YAxis yAxisId="right"/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="valid" stroke="#8884d8" yAxisId="right" strokeWidth={3} />
        <Line type="monotone" dataKey="reconciled" stroke="#82ca9d" yAxisId="right" strokeWidth={3} />
        <Line type="monotone" dataKey="unreconciled" stroke="#ffc658" yAxisId="right" strokeWidth={3} />
        <Line type="monotone" dataKey="invalid" stroke="#ff0000" yAxisId="right" strokeWidth={3} />
    </LineChart>
            </div>
            <div className="card-content">
                <h3 className="text-base text-deepMidnight mb-5 font-semibold">Annual total values</h3>
        <input type="date" value={dateInputValue} onChange={(e) => setDateInputValue(e.target.value)} className="block text-gray-700 w-1/2 mb-2  bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" readOnly/>

                <LineChart
        width={500}
        height={300}
        data={annualValue}
        margin={{ top: 20, right: 80, left: 20, bottom: 4 }}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <XAxis dataKey="name" orientation="bottom" />
        {/* <YAxis yAxisId="left" /> */}
        <YAxis yAxisId="right"/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="validValue" stroke="#8884d8" yAxisId="right" strokeWidth={3} />
        <Line type="monotone" dataKey="reconciledValue" stroke="#82ca9d" yAxisId="right" strokeWidth={3} />
        <Line type="monotone" dataKey="unreconciledValue" stroke="#ffc658" yAxisId="right" strokeWidth={3} />
        <Line type="monotone" dataKey="invalidValue" stroke="#ff0000" yAxisId="right" strokeWidth={3} />
    </LineChart>
            </div>
        </div>
    </div>

                </div>
            </div>
            </div>
            
        )
    }