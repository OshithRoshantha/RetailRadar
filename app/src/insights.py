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