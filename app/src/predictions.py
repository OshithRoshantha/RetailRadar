import joblib
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from models.demandForcastModel import trainProphetModel, trainProphetModel2

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
    models, categorySeriesData, products, productSeriesData = trainProphetModel()
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
    
    forecasts7 = {}
    forecasts30 = {}
    
    for product in products:
        productSeriesData = productSeriesData[productSeriesData['Product_Type'] == product]
        forecast7 = trainProphetModel2(7)
        forecast30  = trainProphetModel2(30)
        forecasts7[product] = forecast7
        forecasts30[product] = forecast30 
    
    result1, result2 = filterStep(forecasts7)
    result3, result4 = filterStep(forecasts30)
    response = {
        "nextWeek": totalSales7Days.to_json(),
        "nextMonth": totalSales30Days.to_json(),
        "top-6-products": {
            "nextWeek": result1,
            "nextMonth": result3 
        },
        "least-3-products": {
            "nextWeek": result2,
            "nextMonth": result4
        }
    }
    return response

def filterStep(forecasts):
    total = {}
    for product, forecast in forecasts.items():
        total[product] = forecast['yhat'].sum()
        
    high = sorted(total.items(), key=lambda x: x[1], reverse=True)
    top6 = [product for product, sales in high[:6]]
    low = sorted(total.items(), key=lambda x: x[1])
    least3 = [product for product, sales in low[:3]]
    return top6, least3
    