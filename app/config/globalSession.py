from pyspark.sql import SparkSession

def getSession():
    spark = SparkSession.builder.appName('retailRadar').getOrCreate()
    spark.conf.set("spark.sql.legacy.timeParserPolicy", "LEGACY")
    return spark

spark = getSession()