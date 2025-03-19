from pyspark.sql import functions as F
from config.globalSession import spark
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, ReLU
import joblib

def salesDataPreProcess(data):
    groupedDf = data.groupBy('Date').agg(F.sum(F.col('Total_Amount')).alias('Total_Sales')).orderBy('Date')
    minDate, maxDate = data.select(F.min("Date"), F.max("Date")).first()
    newDf = spark.range(0, (maxDate - minDate).days + 1).withColumn("Date", F.date_add(F.lit(minDate), F.col("id").cast("int"))).drop("id")
    resultDf = newDf.join(groupedDf, on="Date", how="left")
    resultDf = resultDf.fillna(0, subset=["Total_Sales"])
    orderedDf = resultDf.orderBy("Date")
    orderedDf.write.parquet('data/processed/model/salesTimeSeriesData.parquet', mode='overwrite')
    
def createSequences(data):
    X, y = [], []
    for i in range(len(data) - 210):
        X.append(data[i:i + 30])
        y.append(data[i + 30:i + 210])
    return np.array(X), np.array(y)
    
def trainLSTMModel():
    pdf = pd.read_parquet('data/processed/model/salesTimeSeriesData.parquet', engine='pyarrow')
    scaler = MinMaxScaler(feature_range=(0, 1))
    pdf['Total_Sales'] = scaler.fit_transform(pdf[['Total_Sales']])
    X, y = createSequences(pdf['Total_Sales'].values)
    
    train = int(len(X) * 0.8)
    X_train, X_test = X[:train], X[train:]
    y_train, y_test = y[:train], y[train:]

    X_train = X_train.reshape((X_train.shape[0], X_train.shape[1], 1))
    X_test = X_test.reshape((X_test.shape[0], X_test.shape[1], 1))
    
    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=(30, 1)))  
    model.add(LSTM(50, return_sequences=False))  
    model.add(Dense(180)) 
    model.add(ReLU()) 
    
    model.compile(optimizer='adam', loss='mse')
    model.fit(X_train, y_train, epochs=25, batch_size=64, validation_data=(X_test, y_test)) 
    joblib.dump(model, 'data/processed/model/lstmModel.pkl')
    joblib.dump(scaler, 'data/processed/model/lstmScaler.pkl')
    return 'Model3 Trained!'