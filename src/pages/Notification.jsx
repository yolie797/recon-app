import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Notification() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [readStatus, setReadStatus] = useState({
        row1: false,
        row2: false // Add more rows as needed
    });
    const [selectedRows, setSelectedRows] = useState([]);

    const markAsRead = () => {
        const updatedReadStatus = { ...readStatus };
        selectedRows.forEach((row) => {
            updatedReadStatus[row] = true;
        });
        setReadStatus(updatedReadStatus);
    };

    const handleActionClick = (row) => {
        if (!selectedRows.includes(row)) {
            setSelectedRows([...selectedRows, row]);
        } else {
            setSelectedRows(selectedRows.filter((selectedRow) => selectedRow !== row));
        }
    };

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="w-full bg-gray-100">
                <div className="main-content p-5">
                    <div className="inbox-content bg-white border border-deepMidnight shadow-md p-4 rounded-md mt-4">
                    <div className="filter-container flex items-center">
    <h3 className="text-lg font-bold mr-4">Filter: </h3>
    <div className="flex">
        <select className="text-gray-400 hover:text-gray-700">
            <option value="all">All</option>
            <option value="read">Read</option>
        </select>
    </div>
</div>


<div className="button-container mt-4 flex justify-end">
    <button className="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-bold py-2 px-3 rounded mr-2 text-sm" onClick={markAsRead}>
        Mark as Read
    </button>
    <button className="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-bold py-2 px-3 rounded mr-2 text-sm">Refresh</button>
</div>

                        <table className="w-full mt-4 mb-4">
                            <thead>
                                <tr className="bg-deepMidnight text-white">
                                    <th className="px-4 py-2"></th>
                                    <th className="px-4 py-2">Created DT</th>
                                    <th className="px-4 py-2">Read DT</th>
                                    <th className="px-4 py-2">Topic</th>
                                    <th className="px-4 py-2">Message</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={`border-b-2 ${readStatus.row1 ? 'bg-notification' : ''}`}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes('row1')}
                                            onChange={() => handleActionClick('row1')}
                                        />
                                    </td>
                                    <td className="border px-4 py-2">2024-03-14 08:30:00</td>
                                    <td className="border px-4 py-2">2024-03-14 09:00:00</td>
                                    <td className="border px-4 py-2">Sample Topic</td>
                                    <td className="border px-4 py-2">Sample Message</td>
                                    <td className="border px-4 py-2">Sample Status</td>
                                    <td className="border px-4 py-2">Sample Details</td>
                                </tr>
                                <tr className={`border-b-2 ${readStatus.row2 ? 'bg-platinum' : ''}`}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes('row2')}
                                            onChange={() => handleActionClick('row2')}
                                        />
                                    </td>
                                    <td className="border px-4 py-2">2024-03-14 08:30:00</td>
                                    <td className="border px-4 py-2">2024-03-14 09:00:00</td>
                                    <td className="border px-4 py-2">Sample Topic</td>
                                    <td className="border px-4 py-2">Sample Message</td>
                                    <td className="border px-4 py-2">Sample Status</td>
                                    <td className="border px-4 py-2">Sample Details</td>
                                </tr>
                            </tbody>
                        </table>
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
    );
}
