from pyspark.sql import functions as F
from config.globalSession import spark

def dfPreProcess(data):
    df = df.groupBy("Product_Category", "Date").agg(F.sum(F.col('Total_Purchases')).alias("Total_Purchases")).orderBy("Date", "Product_Category")
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
