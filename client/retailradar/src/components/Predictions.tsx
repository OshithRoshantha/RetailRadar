import React from 'react'
import { IconCircleDashedCheck, IconRefresh, IconSettingsCheck, IconInfoCircle } from "@tabler/icons-react"
import { BarLoader } from "react-spinners";

export default function Predictions() {
  const [modelAvailable, setModelAvailable] = React.useState(true);
  const [isTraining, setIsTraining] = React.useState(false);
  const [formData, setFormData] = React.useState({
    totalSpend: '',
    totalPurchases: '',
    recency: '',
    avgOrderValue: ''
  });
  const [autoCalculated, setAutoCalculated] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);
  const [isPredicting, setIsPredicting] = React.useState(false);
  const count = modelAvailable ? 4 : 0;
  const iconColor = modelAvailable ? 'text-green-500' : 'text-gray-400';
  const textColor = modelAvailable ? '' : 'text-gray-400';
  const models = ['XGBClassifier', 'XGBRegressor', 'Prophet', 'LSTM'];

  // Constant prediction result
  const result = {
    "prediction": 0,
    "probability": 0.4348597526550293
  };

  const fieldLabels = {
    totalSpend: "Total Spend",
    totalPurchases: "Total Purchases",
    recency: "Recency (days)",
    avgOrderValue: "Avg Order Value"
  };

  const tooltips = {
    totalSpend: "The total amount of money the customer has spent with your business",
    totalPurchases: "The total number of purchases the customer has made",
    recency: "Number of days since the customer's last purchase",
    avgOrderValue: "Average value of each order (Total Spend / Total Purchases)"
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    const num = value.replace(/[^0-9.]/g, '');
    return num ? `$${parseFloat(num).toLocaleString(undefined, { maximumFractionDigits: 2 })}` : '';
  };

  const parseCurrency = (value) => {
    return value.replace(/[^0-9.]/g, '');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let numericValue = value.replace(/[^0-9.]/g, '');

    setFormData(prev => {
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
    setFormData(prev => ({...prev, avgOrderValue: value}));
    setAutoCalculated(false);
  };

  const getDisplayValue = (name, value) => {
    if (!value) return '';
    if (name === 'totalSpend' || name === 'avgOrderValue') {
      return formatCurrency(value);
    }
    return value;
  };

  const handlePredict = () => {
    setIsPredicting(true);
    // Simulate prediction loading
    setTimeout(() => {
      setIsPredicting(false);
      setShowResult(true);
    }, 1000);
  };

  const isFormValid = () => {
    return formData.totalSpend && formData.totalPurchases && formData.recency && formData.avgOrderValue;
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="h-full overflow-y-auto scrollbar-hide py-3 px-5">
        <p>{count} model(s) found.</p>
        <ul>
          {models.map((model, index) => (
            <li key={index} className={`${textColor}`}>
              <IconCircleDashedCheck className={`inline mr-1 ${iconColor}`} />
              {model}
            </li>
          ))}
        </ul>
        {!modelAvailable && !isTraining && (
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"><IconSettingsCheck className='inline'/> Launch Training</button>)}
        {modelAvailable && !isTraining && (
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"><IconRefresh className='inline'/> Re-Train</button>)}
        {isTraining && (
        <button disabled className="mt-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-300 w-full">Training in progress...</button>)}   
        {isTraining && (
        <BarLoader color="#193cb8" width={1175}/>)}

        <div className='churn-predictor mt-4'>
          <h2 className='text-2xl font-bold'>Churn Predictor</h2>
          <p className='text-gray-500'>Predict the likelihood of a customer churning.</p>
          <div className='flex gap-3 items-center justify-start h-full'>
            <div className="relative flex flex-col">
              <input 
                type="text" 
                name="totalSpend"
                placeholder="Enter amount" 
                className="border border-gray-300 rounded-md p-2 w-full" 
                value={getDisplayValue('totalSpend', formData.totalSpend)}
                onChange={handleInputChange}
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
                value={formData.totalPurchases}
                onChange={handleInputChange}
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
                value={formData.recency}
                onChange={handleInputChange}
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
                value={getDisplayValue('avgOrderValue', formData.avgOrderValue)}
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
            onClick={handlePredict}
            disabled={!isFormValid() || isPredicting}
            className={`mt-4 text-white px-4 py-2 rounded  ${
              isFormValid() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isPredicting ? 'Predicting...' : 'Predict Risk'}
          </button>

          {isPredicting && <BarLoader color="#193cb8" width="100%" className="mt-2"/>}

          {showResult && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">Prediction Result</h3>
              
              <div className="flex items-center mb-3">
                <span className="font-medium mr-2">Churn Prediction:</span>
                <span className={`px-2 py-1 rounded ${
                  result.prediction === 1 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {result.prediction === 1 ? 'High Risk' : 'Low Risk'}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className={`h-2.5 rounded-full ${
                    result.prediction === 1 ? 'bg-red-500' : 'bg-green-500'
                  }`} 
                  style={{ width: `${result.probability * 100}%` }}
                ></div>
              </div>
              
              <p className="text-sm text-gray-600">
                Confidence: {(result.probability * 100).toFixed(1)}%
              </p>
              
              <p className="mt-3 text-sm">
                {result.prediction === 1 ? (
                  <span className="text-red-600">This customer has a {Math.round(result.probability * 100)}% chance of churning. Consider retention strategies.</span>
                ) : (
                  <span className="text-green-600">This customer has a {Math.round((1 - result.probability) * 100)}% chance of staying. Focus on maintaining good engagement.</span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}