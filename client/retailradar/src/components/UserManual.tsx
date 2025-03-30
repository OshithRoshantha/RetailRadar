import { ExampleTable } from './exampleTable'

export default function UserManual() {
  return (
    <div className="w-full h-full overflow-hidden">
    <div className="h-full overflow-y-auto scrollbar-hide py-3 px-5">
        <p>Welcome to the <b>RetailRadar</b>! This tool helps retailers analyze sales data, generate insights, train machine learning models for predictions, track trending products, and interact with an AI agent for data-related queries.</p>
        <h5>Step 1: Access the Platform</h5>
            <ul>
                <li>Open the RetailRadar in your web browser.</li>
                <li>You will land on the "Getting Started" tab.</li>
            </ul>
        <h5>Step 2: Upload Your Data</h5>
            <ul>
                <li>File Format: Only CSV files are supported.</li>
                <li>Required Structure: Ensure your CSV has the correct columns,</li>
                    <ul>
                        <li><ExampleTable/></li>
                    </ul>
                <li>Upload Process:</li>
                    <ul>
                        <li>Click "Choose File" and select your CSV.</li>
                        <li>Click "Upload" to process the data.</li>
                    </ul>
            </ul>
    </div>
    </div>
  )
}
