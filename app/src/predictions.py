import joblib

def churnPredict(input):
    model = joblib.load('churn_model.pkl')
    churnPrediction = model.predict(input)
    churnProbability = model.predict_proba(input)[:, 1]
    
    response = {
        'prediction': churnPrediction,
        'probability': churnProbability
    }
    return response