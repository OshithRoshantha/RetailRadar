from pyspark.sql import functions as F
import pandas as pd
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
import joblib

def churnPreProcess(data):
    latestDate = data.select(F.max('Date')).collect()[0][0]
    dfGrouped = df.groupBy("Customer_ID").agg(
        F.array_sort(F.collect_list("Date")).alias("Purchase_Dates"),
        F.round(F.sum("Total_Amount") ,2).alias("Total_Spend"),
        F.sum("Total_Purchases").alias("Total_Purchases")
    )
    dfGrouped = dfGrouped.withColumn("Last_Purchase", F.element_at(F.col("Purchase_Dates"), -1)) \
                        .withColumn("Second_Last_Purchase", F.when(F.size(F.col("Purchase_Dates")) > 1, 
                                                                    F.element_at(F.col("Purchase_Dates"), -2)))

    dfGrouped = dfGrouped.withColumn("Recency", 
                                    F.when(F.col("Second_Last_Purchase").isNull(), 0)
                                    .otherwise(F.datediff(F.col("Last_Purchase"), F.col("Second_Last_Purchase"))))
    dfGrouped = dfGrouped.drop('Purchase_Dates')
    dfGrouped = dfGrouped.where(F.col('Recency')>0)
    churnDf = dfGrouped.withColumn(
        "Churn", 
        F.when(F.datediff(F.lit(latestDate), F.col("Last_Purchase")) > 90, 1).otherwise(0)
    )
    churnDf = churnDf.withColumn('Avg_Order_Value', F.round(F.col('Total_Spend') / F.col('Total_Purchases'), 2))
    churnDf = churnDf.drop('Last_Purchase', 'Second_Last_Purchase', 'Customer_ID')
    churnDf.write.parquet('data/processed/model/churnData.parquet', mode='overwrite')
    
def trainChurnModel():
    df = pd.read_parquet('data/processed/model/churnData.parquet', engine='pyarrow')
    
    X = df.drop(columns=['Churn'])
    y = df['Churn']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = XGBClassifier(random_state=42, eval_metric="logloss")
    model.fit(X_train, y_train)
    joblib.dump(model, 'data/processed/model/churnModel.pkl')
    
