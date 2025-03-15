from pyspark.sql import functions as F
import pandas as pd
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
import joblib

def clvPreProcess(data):
    dfGrouped = data.groupBy('Customer_ID').agg(
        F.first('Customer_Segment').alias('Type'), 
        F.round(F.sum("Total_Amount"), 2).alias("Total_Spend"),
        F.sum("Total_Purchases").alias("Total_Purchases"),
        F.min("Date").alias("First_Purchase_Date"),
        F.max("Date").alias("Last_Purchase_Date")
    )
    lifeSpanDf = dfGrouped.withColumn('Lifespan', F.round(((F.datediff(F.col("Last_Purchase_Date"), F.col("First_Purchase_Date")))/365), 2))
    lifeSpanDf = lifeSpanDf.drop('First_Purchase_Date', 'Last_Purchase_Date', 'Customer_ID')
    clvDf = lifeSpanDf.withColumn('CLV', F.round(((F.col('Total_Purchases'))/(F.col('Lifespan')))*(F.col('Total_Spend')), 2))
    clvDf = clvDf.where(F.col('Lifespan') != 0)
    clvDf.write.parquet('data/processed/model/clvData.parquet', mode='overwrite')
    
def trainClvModel():
    df = pd.read_parquet('data/processed/model/clvData.parquet', engine='pyarrow')
    df = pd.get_dummies(df, columns=['Type'], dtype=int)
    
    X = df[['Total_Spend', 'Total_Purchases', 'Lifespan', 'Type_New', 'Type_Premium', 'Type_Regular']]
    y = df['CLV']
    scaler = MinMaxScaler()
    X_scaled = scaler.fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
    
    model = XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=6, random_state=42)
    model.fit(X_train, y_train)
    joblib.dump(model, 'data/processed/model/clvModel.pkl')
    joblib.dump(scaler, 'data/processed/model/clvScaler.pkl')
    return 'Model2 Trained!'