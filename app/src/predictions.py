import joblib
import pandas as pd

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