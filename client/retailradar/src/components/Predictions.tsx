import React, { useEffect } from 'react'
import { IconInfoCircle } from "@tabler/icons-react"
import { BarLoader } from "react-spinners";
import SalesPredictions from './SalesPrediction';
import DemandPrediction from './DemandPrediction';
import loading from '../assets/img/loading.jpg';

export default function Predictions() {
  const [modelAvailable, setModelAvailable] = React.useState(false);
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);
  const [clvResult, setClvResult] = React.useState({});
 // const [churnResult, setChurnResult] = React.useState({});
  const [result3, setResult3] = React.useState({});
  const [result4, setResult4] = React.useState({});

  useEffect(() => {
    const checkModels = () => {
      const models = sessionStorage.getItem('models');
      setModelAvailable(models === 'True');
    };
  
    const fetchData = async () => {
      try {
        checkModels();
        const [salesResponse, demandResponse] = await Promise.all([
          fetch('http://localhost:8000/retailradar/predict/sales', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }),
          fetch('http://localhost:8000/retailradar/predict/demand', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
        ]);
  
        const result3 = await salesResponse.json();
        const result4 = await demandResponse.json();
        
        setResult3(result3);
        setResult4(result4);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching prediction data:", error);
        setIsDataLoaded(true);
      }
    };
  
    fetchData();
  }, []);

  const predictChurn = async () =>{
    const churnResult = await fetch('http://localhost:8000/retailradar/predict/churn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Total_Spend: parseFloat(clvFormData.totalSpend),
        Total_Purchases: parseInt(clvFormData.totalPurchases),
        Recency: parseFloat(clvFormData.lifespan),
        Avg_Order_Value: parseFloat()
      })
    });
  };

  const predictClv = async () => {
    const clvResult = await fetch('http://localhost:8000/retailradar/predict/clv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Total_Spend: parseFloat(clvFormData.totalSpend),
        Total_Purchases: parseInt(clvFormData.totalPurchases),
        Lifespan: parseFloat(clvFormData.lifespan),
        Type: clvFormData.type
      })
    });
    const response = await clvResult.json();
    setClvResult(response);
    setIsPredictingClv(false);
    setShowClvResult(true);
  };

  const [churnFormData, setChurnFormData] = React.useState({
    totalSpend: '',
    totalPurchases: '',
    recency: '',
    avgOrderValue: ''
  });
  const [autoCalculated, setAutoCalculated] = React.useState(false);
  const [showChurnResult, setShowChurnResult] = React.useState(false);
  const [isPredictingChurn, setIsPredictingChurn] = React.useState(false);
  
  const [clvFormData, setClvFormData] = React.useState({
    totalSpend: '',
    totalPurchases: '',
    lifespan: '',
    type: 'New'
  });
  const [showClvResult, setShowClvResult] = React.useState(false);
  const [isPredictingClv, setIsPredictingClv] = React.useState(false);

  const churnResult = {
    "prediction": 0,
    "probability": 0.4348597526550293
  };

  const fieldLabels = {
    totalSpend: "Total Spend",
    totalPurchases: "Total Purchases",
    recency: "Recency (days)",
    avgOrderValue: "Avg Order Value",
    lifespan: "Lifespan (years)",
    type: "Customer Type"
  };

  const tooltips = {
    totalSpend: "The total amount of money the customer has spent with your business",
    totalPurchases: "The total number of purchases the customer has made",
    recency: "Number of days since the customer's last purchase",
    avgOrderValue: "Average value of each order (Total Spend / Total Purchases)",
    lifespan: "How many years the customer has been with your business",
    type: "Customer segment (New, Regular, or Premium)"
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    const num = value.replace(/[^0-9.]/g, '');
    return num ? `$${parseFloat(num).toLocaleString(undefined, { maximumFractionDigits: 2 })}` : '';
  };

  const parseCurrency = (value) => {
    return value.replace(/[^0-9.]/g, '');
  };

  const handleChurnInputChange = (e) => {
    const { name, value } = e.target;
    let numericValue = value.replace(/[^0-9.]/g, '');

    setChurnFormData(prev => {
      const newData = {...prev, [name]: numericValue};
      
      if ((name === 'totalSpend' || name === 'totalPurchases') && !autoCalculated) {
        const spend = parseFloat(parseCurrency(newData.totalSpend)) || 0;
        const purchases = parseFloat(parseCurrency(newData.totalPurchases)) || 0;
        
        if (purchases > 0) {
          newData.avgOrderValue = (spend / purchases).toFixed(2);
          setAutoCalculated(true);
        }
      }
      
      return newData;
    });
  };

  const handleAvgOrderValueChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setChurnFormData(prev => ({...prev, avgOrderValue: value}));
    setAutoCalculated(false);
  };

  const handleClvInputChange = (e) => {
    const { name, value } = e.target;
    let numericValue = value;
    
    if (name !== 'type') {
      numericValue = value.replace(/[^0-9.]/g, '');
    }
    
    setClvFormData(prev => ({...prev, [name]: numericValue}));
  };

  const getDisplayValue = (name, value) => {
    if (!value) return '';
    if (name === 'totalSpend' || name === 'avgOrderValue' || name === 'predictedClv') {
      return formatCurrency(value);
    }
    return value;
  };

  const handlePredictChurn = () => {
    setIsPredictingChurn(true);
    setTimeout(() => {
      setIsPredictingChurn(false);
      setShowChurnResult(true);
    }, 1000);
  };

  const handlePredictClv = () => {
    setIsPredictingClv(true);
    predictClv();
  };

  const isChurnFormValid = () => {
    return churnFormData.totalSpend && churnFormData.totalPurchases && 
           churnFormData.recency && churnFormData.avgOrderValue;
  };

  const isClvFormValid = () => {
    return clvFormData.totalSpend && clvFormData.totalPurchases && 
           clvFormData.lifespan && clvFormData.type;
  };

  if (!isDataLoaded) {
    return (
      <div className="w-full h-full overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-hide py-3 px-5">
          <div className='flex flex-col items-center justify-center h-full'>
            <img
              src={loading}
              alt="Image"
              className="animate-spin w-16 h-16 mb-4"
            />
            <p className='text-gray-500 pt-5'>Hang tight! We’re getting things ready for you...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="h-full overflow-y-auto scrollbar-hide py-3 px-5">
        {!modelAvailable && (
          <div className='flex flex-col items-center justify-center h-full'>
            <img
                src={predictError}
                alt="Image"
            />
            <p className='text-gray-500 pt-5'>To view demand forecasts, please train your prediction models first. Currently, no prediction data is available to display.</p>
          </div>
        )}
        {modelAvailable && (
        <div className='mt-6 p-4 border rounded-lg'>
          <SalesPredictions  data={result3}/>
        </div>)}
        {modelAvailable && (
        <div className='mt-6 p-4 border rounded-lg'>
          <DemandPrediction data={result4}/>
        </div>)}
        {modelAvailable && (
        <div className='churn-predictor mt-6 p-4 border rounded-lg'>
          <h2 className='text-2xl font-bold'>Churn Predictor</h2>
          <p className='text-gray-500'>Predict the likelihood of a customer churning.</p>
          <div className='flex gap-3 items-center justify-start h-full mt-4'>
            <div className="relative flex flex-col">
              <input 
                type="text" 
                name="totalSpend"
                placeholder="Enter amount" 
                className="border border-gray-300 rounded-md p-2 w-full" 
                value={getDisplayValue('totalSpend', churnFormData.totalSpend)}
                onChange={handleChurnInputChange}
              />
              <span className="text-sm text-gray-500 mt-1">{fieldLabels.totalSpend}</span>
              <div className="group absolute right-2 top-2">
                <IconInfoCircle className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                <span className="hidden group-hover:block absolute z-10 w-64 p-2 text-sm text-white bg-gray-800 rounded-md bottom-full left-1/2 transform -translate-x-1/2">
                  {tooltips.totalSpend}
                </span>
              </div>
            </div>
            
            <div className="relative flex flex-col">
              <input 
                type="text" 
                name="totalPurchases"
                placeholder="Enter count" 
                className="border border-gray-300 rounded-md p-2 w-full" 
                value={churnFormData.totalPurchases}
                onChange={handleChurnInputChange}
              />
              <span className="text-sm text-gray-500 mt-1">{fieldLabels.totalPurchases}</span>
              <div className="group absolute right-2 top-2">
                <IconInfoCircle className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                <span className="hidden group-hover:block absolute z-10 w-64 p-2 text-sm text-white bg-gray-800 rounded-md bottom-full left-1/2 transform -translate-x-1/2">
                  {tooltips.totalPurchases}
                </span>
              </div>
            </div>
            
            <div className="relative flex flex-col">
              <input 
                type="text" 
                name="recency"
                placeholder="Enter days" 
                className="border border-gray-300 rounded-md p-2 w-full" 
                value={churnFormData.recency}
                onChange={handleChurnInputChange}
              />
              <span className="text-sm text-gray-500 mt-1">{fieldLabels.recency}</span>
              <div className="group absolute right-2 top-2">
                <IconInfoCircle className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                <span className="hidden group-hover:block absolute z-10 w-64 p-2 text-sm text-white bg-gray-800 rounded-md bottom-full left-1/2 transform -translate-x-1/2">
                  {tooltips.recency}
                </span>
              </div>
            </div>
            
            <div className="relative flex flex-col">
              <input 
                type="text" 
                name="avgOrderValue"
                placeholder="Enter value" 
                className="border border-gray-300 rounded-md p-2 w-full" 
                value={getDisplayValue('avgOrderValue', churnFormData.avgOrderValue)}
                onChange={handleAvgOrderValueChange}
              />
              <span className="text-sm text-gray-500 mt-1">{fieldLabels.avgOrderValue}</span>
              <div className="group absolute right-2 top-2">
                <IconInfoCircle className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                <span className="hidden group-hover:block absolute z-10 w-64 p-2 text-sm text-white bg-gray-800 rounded-md bottom-full left-1/2 transform -translate-x-1/2">
                  {tooltips.avgOrderValue}
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={handlePredictChurn}
            disabled={!isChurnFormValid() || isPredictingChurn}
            className={`mt-4 text-white px-4 py-2 rounded w-full ${
              isChurnFormValid() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isPredictingChurn ? 'Predicting...' : 'Predict Churn Risk'}
          </button>

          {isPredictingChurn && <BarLoader color="#193cb8" width="100%" className="mt-2"/>}

          {showChurnResult && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">Churn Prediction Result</h3>
              
              <div className="flex items-center mb-3">
                <span className="font-medium mr-2">Churn Prediction:</span>
                <span className={`px-2 py-1 rounded ${
                  churnResult.prediction === 1 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {churnResult.prediction === 1 ? 'High Risk' : 'Low Risk'}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className={`h-2.5 rounded-full ${
                    churnResult.prediction === 1 ? 'bg-red-500' : 'bg-green-500'
                  }`} 
                  style={{ width: `${churnResult.probability * 100}%` }}
                ></div>
              </div>
              
              <p className="text-sm text-gray-600">
                Confidence: {(churnResult.probability * 100).toFixed(1)}%
              </p>
              
              <p className="mt-3 text-sm">
                {churnResult.prediction === 1 ? (
                  <span className="text-red-600">This customer has a {Math.round(churnResult.probability * 100)}% chance of churning. Consider retention strategies.</span>
                ) : (
                  <span className="text-green-600">This customer has a {Math.round((1 - churnResult.probability) * 100)}% chance of staying. Focus on maintaining good engagement.</span>
                )}
              </p>
            </div>
          )}
        </div>)}
        {modelAvailable && (
        <div className='clv-predictor mt-6 p-4 border rounded-lg'>
          <h2 className='text-2xl font-bold'>Customer Lifetime Value Predictor</h2>
          <p className='text-gray-500'>Predict the future value of a customer.</p>
          <div className='flex gap-3 items-center justify-start h-full mt-4'>
            <div className="relative flex flex-col">
              <input 
                type="text" 
                name="totalSpend"
                placeholder="Enter amount" 
                className="border border-gray-300 rounded-md p-2 w-full" 
                value={getDisplayValue('totalSpend', clvFormData.totalSpend)}
                onChange={handleClvInputChange}
              />
              <span className="text-sm text-gray-500 mt-1">{fieldLabels.totalSpend}</span>
              <div className="group absolute right-2 top-2">
                <IconInfoCircle className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                <span className="hidden group-hover:block absolute z-10 w-64 p-2 text-sm text-white bg-gray-800 rounded-md bottom-full left-1/2 transform -translate-x-1/2">
                  {tooltips.totalSpend}
                </span>
              </div>
            </div>
            
            <div className="relative flex flex-col">
              <input 
                type="text" 
                name="totalPurchases"
                placeholder="Enter count" 
                className="border border-gray-300 rounded-md p-2 w-full" 
                value={clvFormData.totalPurchases}
                onChange={handleClvInputChange}
              />
              <span className="text-sm text-gray-500 mt-1">{fieldLabels.totalPurchases}</span>
              <div className="group absolute right-2 top-2">
                <IconInfoCircle className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                <span className="hidden group-hover:block absolute z-10 w-64 p-2 text-sm text-white bg-gray-800 rounded-md bottom-full left-1/2 transform -translate-x-1/2">
                  {tooltips.totalPurchases}
                </span>
              </div>
            </div>
            
            <div className="relative flex flex-col">
              <input 
                type="text" 
                name="lifespan"
                placeholder="Enter years" 
                className="border border-gray-300 rounded-md p-2 w-full" 
                value={clvFormData.lifespan}
                onChange={handleClvInputChange}
              />
              <span className="text-sm text-gray-500 mt-1">{fieldLabels.lifespan}</span>
              <div className="group absolute right-2 top-2">
                <IconInfoCircle className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                <span className="hidden group-hover:block absolute z-10 w-64 p-2 text-sm text-white bg-gray-800 rounded-md bottom-full left-1/2 transform -translate-x-1/2">
                  {tooltips.lifespan}
                </span>
              </div>
            </div>
            
            <div className="relative flex flex-col">
              <select
                name="type"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={clvFormData.type}
                onChange={handleClvInputChange}
              >
                <option value="New">New Customer</option>
                <option value="Regular">Regular Customer</option>
                <option value="Premium">Premium Customer</option>
              </select>
              <span className="text-sm text-gray-500 mt-1">{fieldLabels.type}</span>
            </div>
          </div>

          <button 
            onClick={handlePredictClv}
            disabled={!isClvFormValid() || isPredictingClv}
            className={`mt-4 text-white px-4 py-2 rounded w-full ${
              isClvFormValid() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isPredictingClv ? 'Predicting...' : 'Predict Lifetime Value'}
          </button>

          {isPredictingClv && <BarLoader color="#193cb8" width="100%" className="mt-2"/>}

          {showClvResult && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">CLV Prediction Result</h3>
              
              <div className="flex items-center mb-3">
                <span className="font-medium mr-2">Predicted Lifetime Value: $</span>
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
                  {clvResult.predictedClv}
                </span>
              </div>
              
              <p className="text-sm text-gray-600">
                Based on {clvFormData.type} customer profile
              </p>
              
              <p className="mt-3 text-sm">
                <span className="text-blue-600">
                  This customer is predicted to generate ${clvResult.predictedClv} in value over their lifetime.
                </span>
              </p>
            </div>
          )}
        </div>)}
      </div>
    </div>
  );
}