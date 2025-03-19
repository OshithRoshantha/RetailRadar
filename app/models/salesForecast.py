from pyspark.sql import functions as F
from config.globalSession import spark

def salesDataPreProcess(data):
    groupedDf = data.groupBy('Date').agg(F.sum(F.col('Total_Amount')).alias('Total_Sales')).orderBy('Date')
    minDate, maxDate = data.select(F.min("Date"), F.max("Date")).first()
    newDf = spark.range(0, (maxDate - minDate).days + 1).withColumn("Date", F.date_add(F.lit(minDate), F.col("id").cast("int"))).drop("id")
    resultDf = newDf.join(groupedDf, on="Date", how="left")
    resultDf = resultDf.fillna(0, subset=["Total_Sales"])
    orderedDf = resultDf.orderBy("Date")
    orderedDf.write.parquet('data/processed/model/salesTimeSeriesData.parquet', mode='overwrite')
    
def trainLSTMModel():
    
    