from pyspark.sql import functions as F
import pandas as pd
from sklearn.model_selection import train_test_split
import joblib

def clvPreProcess(data):
    dfGrouped = data.groupBy('Customer_ID').agg('Customer_Segment').alias('Type'), F.round(F.sum("Total_Amount") ,2).alias("Total_Spend"), F.sum("Total_Purchases").alias("Total_Purchases"), F.min("Date").alias("First_Purchase_Date"), F.max("Date").alias("Last_Purchase_Date"))
    lifeSpanDf = dfGrouped.withColumn('Lifespan', F.round(((F.datediff(F.col("Last_Purchase_Date"), F.col("First_Purchase_Date")))/365), 2))
    lifeSpanDf = lifeSpanDf.drop('First_Purchase_Date', 'Last_Purchase_Date', 'Customer_ID')
    clvDf = lifeSpanDf.withColumn('CLV', F.round(((F.col('Total_Purchases'))/(F.col('Lifespan')))*(F.col('Total_Spend')), 2))
    clvDf.write.parquet('data/processed/model/clvData.parquet', mode='overwrite')