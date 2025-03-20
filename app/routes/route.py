from fastapi import APIRouter, HTTPException
from src.preProcessing import initialProcessing
from src.predictions import churnPredict, clvPredict, demandPredict, salesPredict
from src.schemas.preProcessing import preProcessResponse
from src.schemas.predictions import churnResponse, clvResponse, demandResponse, salesResponse
from models.churnModel import trainChurnModel
from models.clvModel import trainClvModel
from models.salesForecastModel import trainLSTMModel

rrRouter=APIRouter(prefix="/retailradar")

@rrRouter.get('/initialize')
def intializeProcessing() -> preProcessResponse:
    return initialProcessing()

@rrRouter.get('/train')
def trainModels() -> dict:
    model1 = trainChurnModel()
    model2 = trainClvModel()
    model3 = trainLSTMModel()
    return {'model1': model1, 'model2': model2, 'model3':model3}

@rrRouter.post('/predict/churn')
def model1(data: dict) -> churnResponse:
    return churnPredict(data)

@rrRouter.post('/predict/clv')
def model2(data: dict) -> clvResponse:
    return clvPredict(data)

@rrRouter.get('/predict/demand')
def model3() -> demandResponse:
    return demandPredict()

@rrRouter.get('/predict/sales')
def model4() -> salesResponse:
    return salesPredict()

