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
    input = pd.DataFrame(input)
    inputDf = pd.get_dummies(input, columns=['Type'], dtype=int)
    scaler = MinMaxScaler()
    inputScaled = scaler.fit_transform(inputDf)
    prediction = model.predict(inputScaled)[0]
    
    response = {
        "predictedClv": round(prediction, 2)
    }
    return response