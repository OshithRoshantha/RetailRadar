import joblib
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from models.demandForcastModel import trainProphetModel

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

def demandPredict():
    models, categorySeriesData = trainProphetModel()
    categorySeriesData['Date'] = pd.to_datetime(categorySeriesData['Date'])
    predictions = {}
    for category, model in models.items():
        categoryData = categorySeriesData[categorySeriesData['Product_Category'] == category]
        prophetData = categoryData[['Date', 'Total_Purchases']].rename(columns={'Date': 'ds', 'Total_Purchases': 'y'})
        lastDate = prophetData['ds'].max()
        future = model.make_future_dataframe(periods=30, include_history=False)
        future = future[future['ds'] > lastDate]
        forecast = model.predict(future)
        predictions[category] = forecast[['ds', 'yhat']].assign(Product_Category=category)
    
    allPredictions = pd.concat(predictions.values())
    totalSales30Days = allPredictions.groupby('Product_Category')['yhat'].sum().round().astype(int).reset_index()
    totalSales30Days.columns = ['Product_Category', 'Sales']
    
    next7Days = allPredictions[allPredictions['ds'] <= (allPredictions['ds'].min() + pd.Timedelta(days=6))]
    totalSales7Days = next7Days.groupby('Product_Category')['yhat'].sum().round().astype(int).reset_index()
    totalSales7Days.columns = ['Product_Category', 'Saless']
    response = {
        "nextWeek": totalSales7Days.to_json(),
        "nextMonth": totalSales30Days.to_json()
    }
    return response
    