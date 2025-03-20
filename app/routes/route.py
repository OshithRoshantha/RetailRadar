from fastapi import APIRouter, HTTPException
from src.preProcessing import initialProcessing
from src.predictions import churnPredict, clvPredict, demandPredict, salesPredict
from models.churnModel import trainChurnModel
from models.clvModel import trainClvModel
from models.salesForecastModel import trainLSTMModel
from src.schema.inputSchema import churnInput, clvInput 
from src.schema.responseSchema import churnResponse, clvResponse, demandRespose, salesResponse

rrRouter=APIRouter(prefix="/retailradar")

@rrRouter.get('/initialize')
def intializeProcessing():
    return initialProcessing()

@rrRouter.get('/train')
def trainModels():
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
def model3() -> demandRespose:
    return demandPredict()

@rrRouter.get('/predict/sales')
def model4() -> salesResponse:
    return salesPredict()

