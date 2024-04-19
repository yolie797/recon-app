import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function ViewFileDetails() {
    const [fileDetails, setFileDetails] = useState([]);
    const { fileName, selectedOption } = useLocation().state;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [downloadedFile, setDownloadedFile] = useState(false);
    const [tab, setTab] = useState("valid"); // default tab is valid transactions

    useEffect(() => {
        fetchData();
    }, [fileName, selectedOption, currentPage, tab]);

    const fetchData = async () => {
        try {
            let endpoint = tab === 'valid' ? 'validTransactions' : 'invalidTransactions';
            const response = await axios.get(`http://localhost:8080/recon/${endpoint}?fileName=${fileName}&fileType=${selectedOption}`);
            const data = response.data;
            const totalPagesCount = Math.ceil(data.length / 15);
            setTotalPages(totalPagesCount);
            setFileDetails(data.slice((currentPage - 1) * 15, currentPage * 15));
        } catch (error) {
            console.error('Error fetching file details:', error);
        }
    };

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const downloadReport = () => {
        toast.info('Downloading file...');
        if (fileName) {
            const response = axios.get(`http://localhost:8080/recon/downloadFileReport?fileName=${fileName}`);
            setDownloadedFile(true);
            toast.success('File downloaded successfully');
            console.log(response);
        }
    };

    const handleTabChange = (tabName) => {
        setTab(tabName);
        setCurrentPage(1); // reset page when switching tabs
    };

    return (
        <div className="flex h-screen ">
            <Sidebar />
            <div className="w-full bg-gray-100">
                <nav className="bg-deepMidnight">
                    <div className="mx-auto px-4">
                        <div className="flex justify-between h-16">
                            <div className="flex p-5">
                                <button
                                    onClick={() => window.history.back()}
                                    className="flex-shrink-0 text-white mr-6"
                                >
                                    <FaArrowLeft className="h-5 w-6" />
                                </button>
                                <label className="text-white font-semibold">{selectedOption} File</label>
                            </div>
                        </div>
                    </div>
                </nav>
                <div>
                    <div className="col-sm-12 mt-6 rounded-lg border border-deepMidnight ml-5 mb-5 mr-5">
                        <div className="bg-white rounded-lg shadow-md border-deepMidnight">
                            <div className="px-4 py-2 border-b border-deepMidnight">
                                <div className="flex items-center">
                                    <div className="flex-1">
                                        <h5 className="text-lg font-bold text-deepMidnight">Transactions for {fileName}</h5>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-between items-center">
    <div>
        <button
            className={`mr-4 focus:outline-none ${tab === 'valid' ? 'text-deepMidnight font-semibold' : 'text-gray-500'}`}
            onClick={() => handleTabChange('valid')}
        >
            Valid Transactions
        </button>
        <button
            className={`focus:outline-none ${tab === 'invalid' ? 'text-deepMidnight font-semibold' : 'text-gray-500'}`}
            onClick={() => handleTabChange('invalid')}
        >
            Invalid Transactions
        </button>
    </div>
    <button className="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-semibold px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={downloadReport}>
        Download
    </button>
</div>

                            </div>
                            <div className="">
                                <table className="table-auto w-full">
                                    <thead className="bg-deepMidnight">
                                        <tr className="">
                                            <th className="px-4 py-2 text-white">Institution</th>
                                            <th className="px-4 py-2 text-white">Reference Number</th>
                                            <th className="px-4 py-2 text-white">Transaction Amount</th>
                                            <th className="px-4 py-2 text-white">Transaction Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fileDetails.length > 0 && fileDetails.map((transaction, index) => (
                                            <tr key={index} >
                                                <td className="border px-4 py-2">{transaction.institution}</td>
                                                <td className="border px-4 py-2">{transaction.transactionReference || 'N/A'}</td>
                                                <td className="border px-4 py-2">R {transaction.transactionAmount}</td>
                                                <td className="border px-4 py-2">{transaction.transactionDate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-center p-2">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className="bg-clearSkiesAhead hover:bg-deepMidnight text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ml-5"
                                >
                                    Prev
                                </button>
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className="bg-deepMidnight hover:bg-clearSkiesAhead text-white px-4 py-2 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ml-5"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
