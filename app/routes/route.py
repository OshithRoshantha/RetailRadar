from flask import Blueprint, request, jsonify
from src.preProcessing import initialProcessing

rrBlueprint=Blueprint('retailradar', __name__)

@rrBlueprint.route('/initialize', methods=["GET"])
def intializeProcessing():
    return initialProcessing()
