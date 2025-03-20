from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class GenderWise(BaseModel):
    Gender: str
    count: int

class AgeWise(BaseModel):
    age_group: str
    count: int

class IncomeWise(BaseModel):
    Income: str
    count: int

class SegmentsByRevenue(BaseModel):
    Customer_Segment: str
    Total_Revenue: float

class CitiesBySales(BaseModel):
    City: str
    Total_Sales: float

class CustomerOverCountries(BaseModel):
    Country: str
    Customer_Count: int

class MonthlyRevenue(BaseModel):
    Month: str
    Total_Revenue: float

class YearlyRevenue(BaseModel):
    tempYear: int
    Total_Revenue: float

class TopPopularCategories(BaseModel):
    Product_Category: str
    count: int

class ProductTypeAvgRating(BaseModel):
    Product_Type: str
    Avg_Rating: float

class ProductTypeCount(BaseModel):
    Product_Type: str
    count: int

class MostUsedPaymentMethod(BaseModel):
    Payment_Method: str
    count: int

class MostUsedShippingMethod(BaseModel):
    Shipping_Method: str
    count: int

class OrderStatusDistribution(BaseModel):
    Order_Status: str
    count: int

class Insights(BaseModel):
    genderWise: List[GenderWise]
    ageWise: List[AgeWise]
    incomeWise: List[IncomeWise]
    segmentsByRevenue: List[SegmentsByRevenue]

class GeographicInsights(BaseModel):
    citiesBySales: List[CitiesBySales]
    customerOverCountries: List[CustomerOverCountries]

class SalesInsights(BaseModel):
    monthlyRevenue: List[MonthlyRevenue]
    yearlyRevenue: List[YearlyRevenue]
    topPopularCategories: List[TopPopularCategories]
    avgOrderValue: float

class ProductInsights(BaseModel):
    topHighRated: List[ProductTypeAvgRating]
    lowestRated: List[ProductTypeAvgRating]
    topFrequent: List[ProductTypeCount]

class OperationalInsights(BaseModel):
    mostUsedPaymentMethod: List[MostUsedPaymentMethod]
    mostUsedShippingMethod: List[MostUsedShippingMethod]
    orderStatusDistribution: List[OrderStatusDistribution]
    deliverySuccessRate: float
    shippedDeliverRatio: float

class CustomerInsights(BaseModel):
    genderWise: List[GenderWise]
    ageWise: List[AgeWise]
    incomeWise: List[IncomeWise]
    segmentsByRevenue: List[SegmentsByRevenue]

class initialResponse(BaseModel):
    ProcessedRows: int
    startDate: datetime
    endDate: datetime
    customerInsights: CustomerInsights
    geographicInsights: GeographicInsights
    salesInsights: SalesInsights
    productInsights: ProductInsights
    operationalInsights: OperationalInsights
