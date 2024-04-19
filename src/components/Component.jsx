import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { Tabs, Tab } from 'react-bootstrap';



function Component() {
  const [selectedOption, setSelectedOption] = useState('payment');
  const [fileReports, setFileReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  
  const navigate = useNavigate();

  const handleOptionChange = async (option) => {
    setSelectedOption(option);
    setCurrentPage(1);
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/recon/fileReport?fileType=${option}`);
      setFileReports(response.data);
    } catch (error) {
      console.error('Error fetching file reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const viewFileDetails = () => {
    if (!selectedData) return toast.error('No Selection, Please select a file ');
    const { fileName } = selectedData;
    navigate('/view-file-details', { state: { selectedOption, fileName } });


  };

  useEffect(() => {
    const fetchInitialFileReports = async () => {
      await handleOptionChange(selectedOption);
    };
    fetchInitialFileReports();
  }, [selectedOption]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = fileReports.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
  const handleDataSelection = (fileReport) => {
    setSelectedData(fileReport);
    setSelectedRow(fileReport);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full bg-gray-100">
                <nav className="bg-deepMidnight">
                    <div className="mx-auto px-4">
                        <div className="flex justify-between h-16">
                            <div className="flex p-5 font-semibold text-lg text-white">
                                <button
                                    onClick={() => window.history.back()}
                                    className="flex-shrink-0 text-white mr-6 ">
                                    <FaArrowLeft className="h-5 w-6" />
                                </button>
                                File Reports
                            </div>
                        </div>
                    </div>
                </nav>
      <div className="w-full">
      <div className="bg-white border border-deepMidnight shadow-md p-4 rounded-md m-4 ">
        <div className="flex justify-center space-x-10 px-37 py-4">
          <ul className="flex rounded-lg overflow-hidden text-lg">
            {['payment', 'markoff', 'settlement'].map((option, index) => (
              <li key={index} className="flex-1">
                <label
                  htmlFor={option}
                  className={`flex items-center justify-center px-36 py-4 text-center cursor-pointer ${
                    selectedOption === option ? 'bg-transparent border-b-2 border-teal-900' : ''
                  }`}
                  onClick={() => handleOptionChange(option)}
                >
                  <input type="radio" value={option} name={option} id={option} className="hidden" />
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="float-right">
          <div className="flex justify-center space-x-1 m-0 p-2">
                     <button className="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-semibold px-4 py-2 mr-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={viewFileDetails}>  View
            </button>
          </div>
        </div>

        <div className="p-4 mt-10">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-deepMidnight text-white">
                <tr>
                  {['Date and Time', 'File Name', 'Institution', 'Total Records', 'Valid Records', 'Invalid Records'].map((header, index) => (
                    <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((fileReport, index) => (
                  <tr key={index} 
                      className={`${selectedRow === fileReport ? 'bg-gray-200' : ''} hover:bg-gray-100`}
                      onClick={() => handleDataSelection(fileReport)}
                      onDoubleClick={() => viewFileDetails()}>
                    <td className="px-6 py-4 whitespace-nowrap">{fileReport.uploadDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{fileReport.fileName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{fileReport.institution}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{fileReport.totalRecords}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{fileReport.validRecords}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{fileReport.invalidRecords}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-12 flex justify-center items-center mt-4">
          {fileReports.length > itemsPerPage && (
            <ul className="flex">
              {[...Array(Math.ceil(fileReports.length / itemsPerPage))].map((_, index) => (
                <li key={index}>
                  <button
                    className={`text-gray-400 hover:text-gray-700 ${
                      currentPage === index + 1 ? 'font-bold' : ''
                    }`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          )}
          </div>
        </div>
      </div>
    </div>
    <ToastContainer/>
    </div>
  );
}

export default Component;
