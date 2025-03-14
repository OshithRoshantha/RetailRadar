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
        'genderWise': genderDistribution.toJSON().collect(),
        'ageWise': ageGrouped.toJSON().collect(),
        'incomeWise': incomeDistribution.toJSON().collect(),
        'segmentsByRevenue': topSegmentsByRevenue.toJSON().collect() 
    }
    return response

def geographicInsights(df):
    topCitiesBySales = df.groupBy('City').agg(F.sum("Total_Amount").alias("Total_Sales")).orderBy(F.desc("Total_Sales")).limit(10)
    customerOverCountries = df.groupBy("Country").agg(F.countDistinct("Customer_ID").alias("Customer_Count")).orderBy(F.desc("Customer_Count"))
    
    response = {
        'citiesBySales': topCitiesBySales.toJSON().collect(),
        'customerOverCountries': customerOverCountries.toJSON().collect()
    }
    return response

def salesInsights(df):
    currentDate = df.select(F.max("Date")).collect()[0][0]
    lastYear = F.date_add(F.lit(currentDate), -365)
    lastYearData = df.filter(F.col("Date") >= lastYear)
    monthlyRevenue = lastYearData.groupBy("Year", "Month").agg(F.sum("Total_Amount").alias("Total_Revenue")).orderBy("Year", "Month").drop('Year')
    
    topPopularCategories = df.groupBy("Product_Category").count().orderBy(F.desc("count")).limit(5)
    avgOrderValue = (df.agg(F.sum("Total_Amount")).collect()[0][0])/(df.agg(F.sum("Total_Purchases")).collect()[0][0])  
    yearlyRevenue = df.groupBy("Year").agg(F.sum("Total_Amount").alias("Total_Revenue")).orderBy("Year")
    
    response = {
        'monthlyRevenue': monthlyRevenue.toJSON().collect(),
        'yearlyRevenue': yearlyRevenue.toJSON().collect(),
        'topPopularCategories': topPopularCategories.toJSON().collect(),
        'avgOrderValue': avgOrderValue
    }
    return response