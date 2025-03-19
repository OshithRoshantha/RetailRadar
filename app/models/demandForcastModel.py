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
    dateSeriesCategory = spark.sql("""
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
    dateSeriesCategory.createOrReplaceTempView("dateSeriesCategory")
    dfFilledCategory = spark.sql("""
        SELECT 
            ds.Product_Category, 
            ds.Date, 
            COALESCE(sd.Total_Purchases, 0) AS Total_Purchases
        FROM dateSeriesCategory ds
        LEFT JOIN sales_data sd
        ON ds.Product_Category = sd.Product_Category AND ds.Date = sd.Date
    """)
    allDates = data.select("Date").distinct()
    allProducts = data.select("Product_Type").distinct()

    completeDf = allDates.crossJoin(allProducts)
    dfComplete = completeDf.join(data, on=["Date", "Product_Type"], how="left").na.fill(0)
    dfFilledCategory.write.parquet('data/processed/model/categoryTimeSeriesData.parquet', mode='overwrite')
    dfComplete.write.parquet('data/processed/model/productTimeSeriesData.parquet', mode='overwrite')
    
def trainProphetModel():
    dfFilledCategory = pd.read_parquet('data/processed/model/categoryTimeSeriesData.parquet', engine='pyarrow')
    dfCompleteProduct = pd.read_parquet('data/processed/model/productTimeSeriesData.parquet', engine='pyarrow')
    products = dfCompleteProduct['Product_Type'].unique()
    dfFilledCategory['Date'] = pd.to_datetime(dfFilledCategory['Date'])
    models = {}
    for category in dfFilledCategory['Product_Category'].unique():
        categoryData = dfFilledCategory[dfFilledCategory['Product_Category'] == category]
        prophetData = categoryData[['Date', 'Total_Purchases']].rename(columns={'Date': 'ds', 'Total_Purchases': 'y'})
        model = Prophet()
        model.fit(prophetData)
        models[category] = model
    return models, dfFilledCategory, products, dfCompleteProduct

def trainProphetModel2(period):
    dfCompleteProduct = pd.read_parquet('data/processed/model/productTimeSeriesData.parquet', engine='pyarrow')
    dfCompleteProduct = dfCompleteProduct.rename(columns={'Date': 'ds', 'Total_Purchases': 'y'})
    model = Prophet()
    model.fit(dfCompleteProduct)
    future = model.make_future_dataframe(periods=period)
    forecast = model.predict(future)
    return forecast[['ds', 'yhat']]
