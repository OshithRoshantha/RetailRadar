from pydantic import BaseModel
from datetime import datetime

class customerInsight(BaseModel):
    genderWise: dict
    ageWise: dict
    incomeWise: dict
    segmentsByRevenue: dict
    
class geographicInsight(BaseModel):
    citiesBySales: dict
    customerOverCountries: dict
    
class salesInsight(BaseModel):
    monthlyRevenue: dict
    yearlyRevenue: dict
    topPopularCategories: dict
    avgOrderValue: float
    
class productInsight(BaseModel):
    topHighRated: dict
    lowestRated: dict
    topFrequent: dict
    
class operationalInsight(BaseModel):
    mostUsedPaymentMethod: dict
    mostUsedShippingMethod: dict
    orderStatusDistribution: dict
    deliverySuccessRate: float
    shippedDeliverRatio: float
    
class preProcessResponse(BaseModel):
    ProcessedRows: int
    startDate: datetime
    endDate: datetime
    customerInsights: customerInsight
    geographicInsights: geographicInsight
    salesInsights: salesInsight
    productInsights: productInsight
    operationalInsights: operationalInsight
        

    