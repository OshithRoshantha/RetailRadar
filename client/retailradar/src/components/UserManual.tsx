import { ExampleTable } from './exampleTable'

export default function UserManual() {
  return (
    <div className="w-full h-full overflow-hidden">
    <div className="h-full overflow-y-auto scrollbar-hide py-3 px-5">
        <p>Welcome to the <b>RetailRadar</b>! This tool helps retailers analyze sales data, generate insights, train machine learning models for predictions, track trending products, and interact with an AI agent for data-related queries.</p>
        <h5 className='pt-3'>1.Getting Started</h5>
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
                        <li>Click "Choose File" and select your CSV.</li>
                        <li>Click "Upload" to process the data.</li>
                    </ul>
            </ul>
        <h5 className='pt-3'>2.Analytics</h5>
        <p>After uploading data, go to the "Analytics" tab to explore insights.</p>
        <h5 className='pt-3'>3.Predictions</h5>
        <p>Click "Launch Model Training" to train the models and forecast sales, demand, or customer behavior. <br></br>Predictions appear in a table/graph.</p>
        <h5 className='pt-3'>4.Product Search</h5>
        <p>Get real-time best-selling products from AliExpress (scraped/API-based).</p>
        <h5 className='pt-3'>5.Ask Agent</h5>
        <p>An AI assistant helps answer questions about your dataset.</p>
        <h6>How to Use</h6>
            <ul>
                <li>Type your question (e.g., "What was the best-selling product last month?").</li>
                <li>The LLM analyzes your data and provides:</li>
                    <ul>
                        <li><b>Answer:</b> (e.g., "Product X sold 500 units.")</li>
                    </ul>
            </ul>
        <h5 className='pt-3'>6. Dataset Manager</h5>
        <p>Manage uploaded datasets efficiently.</p>
    </div>
    </div>
  )
}
