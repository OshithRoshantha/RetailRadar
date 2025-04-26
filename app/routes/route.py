from fastapi import APIRouter
from fastapi import UploadFile, File
from src.preProcessing import initialProcessing
from src.predictions import churnPredict, clvPredict, demandPredict, salesPredict
from models.churnModel import trainChurnModel
from models.clvModel import trainClvModel
from models.salesForecastModel import trainLSTMModel
from models.llm.langChain import initializeAgent
from src.schema.inputSchema import churnInput, clvInput, scrapeInput, llmInput
from src.schema.responseSchema import churnResponse, clvResponse, demandResponse, salesResponse, scrapeResponse
from src.schema.preProcessingSchema import initialResponse
from src.scraping.aliexpress import initializeScraping
from pathlib import Path

rrRouter = APIRouter(prefix="/retailradar")
 
agent = initializeAgent()

@rrRouter.post('/uploader')
async def uploadFile(file: UploadFile = File(...)):
    targetDir = Path("./data/raw/")
    targetDir.mkdir(parents=True, exist_ok=True)
    targetPath = targetDir / 'retail_data.csv'
    
    with open(targetPath, "wb") as f:
        content = await file.read()
        f.write(content)

@rrRouter.get('/initialize')
def intializeProcessing() -> initialResponse:
    return initialProcessing()

@rrRouter.get('/models')
def checkAvailability() -> dict:
    model1 = Path('data/processed/model/churnModel.pkl').exists()
    model2 = Path('data/processed/model/clvModel.pkl').exists()
    model3 = Path('data/processed/model/lstmModel.pkl').exists()
    if model1 and model2 and model3:
        return {'models': 'available'}
    else:
        return {'models': 'unavailable'}

@rrRouter.get('/train')
def trainModels() -> dict:
    model1 = trainChurnModel()
    model2 = trainClvModel()
    model3 = trainLSTMModel()
    return {'model1': model1, 'model2': model2, 'model3':model3}

@rrRouter.post('/predict/churn')
def model1(data: churnInput) -> churnResponse:
    return churnPredict(data.model_dump())

@rrRouter.post('/predict/clv')
def model2(data: clvInput) -> clvResponse:
    return clvPredict(data.model_dump())

@rrRouter.get('/predict/demand')
def model3() -> demandResponse:
    return demandPredict()

@rrRouter.get('/predict/sales')
def model4() -> salesResponse:
    return salesPredict()

@rrRouter.post('/scrape')
async def intializeScraping() -> scrapeResponse:
    results = await initializeScraping()
    return results

@rrRouter.post('/askAgent')
def llm(data: llmInput) -> str:
    return agent.run(data.question)


