from flask import Blueprint, request, jsonify
from src.preProcessing import initialProcessing
from src.predictions import churnPredict
from models.churnModel import trainChurnModel

rrBlueprint=Blueprint('retailradar', __name__)

@rrBlueprint.route('/initialize', methods=["GET"])
def intializeProcessing():
    return initialProcessing()

@rrBlueprint.route('/train', methods=["GET"])
def trainModels():
    return trainChurnModel()

@rrBlueprint.route('/predict/churn', methods=["POST"])
def model1():
    data=request.get_json()
    return churnPredict(data)
