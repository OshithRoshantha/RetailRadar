from fastapi import APIRouter, Depends
from fastapi import UploadFile, File
from src.preProcessing import initialProcessing
from src.predictions import churnPredict, clvPredict, demandPredict, salesPredict
from models.churnModel import trainChurnModel
from models.clvModel import trainClvModel
from models.salesForecastModel import trainLSTMModel
from models.llm.langChain import initializeAgent
from models.dbUser import user
from models.dbCredential import credential
from src.schema.inputSchema import churnInput, clvInput, llmInput
from src.schema.responseSchema import churnResponse, clvResponse, demandResponse, salesResponse, scrapeResponse
from src.schema.preProcessingSchema import initialResponse
from src.scraping.aliexpress import initializeScraping
from database.dbOpertions import register, authenticate
from src.jwtVerify import currentUser
from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()
EXP = int(os.getenv("EXP"))

rrRouter = APIRouter(prefix="/retailradar")
 
agent = initializeAgent()

def protectedRoute():
    def dependency(currentUser: str = Depends(currentUser)):
        return currentUser
    return Depends(dependency)

@rrRouter.post('/uploader', dependencies=[protectedRoute()])
async def uploadFile(file: UploadFile = File(...)):
    targetDir = Path("./data/raw/")
    targetDir.mkdir(parents=True, exist_ok=True)
    targetPath = targetDir / 'retail_data.csv'
    
    with open(targetPath, "wb") as f:
        content = await file.read()
        f.write(content)

@rrRouter.get('/initialize', dependencies=[protectedRoute()])
def intializeProcessing() -> initialResponse:
    return initialProcessing()

@rrRouter.get('/models', dependencies=[protectedRoute()])
def checkAvailability() -> dict:
    model1 = Path('data/processed/model/churnModel.pkl').exists()
    model2 = Path('data/processed/model/clvModel.pkl').exists()
    model3 = Path('data/processed/model/lstmModel.pkl').exists()
    if model1 and model2 and model3:
        return {'models': 'available'}
    else:
        return {'models': 'unavailable'}

@rrRouter.get('/train', dependencies=[protectedRoute()])
def trainModels() -> dict:
    model1 = trainChurnModel()
    model2 = trainClvModel()
    model3 = trainLSTMModel()
    return {'model1': model1, 'model2': model2, 'model3':model3}

@rrRouter.post('/predict/churn', dependencies=[protectedRoute()])
def model1(data: churnInput) -> churnResponse:
    return churnPredict(data.model_dump())

@rrRouter.post('/predict/clv', dependencies=[protectedRoute()])
def model2(data: clvInput) -> clvResponse:
    return clvPredict(data.model_dump())

@rrRouter.get('/predict/demand', dependencies=[protectedRoute()])
def model3() -> demandResponse:
    return demandPredict()

@rrRouter.get('/predict/sales', dependencies=[protectedRoute()])
def model4() -> salesResponse:
    return salesPredict()

@rrRouter.get('/scrape', dependencies=[protectedRoute()])
async def intializeScraping() -> scrapeResponse:
    results = await initializeScraping()
    return results

@rrRouter.post('/askAgent', dependencies=[protectedRoute()])
def llm(data: llmInput) -> str:
    return agent.run(data.question)

@rrRouter.post('/signup')
async def signUp(user: user):
    await register(user)
    
@rrRouter.post('/login')
async def logIn(input: credential):
    response = await authenticate(input)
    return response