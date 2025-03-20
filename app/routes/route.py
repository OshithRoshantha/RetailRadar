from fastapi import APIRouter, HTTPException
from src.preProcessing import initialProcessing
from src.predictions import churnPredict, clvPredict, demandPredict, salesPredict
from models.churnModel import trainChurnModel
from models.clvModel import trainClvModel
from models.salesForecastModel import trainLSTMModel

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
def model1(data: dict):
    return churnPredict(data)

@rrRouter.post('/predict/clv')
def model2(data: dict):
    return clvPredict(data)

@rrRouter.get('/predict/demand')
def model3():
    return demandPredict()

@rrRouter.get('/predict/sales')
def model4():
    return salesPredict()

