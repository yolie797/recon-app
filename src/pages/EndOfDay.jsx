import React, { useState , useEffect} from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import Charts from "../components/Charts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EndOfDay(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    //payment
   const [paymentValidTransactions, setPaymentValidTransactions] = useState([]);
    const [paymentInvalidTransactions, setPaymentInvalidTransactions] = useState([]);
    const [unreconciledTransactions, setUnreconciledTransactions] = useState([]);
    const [totalTransactions, setTotalTransactions] = useState([]);
    const [reconciledTransactions, setReconciledTransactions] = useState([]);
    //markoff
    const [markoffValidTransactions, setMarkoffValidTransactions] = useState([]);
    const [markoffInvalidTransactions, setMarkoffInvalidTransactions] = useState([]);
    const [unreconciledMarkoffTransactions, setMarkoffUnreconciledTransaction] = useState([]);
    const [totalMarkoffTransactions, setMarkoffTotalTransaction] = useState([]);
    const [reconciledMarkoffTransactions, setMarkoffReconciledTransaction] = useState([]);
    //settlement
    const [settlementValidTransactions, setSettlementValidTransactions] = useState([]);
    const [settlementInvalidTransactions, setSettlementInvalidTransactions] = useState([]);
    const [unreconciledSettlementTransactions, setUnreconciledSettlementTransactions] = useState([]);
    const [totalSettlementTransactions, setTotalSettlementTransactions] = useState([]);
    const [reconciledSettlementTransactions, setReconciledSettlementTransactions] = useState([]);

    const [dateInputValue, setDateInputValue] = useState('');
   
    const handleGenerateReport = async () => {
        try {
            setLoading(true);
    
           
            const formData = new FormData();
            const institution = document.getElementById('institution').value;
            formData.append('institution', institution);
            toast.info('Starting Recon...');
            const response = await axios.post('http://localhost:8080/recon/endOfDay', formData, {
                toastify: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            

            if(response.status === 200){
                setSuccessMessage(response.data);
            toast.success('Recon complete');
                getPaymentBarProgress();
                getMarkoffBarProgress();
                getSettlementBarProgress();
            }
        } catch (error) {
            setError('Error processing recon. Please try again.');
        toast.error('Error processing recon. Please try again.'); 
        }
    };

    useEffect(() => {
        try{
            getPaymentBarProgress();
            getMarkoffBarProgress();
            getSettlementBarProgress();
            
            const currentDate = new Date().toISOString().split('T')[0];
            setDateInputValue(currentDate);
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        }
        
    })
    
    const getPaymentBarProgress = async () => {
        try {
            const valid = await axios.get('http://localhost:8080/recon/validTransactionsCount?fileType=payment');
            setPaymentValidTransactions(valid.data);
    
            const invalid = await axios.get('http://localhost:8080/recon/invalidTransactionsCount?fileType=payment');
            setPaymentInvalidTransactions(invalid.data);
    
            const unreconciled = await axios.get('http://localhost:8080/recon/unreconciledTransactionsCount?fileType=payment');
            setUnreconciledTransactions(unreconciled.data);
    
            const total = await axios.get('http://localhost:8080/recon/transactionsCount?fileType=payment');
            setTotalTransactions(total.data);
    
            const reconciled = await axios.get('http://localhost:8080/recon/reconciledTransactionsCount?fileType=payment');
            setReconciledTransactions(reconciled.data);
        }catch (error) {
            console.error('Error fetching transactions data:', error);
        }
    }
    const getMarkoffBarProgress = async () => {
        try {
            const valid = await axios.get('http://localhost:8080/recon/validTransactionsCount?fileType=markoff');
            setMarkoffValidTransactions(valid.data);
    
            const invalid = await axios.get('http://localhost:8080/recon/invalidTransactionsCount?fileType=markoff');
            setMarkoffInvalidTransactions(invalid.data);
            
            const unreconciled = await axios.get('http://localhost:8080/recon/unreconciledTransactionsCount?fileType=markoff');
            setMarkoffUnreconciledTransaction(unreconciled.data);
    
            const total = await axios.get('http://localhost:8080/recon/transactionsCount?fileType=markoff');
            setMarkoffTotalTransaction(total.data);
    
            const reconciled = await axios.get('http://localhost:8080/recon/reconciledTransactionsCount?fileType=markoff');
            setMarkoffReconciledTransaction(reconciled.data);
        }catch (error) {
            console.error('Error fetching transactions data:', error);
        }
    }
    const getSettlementBarProgress = async () => {
        try {
            const valid = await axios.get('http://localhost:8080/recon/validTransactionsCount?fileType=settlement');
            setSettlementValidTransactions(valid.data);
    
            const invalid = await axios.get('http://localhost:8080/recon/invalidTransactionsCount?fileType=settlement');
            setSettlementInvalidTransactions(invalid.data);

        
            const unreconciled = await axios.get('http://localhost:8080/recon/unreconciledTransactionsCount?fileType=settlement');
            setUnreconciledSettlementTransactions(unreconciled.data);
    
            const total = await axios.get('http://localhost:8080/recon/transactionsCount?fileType=settlement');
            setTotalSettlementTransactions(total.data);
    
            const reconciled = await axios.get('http://localhost:8080/recon/reconciledTransactionsCount?fileType=settlement');
            setReconciledSettlementTransactions(reconciled.data);
        }catch (error) {
            console.error('Error fetching transactions data:', error);
        }
    }
   return(
   <div class="flex h-screen text-white bg-offWhite">
    <Sidebar />
        <div class="flex-1 overflow-y-auto">
    <div class="container mx-auto p-8">
        <div class="max-w-9xl px-6 py-8 shadow-lg rounded-lg border border-deepMidnight bg-white">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-content">
    <h3 className="text-xl font-semibold text-deepMidnight mb-5">Daily Payment total</h3>
    <input type="date" value={dateInputValue} onChange={(e) => setDateInputValue(e.target.value)} className="block text-gray-700 w-1/2 mb-5 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" readOnly />
    <div className="flex justify-between items-center">
        <h5 className="info-heading text-gray-900 text-sm">Total number of daily Payments:</h5>
        <span className="text-deepMidnight font-semibold ">{totalTransactions.toLocaleString('en-US')}</span>
    </div>
    <div className="h-2 w-85 bg-gray-300 rounded-md">
        <div className="h-full rounded-md bg-deepMidnight" style={{ width: totalTransactions ? `${(totalTransactions / totalTransactions) * 100}%` : 0 }}></div>
    </div>

    <div className="flex justify-between items-center">
        <h5 className="info-heading text-gray-900 text-sm">Valid Payments:</h5>
        <span className="text-electricLime font-semibold">{paymentValidTransactions.toLocaleString('en-US')}</span>
    </div>
    <div className="h-2 w-85 bg-gray-300 rounded-md">
        <div className="h-full rounded-md bg-electricLime" style={{ width: totalTransactions ? `${(paymentValidTransactions / totalTransactions) * 100}%` : 0 }}></div>
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
    <div className="h-2 w-85 bg-gray-300 rounded-md">
        <div className="h-full rounded-md bg-overTheAmazon" style={{ width: totalTransactions ? `${(reconciledTransactions / totalTransactions) * 100}%` : 0 }}></div>
    </div>

    <div className="flex justify-between items-center">
        <h5 className="info-heading text-gray-900 text-sm">Invalid Payments:</h5>
        <span className="text-red-800 font-semibold">{paymentInvalidTransactions.toLocaleString('en-US')}</span>
    </div>
    <div className="h-2 w-85 bg-gray-300 rounded-md mb-5">
        <div className="h-full rounded-md bg-red-800" style={{ width: totalTransactions ? `${(paymentInvalidTransactions / totalTransactions) * 100}%` : 0 }}></div>
    </div>
    <div>
        <button onClick={() => {window.location.href = '/view-all';}} className="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-bold text-sm py-1 px-2 rounded">
            View All
        </button> 
    </div>
</div>


<div className="card-content">
    <h3 className="text-xl font-semibold text-deepMidnight mb-5">Daily Markoff total</h3>
    <input type="date" value={dateInputValue} onChange={(e) => setDateInputValue(e.target.value)} className="block text-gray-700 w-1/2 mb-5 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" readOnly/>
    
    <div className="flex justify-between items-center">
        <h5 className="info-heading text-gray-900 text-sm">Total number of daily Markoffs: </h5>
        <span className="text-deepMidnight font-semibold">{totalMarkoffTransactions.toLocaleString('en-US')}</span>
    </div>
    <div className="h-2 w-85 bg-gray-300 rounded-md ">
        <div className="h-full rounded-md bg-deepMidnight" style={{ width: totalMarkoffTransactions ? `${(totalMarkoffTransactions / totalMarkoffTransactions) * 100}%` : 0 }}></div>
    </div>

    <div className="flex justify-between items-center">
        <h5 className="info-heading text-gray-900 text-sm">Valid Markoffs:</h5>
        <span className="text-electricLime font-semibold">{markoffValidTransactions.toLocaleString('en-US')}</span>
    </div>
    <div className="h-2 w-85 bg-gray-300 rounded-md">
        <div className="h-full rounded-md bg-electricLime" style={{ width: totalMarkoffTransactions ? `${(markoffValidTransactions / totalMarkoffTransactions) * 100}%` : 0 }}></div>
    </div>

    <div className="flex justify-between items-center">
        <h5 className="info-heading text-gray-900 text-sm">Unreconciled Markoffs:</h5>
        <span className="text-clearSkiesAhead font-semibold">{unreconciledMarkoffTransactions.toLocaleString('en-US')}</span>
    </div>
    <div className="h-2 w-85 bg-gray-300 rounded-md">
        <div className="h-full rounded-md bg-clearSkiesAhead" style={{ width: totalMarkoffTransactions ? `${(unreconciledMarkoffTransactions / totalMarkoffTransactions) * 100}%` : 0 }}></div>
    </div>

    <div className="flex justify-between items-center">
        <h5 className="info-heading text-gray-900 text-sm">Reconciled Markoffs:</h5>
        <span className="text-overTheAmazon font-semibold">{reconciledMarkoffTransactions.toLocaleString('en-US')}</span>
    </div>
    <div className="h-2 w-85 bg-gray-300 rounded-md">
        <div className="h-full rounded-md bg-overTheAmazon" style={{ width: totalMarkoffTransactions ? `${(reconciledMarkoffTransactions / totalMarkoffTransactions) * 100}%` : 0 }}></div>
    </div>

    <div className="flex justify-between items-center">
        <h5 className="info-heading text-gray-900 text-sm">Invalid Markoffs:</h5>
        <span className="text-red-800 font-semibold">{markoffInvalidTransactions.toLocaleString('en-US')}</span>
    </div>
    <div className="h-2 w-85 bg-gray-300 rounded-md mb-5">
        <div className="h-full rounded-md bg-red-800" style={{ width: totalMarkoffTransactions ? `${(markoffInvalidTransactions / totalMarkoffTransactions) * 100}%` : 0 }}></div>
    </div>
    <div>
        <button onClick={() => {window.location.href = '/view-all';}} className="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-bold text-sm py-1 px-2 rounded">
            View All
        </button> 
    </div>
</div>


<div className="card-content">
    <h3 className="text-xl font-semibold text-deepMidnight  mb-5">Daily Settlement total</h3>
    <input type="date" value={dateInputValue} onChange={(e) => setDateInputValue(e.target.value)} className="block text-gray-700 w-1/2 mb-5 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" readOnly/>
    
    <div className="flex justify-between items-center">
        <h5 className="info-heading text-gray-900 text-sm">Total number of daily Settlement: </h5>
        <span className="text-deepMidnight font-semibold">{totalSettlementTransactions.toLocaleString('en-US')}</span>
    </div>
    <div className="h-2 w-85 bg-gray-300 rounded-md">
        <div className="h-full rounded-md bg-deepMidnight" style={{ width: totalSettlementTransactions ? `${(totalSettlementTransactions / totalSettlementTransactions) * 100}%` : 0 }}></div>
    </div>

    <div className="flex justify-between items-center">
        <h5 className="info-heading text-gray-900 text-sm">Valid Settlement:</h5>
        <span className="text-electricLime font-semibold">{settlementValidTransactions.toLocaleString('en-US')}</span>
    </div>
    <div className="h-2 w-85 bg-gray-300 rounded-md">
        <div className="h-full rounded-md bg-electricLime" style={{ width: totalSettlementTransactions ? `${(settlementValidTransactions / totalSettlementTransactions) * 100}%` : 0 }}></div>
    </div>

    <div className="flex justify-between items-center">
        <h5 className="info-heading text-gray-900 text-sm">Unreconciled Settlement:</h5>
        <span className="text-clearSkiesAhead font-semibold">{unreconciledSettlementTransactions.toLocaleString('en-US')}</span>
    </div>
    <div className="h-2 w-85 bg-gray-300 rounded-md">
        <div className="h-full rounded-md bg-clearSkiesAhead" style={{ width: totalSettlementTransactions ? `${(unreconciledSettlementTransactions / totalSettlementTransactions) * 100}%` : 0 }}></div>
    </div>

    <div className="flex justify-between items-center">
        <h5 className="info-heading text-gray-900 text-sm">Reconciled Settlement:</h5>
        <span className="text-overTheAmazon font-semibold">{reconciledSettlementTransactions.toLocaleString('en-US')}</span>
    </div>
    <div className="h-2 w-85 bg-gray-300 rounded-md">
        <div className="h-full rounded-md bg-overTheAmazon" style={{ width: totalSettlementTransactions ? `${(reconciledSettlementTransactions / totalSettlementTransactions) * 100}%` : 0 }}></div>
    </div>

    <div className="flex justify-between items-center">
        <h5 className="info-heading text-gray-900 text-sm">Invalid Settlement:</h5>
        <span className="text-red-800 font-semibold">{settlementInvalidTransactions.toLocaleString('en-US')}</span>
    </div>
    <div className="h-2 w-85 bg-gray-300 rounded-md mb-5">
        <div className="h-full rounded-md bg-red-800" style={{ width: totalSettlementTransactions ? `${(settlementInvalidTransactions / totalSettlementTransactions) * 100}%` : 0 }}></div>
    </div>

    <div>
        <button onClick={() => {window.location.href = '/view-all';}} className="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-bold text-sm py-1 px-2 rounded">
            View All
        </button> 
    </div>
</div>

            </div>
        </div>

<br/>
        <div class="max-w-9xl px-6 py-8 shadow-lg bg-white rounded-lg border border-deepMidnight">
            <div class="card-body">
                <div class="flex flex-wrap">
                    <div class="w-full md:w-1/2">
                        <h2 class="text-deepMidnight text-xl font-semibold mb-4">End of Day Report</h2>
                        <h3 class="text-deepMidnight text-xl font-semibold mb-3">Recon Stage</h3>
                        <div class="recon-stage-radio-button mb-3 text-black">
                            <input type="radio" name="reconStage"  id="pf-markoff" value="pf-markoff" class="ng-untouched ng-pristine ng-valid"/>
                            <label for="reconStage1" class="recon-stage-label ml-3">Payment File - Markoff</label>
                        </div>
                        <div class="recon-stage-radio-button text-black">
                            <input type="radio"  name="reconStage" id="markoff-settlement" value="markoff-settlement" class="ng-untouched ng-pristine ng-valid"/>
                            <label for="reconStage2" class="recon-stage-label ml-3">Markoff - Settlement</label>
                        </div>
                    </div>

                    <div class="w-full md:w-1/2">
            
                        <label class="text-deepMidnight text-xl font-semibold mb-3" htmlFor="institution">Select institution</label>
                        <select id="institution" name="institution" class="block text-gray-700 w-1/2 bg-white border border-deepMidnight hover:border-gray-500 px-4 py-2 pr-8 mt-5 rounded shadow leading-tight focus:outline-none focus:shadow-outline" >
                            <option value="absa">Absa</option>
                            <option value="nedbank" >Nedbank</option>
                            <option value="autoeft">Auto Eft</option>
                        </select>

                        <br/>
                        
                        <div>
            <div className="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-bold py-2 px-4 rounded relative w-40" role="alert">
                <button onClick={handleGenerateReport} disabled={loading}>
                    End of Day
                </button>
            </div>
        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <br/>
   <Charts />
    </div>
</div>    
<ToastContainer />    
   </div>
   )
}