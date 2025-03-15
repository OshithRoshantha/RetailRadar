from config.globalSession import spark

def getData():
    try:
        df = spark.read.parquet("data/processed/cleanedData.parquet")
        return df
    except Exception as e:
        print(f"Please Initialize Processing")
        return None
    
data = getData()