import { IconCircleDashedCheck, IconRefresh, IconSettingsCheck } from "@tabler/icons-react"
import { BarLoader } from "react-spinners";
import React from 'react'

export default function TrainModels() {
      const [modelAvailable, setModelAvailable] = React.useState(false);
      const [isTraining, setIsTraining] = React.useState(false);
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
        {!modelAvailable && !isTraining && (
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"><IconSettingsCheck className='inline'/> Launch Training</button>)}
        {modelAvailable && !isTraining && (
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"><IconRefresh className='inline'/> Re-Train</button>)}
        {isTraining && (
            <button disabled className="mt-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-300 w-full">Training in progress...</button>)}   
        {isTraining && (
            <BarLoader color="#193cb8" width={1175}/>)}
      </div>
    </div>
  )
}
