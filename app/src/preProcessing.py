from pyspark.sql.types import StructType, StructField, StringType, IntegerType, FloatType
from pyspark.sql import functions as F
from pyspark import StorageLevel
from config.globalSession import spark
from src.insights import customerInsights, geographicInsights

def initialProcessing():
    schema = StructType([
        StructField("Transaction_ID", StringType(), False),
        StructField("Customer_ID", StringType(), False),
        StructField("Name", StringType(), True),
        StructField("Email", StringType(), True),
        StructField("Phone", StringType(), True),
        StructField("Address", StringType(), True),
        StructField("City", StringType(), True),
        StructField("State", StringType(), True),
        StructField("Zipcode", StringType(), True),
        StructField("Country", StringType(), True),
        StructField("Age", IntegerType(), True),
        StructField("Gender", StringType(), True),
        StructField("Income", StringType(), True),
        StructField("Customer_Segment", StringType(), True),
        StructField("Date", StringType(), True),
        StructField("Year", IntegerType(), True),
        StructField("Month", StringType(), True),
        StructField("Time", StringType(), True),
        StructField("Total_Purchases", IntegerType(), True),
        StructField("Amount", FloatType(), True),
        StructField("Total_Amount", FloatType(), True),
        StructField("Product_Category", StringType(), True),
        StructField("Product_Brand", StringType(), True),
        StructField("Product_Type", StringType(), True),
        StructField("Feedback", StringType(), True),
        StructField("Shipping_Method", StringType(), True),
        StructField("Payment_Method", StringType(), True),
        StructField("Order_Status", StringType(), True),
        StructField("Ratings", IntegerType(), True),
        StructField("products", StringType(), True)
    ])
    
    rawDf = spark.read.format("csv").schema(schema).option("header", True).option("inferSchema", False).option("mode", "FAILFAST").option("nullValue", "NA").load('data/raw/retail_data.csv')
    rawCount = rawDf.count()
    df = rawDf.dropna()
    
    rawDf.persist(StorageLevel.MEMORY_AND_DISK)
    df.cache()
    
    df = df.dropDuplicates(['Transaction_ID'])
    df = df.drop('Name', 'Email', 'Phone', 'Address', 'State', 'Zipcode', 'Year', 'Month', 'Product_Brand', 'Product_Type', 'Feedback', 'Ratings', 'products')
    df = df.withColumn(
        "Date",
        F.coalesce(
            F.to_date(F.col("Date"), "M/d/yyyy"),   
            F.to_date(F.col("Date"), "MM/dd/yyyy"), 
            F.to_date(F.col("Date"), "yyyy-MM-dd"),
            F.to_date(F.col("Date"), "MM-dd-yy")
        )
    )
    df = df.withColumn(
        "Date",
        F.when(F.year(F.col("Date")) < 1000,  
            F.expr("add_months(Date, 12 * 2000)")) 
        .otherwise(F.col("Date"))
    )
    
    customer = customerInsights(df)
    geo = geographicInsights(df)
    
    minDate, maxDate = df.select(F.min(F.col("Date")), F.max(F.col("Date"))).first()
    response = {
        'ProcessedRows': rawCount,
        'startDate': minDate,
        'endDate': maxDate,
        'customerInsights': customer,
        'geographicInsights': geo
    }
    
    df.write.parquet('data/processed/cleanedData.parquet', mode='overwrite')
    return response
