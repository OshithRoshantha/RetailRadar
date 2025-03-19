from flask import Blueprint, request
from src.preProcessing import initialProcessing
from src.predictions import churnPredict, clvPredict, demandPredict
from models.churnModel import trainChurnModel
from models.clvModel import trainClvModel
from models.salesForecastModel import trainLSTMModel

rrBlueprint=Blueprint('retailradar', __name__)

@rrBlueprint.route('/initialize', methods=["GET"])
def intializeProcessing():
    return initialProcessing()

@rrBlueprint.route('/train', methods=["GET"])
def trainModels():
    model1 = trainChurnModel()
    model2 = trainClvModel()
    model3 = trainLSTMModel()
    return {'model1': model1, 'model2': model2, 'model3':model3}

@rrBlueprint.route('/predict/churn', methods=["POST"])
def model1():
    data=request.get_json()
    return churnPredict(data)

@rrBlueprint.route('/predict/clv', methods=["POST"])
def model2():
    data=request.get_json()
    return clvPredict(data)

@rrBlueprint.route('/predict/demand', methods=["GET"])
def model3():
    return demandPredict()


