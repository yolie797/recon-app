import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


export default function ViewReportDetail() {
  const location = useLocation();
  const [selectedReportTab, setSelectedReportTab] = useState('Payment Unreconciled'); // Default selected tab
  const [reportTabs, setReportTabs] = useState([]);
  const [reportTabsContent, setReportTabsContent] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [downloadedFile, setDownloadedFile] = useState(false);

  const { reportfilename, paymentFile, markOffFile } = location.state;

  useEffect(() => {
    fetchData();
  }, [selectedReportTab, currentPage]);

  async function fetchData() {
    try {
      // Simulate fetching report tabs
      const tabs = ["Payment Unreconciled", "Markoff Missing"];
      setReportTabs(tabs);

      // Fetch report content
      let response;
      let data;
      if (selectedReportTab === "Payment Unreconciled") {
        response = await axios.get(`http://localhost:8080/recon/unreconciledTransactions?fileName=${paymentFile}&fileType=payment`);
      } else if (selectedReportTab === "Markoff Missing") {
        response = await axios.get(`http://localhost:8080/recon/unreconciledTransactions?fileName=${markOffFile}&fileType=markoff`);
      }
      data = response.data;
      const totalPagesCount = Math.ceil(data.length / 15);
      setTotalPages(totalPagesCount);
      setReportTabsContent(data.slice((currentPage - 1) * 15, currentPage * 15));
    } catch (error) {
      console.error("Error fetching report content:", error);
    }
  }

  const handleDataSelection = (selectedData) => {
    setSelectedData(selectedData);
  };

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const downloadReport = () => {
    toast.info('Downloading file...');
    if (reportfilename) {
      axios.get(`http://localhost:8080/recon/downloadAnomalyReport?fileName=${reportfilename}`)
        .then(() => {
          setDownloadedFile(true);
          toast.success('File downloaded successfully');
        })
        .catch(error => {
          console.error("Error downloading report:", error);
          toast.error('Error downloading report');
        });
    }
  };

  return (
    <div className="flex h-screen text-gray-700">
      <Sidebar />
      <div className="w-full">
        <nav className="bg-deepMidnight">
          <div className="mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center text-white font-semibold text-lg">
                <button onClick={() => window.history.back()} className="flex-shrink-0 text-white mr-6">
                  <FaArrowLeft className="h-5 w-6"/>
                </button>
                Recon Report
              </div>
            </div>
          </div>
        </nav>

        <div className="mx-auto bg-white rounded-lg shadow-md border border-deepMidnight ml-5 mb-5 mr-5 mt-5">
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h2 className="text-deepMidnight font-semibold text-xl ml-5">Recon Report: {reportfilename}</h2>
              <p className="text-sm text-deepMidnight ml-5 mt-2">Payment File: {paymentFile}</p>
              <p className="text-sm text-deepMidnight ml-5">Markoff File: {markOffFile}</p>
            </div>
            
          </div>

          <div className="mt-3 ml-5 flex items-center justify-between">
                <div>
        <button
            className={`mr-4 focus:outline-none ${selectedReportTab === 'Payment Unreconciled' ? 'text-deepMidnight font-semibold' : 'text-gray-500'}`}
            onClick={() => setSelectedReportTab('Payment Unreconciled')}
        >
            Payment Unreconciled
        </button>
        <button
            className={`focus:outline-none ${selectedReportTab === 'Markoff Missing' ? 'text-deepMidnight font-semibold' : 'text-gray-500'}`}
            onClick={() => setSelectedReportTab('Markoff Missing')}
        >
            Markoff Missing
        </button>
    </div>
    <button className="bg-deepMidnight hover:bg-clearSkiesAhead mr-5 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={downloadReport}>
        Download
    </button>
</div>


          <div className="p-4 rounded-2xl shadow-orange-50">
            {selectedReportTab && (
              <table className="table-auto w-full mt-1">
                <thead>
                  <tr className="bg-deepMidnight text-white">
                    <th className="px-4 py-2">Institution</th>
                    <th className="px-4 py-2">Reference Number</th>
                    <th className="px-4 py-2">Transaction Amount</th>
                    <th className="px-4 py-2">Transaction Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reportTabsContent.map((detail, index) => (
                    <tr key={index} className="border divide-x divide-gray-200 cursor-pointer" onClick={() => handleDataSelection(detail)}>
                      <td className="px-4 py-2">{detail.institution}</td>
                      <td className="px-4 py-2">{detail.transactionReference}</td>
                      <td className="px-4 py-2">R {detail.transactionAmount}</td>
                      <td className="px-4 py-2">{detail.transactionDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="flex justify-center mt-2 p-2 space-x-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="bg-clearSkiesAhead hover:bg-deepMidnight text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Prev
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="bg-deepMidnight hover:bg-clearSkiesAhead text-white px-4 py-2 rounded-lg  "
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>

  );
}
