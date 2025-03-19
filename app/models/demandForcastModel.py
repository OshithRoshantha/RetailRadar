from pyspark.sql import functions as F
from config.globalSession import spark
import pandas as pd
from prophet import Prophet

def demandDataPreProcess(data):
    df = data.groupBy("Product_Category", "Date").agg(F.sum(F.col('Total_Purchases')).alias("Total_Purchases")).orderBy("Date", "Product_Category")
    df.createOrReplaceTempView("sales_data")
    minMaxDates = spark.sql("""
        SELECT 
            Product_Category, 
            MIN(Date) AS min_date, 
            MAX(Date) AS max_date 
        FROM sales_data 
        GROUP BY Product_Category
    """)
    minMaxDates.createOrReplaceTempView("minMaxDates")
    dateSeries = spark.sql("""
        SELECT 
            Product_Category, 
            date_add(min_date, idx) AS Date
        FROM (
            SELECT 
                Product_Category, 
                min_date, 
                max_date, 
                posexplode(
                    split(space(datediff(max_date, min_date)), ' ')
                ) AS (idx, _)
            FROM minMaxDates
        )
    """)
    dateSeries.createOrReplaceTempView("dateSeries")
    dfFilled = spark.sql("""
        SELECT 
            ds.Product_Category, 
            ds.Date, 
            COALESCE(sd.Total_Purchases, 0) AS Total_Purchases
        FROM dateSeries ds
        LEFT JOIN sales_data sd
        ON ds.Product_Category = sd.Product_Category AND ds.Date = sd.Date
    """)
    dfFilled.createOrReplaceTempView("filled_data")
    dfFilled.write.parquet('data/processed/model/demandTimeSeriesData.parquet', mode='overwrite')
    
def trainProphetModel():
    dfFilled = pd.read_parquet('data/processed/model/demandTimeSeriesData.parquet', engine='pyarrow')
    dfFilled['Date'] = pd.to_datetime(dfFilled['Date'])
    models = {}
    for category in dfFilled['Product_Category'].unique():
        categoryData = dfFilled[dfFilled['Product_Category'] == category]
        prophetData = categoryData[['Date', 'Total_Purchases']].rename(columns={'Date': 'ds', 'Total_Purchases': 'y'})
        model = Prophet()
        model.fit(prophetData)
        models[category] = model
    return models, dfFilled