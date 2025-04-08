import React from 'react'
import { IconCircleDashedCheck, IconRefresh, IconSettingsCheck } from "@tabler/icons-react"

export default function Predictions() {
  const [modelAvailable, setModelAvailable] = React.useState(true);
  const count = modelAvailable ? 4 : 0;
  const iconColor = modelAvailable ? 'text-green-500' : 'text-gray-400';
  const textColor = modelAvailable ? '' : 'text-gray-400';
  const models = ['XGBClassifier', 'XGBRegressor', 'Prophet', 'LSTM'];

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
        {!modelAvailable && (
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"><IconSettingsCheck className='inline'/> Launch Training</button>)}
        {modelAvailable && (
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"><IconRefresh className='inline'/> Re-Train</button>)}
      </div>
    </div>
  );
}
