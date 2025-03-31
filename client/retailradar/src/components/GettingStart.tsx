import React, { useState, useEffect } from "react";
import { FiUpload, FiFileText, FiX, FiCheckSquare} from "react-icons/fi";
import Spinner from 'react-bootstrap/Spinner';
import './css/GettingStart.css';

export default function GettingStart() {
  const [isDragging, setIsDragging] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const maxSize = 524288000; 

  const validateFile = (file: File): boolean => {
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'text/comma-separated-values'];
    const isValidType = validTypes.includes(file.type) || file.name.endsWith('.csv');
    
    if (!isValidType) {
      setError('Only CSV files are allowed');
      return false;
    }

    if (file.size > maxSize) {
      setError('File size exceeds 500MB limit');
      return false;
    }

    setError(null);
    return true;
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setCsvFile(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setCsvFile(file);
      }
    }
  };

  const removeFile = () => {
    setCsvFile(null);
    setError(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1048576) {
      return `${(bytes / 1048576).toFixed(2)} MB`;
    }
    return `${(bytes / 1024).toFixed(2)} KB`;
  };

  const initializeProcessing = () =>{
    setShowProgress(true);
  }

  const steps = [
    "Initialize Session",
    "Data Cleaning",
    "Data Transformation",
    "Extraction",
  ];

  const [currentStep, setCurrentStep] = useState(steps[0]);
  let stepIndex = 0;

  useEffect(() => {
    const intervalId = setInterval(() => {
      stepIndex = (stepIndex + 1) % steps.length;
      setCurrentStep(steps[stepIndex]);
    }, 2000); 
    return () => clearInterval(intervalId);
  }, [steps]);

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="h-full overflow-y-auto scrollbar-hide py-3 px-5">
        <h5 className="pb-4">Upload CSV</h5>
        <div 
          className={`drag-drop bg-white border-4 border-dotted ${
            isDragging ? 'border-blue-800' : error ? 'border-red-500' : 'border-blue-200'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !csvFile && document.getElementById('csv-file-input')?.click()}
        >
          <input
            id="csv-file-input"
            type="file"
            accept=".csv, text/csv, application/vnd.ms-excel"
            className="hidden"
            onChange={handleFileInput}
          />
          
          {csvFile ? (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center justify-between w-full max-w-md p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <FiFileText size={32} className="text-blue-800 mr-3" />
                  <div>
                    <p className="text-gray-800 font-medium truncate max-w-xs">{csvFile.name}</p>
                    <p className="text-gray-500 text-sm">{formatFileSize(csvFile.size)}</p>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="text-gray-500 hover:text-gray-700 ml-4"
                >
                  <FiX size={20} />
                </button>
              </div>
              <p className="text-medium text-gray-500 mt-3">
                Drag and drop to replace another file
              </p>
            </div>
          ) : (
            <>
              <FiUpload size={32} className={`mb-2 ${
                isDragging ? 'text-blue-800' : error ? 'text-red-500' : 'text-blue-400'
              }`} />
              
              <h3 className={`${
                isDragging ? 'text-blue-800' : error ? 'text-red-500' : 'text-blue-800'
              }`}>
                {isDragging ? 'Drop your CSV file here' : 'Drag and Drop to Upload File'}
              </h3>
              
              <p className="my-2 text-gray-600">OR</p>
              
              <button 
                type="button" 
                className="btn bg-blue-800 hover:bg-blue-900 text-white btn-primary pt-1 px-4 py-2 rounded"
              >
                Browse File
              </button>

              <p className="text-sm text-gray-500 mt-3">
                Maximum file size: 500MB
              </p>
            </>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
        <br></br>
        {isComplete && (<div className="flex pb-2">
            <FiCheckSquare size={32} className="text-blue-800 mr-3"/>
            <p className="text-gray-500 text-sm mt-2"><b className="text-blue-800">Process Successful!</b>&nbsp;&nbsp;&nbsp; Analytics are available.</p>
        </div>)}
        {showProgress && !isComplete && (<div className="flex pb-2">
            <Spinner animation="grow" variant="primary" className="mr-3"/>
            <p className="text-gray-500 text-sm mt-2"><b className="text-blue-800">{currentStep}</b>&nbsp;&nbsp;Please wait, this may take some time...</p>
        </div>)}
        <br></br>
        {!isComplete && csvFile !== null && (
        <button type="button" 
          className={`btn ${showProgress ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-800 hover:bg-blue-900'} btn-primary pt-1 px-4 py-2 rounded`} 
          disabled={showProgress}
          onClick={initializeProcessing}
        >Initialize Processing</button>)}
      </div>
    </div>
  );
}