import { ExampleTable } from './exampleTable'

export default function UserManual() {
  return (
    <div className="w-full h-full overflow-hidden">
    <div className="h-full overflow-y-auto scrollbar-hide py-3 px-5">
        <p>Welcome to the <b>RetailRadar</b>! This tool helps retailers analyze sales data, generate insights, train machine learning models for predictions, track trending products, and interact with an AI agent for data-related queries.</p>
        <h5 className='pt-3'>1. Getting Started</h5>
        <h6>Step 1: Access the Platform</h6>
            <ul>
                <li>Open the RetailRadar in your web browser.</li>
                <li>You will land on the "Getting Started" tab.</li>
            </ul>
        <h6>Step 2: Upload Your Data</h6>
            <ul>
                <li>File Format: Only CSV files are supported.</li>
                <li>Required Structure: Ensure your CSV has the correct columns,</li>
                    <ul>
                        <li><ExampleTable/></li>
                    </ul>
                <li>Upload Process:</li>
                    <ul>
                        <li>Click "Initialize Processing" to process the data.</li>
                    </ul>
            </ul>
        <h5 className='pt-3'>2. Train Models</h5>
        <p>Click "Launch Training" to train all ML models on your transaction data. This needs to be completed before predictions can be generated.</p>
        <h5 className='pt-3'>3. Analytics</h5>
        <p>After uploading data, go to the "Analytics" tab to explore insights.</p>
        <h5 className='pt-3'>4. Predictions</h5>
        <p>After training models, go to the "Predictions" tab to view forecasts for sales, demand, or customer behavior. Predictions will appear in both table and graph formats.</p>
        <h5 className='pt-3'>5. Product Search</h5>
        <p>Get real-time best-selling products from AliExpress (scraped).</p>
        <h5 className='pt-3'>6. Ask Agent</h5>
        <p>An AI assistant helps answer questions about your dataset.</p>
        <h6>How to Use</h6>
            <ul>
                <li>Type your question (e.g., "What was the best-selling product last month?").</li>
                <li>The LLM analyzes your data and provides:</li>
                    <ul>
                        <li><b>Answer:</b> (e.g., "Product X sold 500 units.")</li>
                    </ul>
            </ul>
    </div>
    </div>
  )
}
