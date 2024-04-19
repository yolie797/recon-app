import React, { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar";
import { Line } from "rc-progress";
import Charts from "../components/Charts";
import { FaTrashAlt, FaFileAlt } from "react-icons/fa";

export default function ManualUpload() {
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState(""); 
    const fileInputRef = useRef();

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length === 1) {
            setFileName(files[0].name);
            setFileSize((files[0].size / 1024).toFixed(2) + ' KB');
        } else if (files.length > 1) {
            setFileName(files.length + ' files selected');
            setFileSize('');
        } else {
            setFileName('No file selected');
            setFileSize('');
        }
        setIsFileSelected(files.length > 0);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const fileType = document.querySelector('input[name="fileType"]:checked').value;
        const institution = document.getElementById('institution').value;
        const files = fileInputRef.current.files;
        const formData = new FormData();
    
        formData.append('fileType', fileType);
        formData.append('institution', institution);
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }
    
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8080/recon/manualUpload', formData, {
                onUploadProgress: (progressEvent) => {
                    for(let i = 0; i < files.length; i++) {
                        const loaded = progressEvent.loaded;
                        const total = files[i].size;
                        const progress = Math.round((loaded / total) * 100);
                        setProgress(progress);
                    }
                    setUploadStatus("uploading");
                    toast.info('Uploading files...');
                },
            });
    
            if (response.status === 200) {
                console.log('File uploaded successfully');
                setUploadStatus("success"); 
                toast.success('File uploaded successfully');
            } else {
                console.error('Error occurred while uploading file');
                setUploadStatus("error");
                toast.error('Error occurred while uploading file');
            }
        } catch (error) {
            console.error('Error occurred while uploading file', error);
            setUploadStatus("error"); 
            toast.error('Error occurred while uploading file');
        } 
    };
    
    const handleCancelClick = () => {
        fileInputRef.current.value = '';
        setFileName('');
        setFileSize('');
        setIsFileSelected(false);
    };

    return (
        <div className="h-screen flex bg-offWhite">
            <Sidebar/>  
            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto p-8">
                    <div className="flex justify-center space-x-8 mb-8">
                        <div className="w-1/3 bg-white p-6 rounded-lg border shadow-lg border-deepMidnight">
                            <label className="text-xl font-semibold mb-4 text-deepMidnight" htmlFor="institution">Select institution</label>
                            <select id="institution" className="border border-deepMidnight rounded p-2 w-full mt-5" name="institution">
                                <option value="absa">Absa</option>
                                <option value="nedbank">Nedbank</option>
                                <option value="autoeft">AutoEft</option>
                            </select>
                        </div>
                        <div className="w-1/3 bg-white p-6 rounded-lg border shadow-lg border-deepMidnight">
                            <label className="text-xl font-semibold text-deepMidnight mb-4">Select file type</label>
                            <div className="space-y-2 mt-5">
                                <div>
                                    <label className="inline-flex items-center" htmlFor="payment">
                                        <input type="radio" className="form-radio text-indigo-600" id="payment" name="fileType" value="payment" checked />
                                        <span className="ml-2">Payment</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="inline-flex items-center" htmlFor="markoff">
                                        <input type="radio" className="form-radio text-indigo-600" id="markoff" name="fileType" value="markoff" />
                                        <span className="ml-2">Markoff</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="inline-flex items-center" htmlFor="settlement">
                                        <input type="radio" className="form-radio" id="settlement" name="fileType" value="settlement" />
                                        <span className="ml-2">Settlement</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3 bg-white p-6 rounded-lg border shadow-lg border-deepMidnight">
                            <h2 className="text-xl font-semibold text-deepMidnight mb-4">Upload files</h2>
                            <div className="space-y-4">
                                <input type="file" id="file" name="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                                <label htmlFor="file" className="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-bold py-2 px-4 rounded cursor-pointer">
                                    Browse
                                </label>
                            
                                <button className="bg-deepMidnight hover:bg-red-800 text-white font-bold py-2 px-4 rounded ml-2" onClick={handleCancelClick}>
                                    Cancel
                                </button>

                                {isFileSelected && !loading && (
                                    <button className="bg-deepMidnight hover:bg-clearSkiesAhead text-white font-bold py-2 px-4 rounded cursor-pointer ml-2" onClick={handleFormSubmit}>
                                        Confirm upload
                                    </button>
                                )}
                             
                             <div className="mt-6">
                             <div className="mt-6">
    {isFileSelected && uploadStatus !== "success" && (
        <div id="uploadStatus" className="flex flex-grow p-2 justify-between items-center m-2 w-90">
            <div className="w-80 flex items-center">
                <div className="mr-2">
                    <FaFileAlt className="text-gray-500" />
                </div>
                <div>
                    <p className="font-medium text-gray-700 w-full break-all">{fileName}</p>
                    <p className="font-medium text-gray-400 mb-1">{fileSize}</p>
                    {isFileSelected && (
                        <Line percent={progress} strokeWidth="2" strokeColor={uploadStatus === "success" ? "#00d1b2" : uploadStatus === "error" ? "#ff0000" : "#1890ff"} trailWidth="2" trailColor="#eaeaea" />
                    )}
                </div>
                <div>
                    <FaTrashAlt className="text-red-800 cursor-pointer" />
                </div>
            </div>
        </div>
    )}
</div>
</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg border shadow-lg border-deepMidnight mb-8">
                        <p className="text-lg font-semibold mb-4 text-deepMidnight">Latest Process (Once file has been uploaded, please wait for processing to start)</p>
                    </div>
                    <Charts />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
