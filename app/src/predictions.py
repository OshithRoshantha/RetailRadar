import joblib
import pandas as pd
from sklearn.preprocessing import MinMaxScaler

def churnPredict(input):
    model = joblib.load('data/processed/model/churnModel.pkl')
    input = pd.DataFrame(input)
    churnPrediction = model.predict(input)[0]
    churnProbability = model.predict_proba(input)[0, 1]
    
    response = {
        'prediction': int(churnPrediction),
        'probability': float(churnProbability)
    }
    return response

def clvPredict(input):
    model = joblib.load('data/processed/model/clvModel.pkl')
    scaler = joblib.load('data/processed/model/clvScaler.pkl')
    input = pd.DataFrame([input])
    inputDf = pd.get_dummies(input, columns=['Type'], dtype=int)
    
    requiredColumns = ['Total_Spend', 'Total_Purchases', 'Lifespan', 'Type_New', 'Type_Premium', 'Type_Regular']
    for col in requiredColumns:
        if col not in inputDf.columns:
            inputDf[col] = 0
    
    inputDf = inputDf[requiredColumns]
    inputScaled = scaler.transform(inputDf)
    prediction = model.predict(inputScaled)[0]
    response = {
        "predictedClv": float(prediction)
    }
    return response