from pyspark.sql import functions as F

def customerInsights(df):
    uniqueCustomers = df.dropDuplicates(['Customer_ID'])
    uniqueCustomers.cache()

    genderDistribution = uniqueCustomers.groupBy("Gender").count()
    ageGroupDf = uniqueCustomers.withColumn(
        'age_group',
        F.when(df['age'] < 20, 'Under 20')
        .when((df['age'] >= 20) & (df['age'] < 30), '20-29')
        .when((df['age'] >= 30) & (df['age'] < 40), '30-39')
        .when((df['age'] >= 40) & (df['age'] < 50), '40-49')
        .when((df['age'] >= 50) & (df['age'] < 60), '50-59')
        .when(df['age'] >= 60, '60+')
        .otherwise('Unknown')
    )
    ageGrouped = ageGroupDf.groupBy('age_group').count()
    incomeDistribution = uniqueCustomers.groupBy("Income").count() 
    topSegmentsByRevenue = df.groupBy("Customer_Segment").agg(F.sum("Total_Amount").alias("Total_Revenue")).orderBy(F.desc("Total_Revenue"))
    
    response = {
        'genderWise': [row.asDict() for row in genderDistribution.toLocalIterator()],
        'ageWise': [row.asDict() for row in ageGrouped.toLocalIterator()],
        'incomeWise': [row.asDict() for row in incomeDistribution.toLocalIterator()],
        'segmentsByRevenue': [row.asDict() for row in topSegmentsByRevenue.toLocalIterator()]
    }
    return response

def geographicInsights(df):
    topCitiesBySales = df.groupBy('City').agg(F.sum("Total_Amount").alias("Total_Sales")).orderBy(F.desc("Total_Sales")).limit(10)
    customerOverCountries = df.groupBy("Country").agg(F.countDistinct("Customer_ID").alias("Customer_Count")).orderBy(F.desc("Customer_Count"))
    
    response = {
        'citiesBySales': [row.asDict() for row in topCitiesBySales.toLocalIterator()],
        'customerOverCountries': [row.asDict() for row in customerOverCountries.toLocalIterator()]
    }
    return response

def salesInsights(df):
    dfTemp = df.withColumn("tempYear", F.year(df["Date"]))
    maxYear = dfTemp.select(F.max("tempYear")).collect()[0][0]
    monthlyRevenue = dfTemp.where(F.col('tempYear')==maxYear).groupBy('Month').agg(F.sum("Total_Amount").alias("Total_Revenue")).orderBy('Month')
    
    topPopularCategories = df.groupBy("Product_Category").count().orderBy(F.desc("count")).limit(5)
    avgOrderValue = (df.agg(F.sum("Total_Amount")).collect()[0][0])/(df.agg(F.sum("Total_Purchases")).collect()[0][0])  
    yearlyRevenue = df.withColumn("tempYear", F.year(df["Date"])).groupBy("tempYear").agg(F.sum("Total_Amount").alias("Total_Revenue")).orderBy("tempYear")
    
    response = {
        'monthlyRevenue': [row.asDict() for row in monthlyRevenue.toLocalIterator()],
        'yearlyRevenue': [row.asDict() for row in yearlyRevenue.toLocalIterator()],
        'topPopularCategories': [row.asDict() for row in topPopularCategories.toLocalIterator()],
        'avgOrderValue': avgOrderValue
    }
    return response

def productInsights(df):
    ratings = df.groupBy("Product_Type").agg(F.avg("Ratings").alias("Avg_Rating"))
    topHighRated = ratings.orderBy(F.desc("Avg_Rating")).limit(5)
    lowestRated = ratings.orderBy('Avg_Rating').limit(5)
    
    topFrequent = df.groupBy("Product_Type").count().orderBy(F.desc("count")).limit(5)
    
    response = {
        'topHighRated': [row.asDict() for row in topHighRated.toLocalIterator()],
        'lowestRated': [row.asDict() for row in lowestRated.toLocalIterator()],
        'topFrequent': [row.asDict() for row in topFrequent.toLocalIterator()]
    }
    return response

def operationalInsights(df):
    mostUsedPaymentMethod = df.groupBy("Payment_Method").count().orderBy(F.desc("count")).limit(1)
    mostUsedShippingMethod = df.groupBy("Shipping_Method").count().orderBy(F.desc("count")).limit(1)
    orderStatusDistribution = df.groupBy('Order_Status').count()
    deliverySuccessRate = ((df.filter(F.col("Order_Status") == "Delivered").count())/(df.count()))*100
    shippedDeliverRatio = (df.filter(F.col("Order_Status") == "Shipped").count())/(df.filter(F.col("Order_Status") == "Delivered").count())
    
    response = {
        'mostUsedPaymentMethod': [row.asDict() for row in mostUsedPaymentMethod.toLocalIterator()],
        'mostUsedShippingMethod': [row.asDict() for row in mostUsedShippingMethod.toLocalIterator()],
        'orderStatusDistribution': [row.asDict() for row in orderStatusDistribution.toLocalIterator()], 
        'deliverySuccessRate': deliverySuccessRate,
        'shippedDeliverRatio': shippedDeliverRatio
    }
    return response