import {
  Card,
  CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { GenderDistribution } from "./Gender"
import { AgeDistribution } from "./Age"
import { IncomeDistribution } from "./Income"
import { RevenueSegments } from "./Revenue"
import { CitySales } from "./Geographic"
import { CustomersByCountryMap } from "./GeographicCountries"
import { MonthlyRevenueChart } from "./MonthlyRevenue"
import { YearlyRevenueChart } from "./YearlyRevenue"
import { TopCategoriesChart } from "./TopCategories"
import { ProductRatingsChart } from "./ProductRatings"
import { OrderStatusChart } from "./OrderStatus"
import { DeliveryMetrics } from "./Delivery"

  export default function Analytics() {
    const startDate = new Date("2001-01-24T00:00:00")
    const endDate = new Date("2024-02-29T00:00:00")
    const transactions = 522456

    const data = {
        customerInsights: {
            "genderWise": [
                {
                    "Gender": "Female",
                    "count": 32591
                },
                {
                    "Gender": "Male",
                    "count": 53689
                }
            ],
            "ageWise": [
                {
                    "age_group": "30-39",
                    "count": 12389
                },
                {
                    "age_group": "20-29",
                    "count": 36027
                },
                {
                    "age_group": "60+",
                    "count": 8031
                },
                {
                    "age_group": "40-49",
                    "count": 15967
                },
                {
                    "age_group": "Under 20",
                    "count": 5664
                },
                {
                    "age_group": "50-59",
                    "count": 8202
                }
            ],
            "incomeWise": [
                {
                    "Income": "High",
                    "count": 21391
                },
                {
                    "Income": "Low",
                    "count": 27508
                },
                {
                    "Income": "Medium",
                    "count": 37381
                }
            ],
            "segmentsByRevenue": [
                {
                    "Customer_Segment": "Regular",
                    "Total_Revenue": 191527952.18494225
                },
                {
                    "Customer_Segment": "New",
                    "Total_Revenue": 118515704.15899372
                },
                {
                    "Customer_Segment": "Premium",
                    "Total_Revenue": 82654961.53085995
                }
            ]},
        geographicInsights: {
            "citiesBySales": [
                {
                    "City": "Chicago",
                    "Total_Sales": 28372836.169618607
                },
                {
                    "City": "Portsmouth",
                    "Total_Sales": 26924728.708016396
                },
                {
                    "City": "San Francisco",
                    "Total_Sales": 15874074.634117126
                },
                {
                    "City": "Frankfurt",
                    "Total_Sales": 13510932.646224022
                },
                {
                    "City": "Boston",
                    "Total_Sales": 12366644.036525726
                },
                {
                    "City": "New York",
                    "Total_Sales": 6980997.681756973
                },
                {
                    "City": "Fort Worth",
                    "Total_Sales": 6914907.102074623
                },
                {
                    "City": "London",
                    "Total_Sales": 5758369.665026665
                },
                {
                    "City": "Winnipeg",
                    "Total_Sales": 3085706.3790683746
                },
                {
                    "City": "Plymouth",
                    "Total_Sales": 3074540.642024994
                }
            ],
            "customerOverCountries": [
                {
                    "Country": "USA",
                    "Customer_Count": 57056
                },
                {
                    "Country": "UK",
                    "Customer_Count": 43790
                },
                {
                    "Country": "Germany",
                    "Customer_Count": 38351
                },
                {
                    "Country": "Australia",
                    "Customer_Count": 34191
                },
                {
                    "Country": "Canada",
                    "Customer_Count": 33949
                }
            ]
        },
        salesInsights: {
            "monthlyRevenue": [
            {
                "Month": "April",
                "Total_Revenue": 2985032.3960409164
            },
            {
                "Month": "August",
                "Total_Revenue": 1852115.3086948395
            },
            {
                "Month": "December",
                "Total_Revenue": 33228.60144042969
            },
            {
                "Month": "February",
                "Total_Revenue": 13846249.317204475
            },
            {
                "Month": "January",
                "Total_Revenue": 17145209.30132675
            },
            {
                "Month": "July",
                "Total_Revenue": 1523255.4830551147
            },
            {
                "Month": "June",
                "Total_Revenue": 53193.574310302734
            },
            {
                "Month": "March",
                "Total_Revenue": 46880.344341278076
            },
            {
                "Month": "May",
                "Total_Revenue": 1228377.3318252563
            },
            {
                "Month": "November",
                "Total_Revenue": 47931.81126785278
            },
            {
                "Month": "October",
                "Total_Revenue": 49774.44246292114
            },
            {
                "Month": "September",
                "Total_Revenue": 38083.070404052734
            }
        ],
        "yearlyRevenue": [
            {
                "tempYear": 2001,
                "Total_Revenue": 12947917.647756577
            },
            {
                "tempYear": 2002,
                "Total_Revenue": 12669399.748908997
            },
            {
                "tempYear": 2003,
                "Total_Revenue": 12991884.153577805
            },
            {
                "tempYear": 2004,
                "Total_Revenue": 12785401.809646606
            },
            {
                "tempYear": 2005,
                "Total_Revenue": 12749526.866526604
            },
            {
                "tempYear": 2006,
                "Total_Revenue": 12928685.474289894
            },
            {
                "tempYear": 2007,
                "Total_Revenue": 12903236.704656601
            },
            {
                "tempYear": 2008,
                "Total_Revenue": 13135186.525945663
            },
            {
                "tempYear": 2009,
                "Total_Revenue": 13136610.281612396
            },
            {
                "tempYear": 2010,
                "Total_Revenue": 12685347.156924248
            },
            {
                "tempYear": 2011,
                "Total_Revenue": 12724935.832907677
            },
            {
                "tempYear": 2012,
                "Total_Revenue": 12974866.237421036
            },
            {
                "tempYear": 2023,
                "Total_Revenue": 199216288.45224762
            },
            {
                "tempYear": 2024,
                "Total_Revenue": 38849330.98237419
            }
        ],
        "topPopularCategories": [
            {
                "Product_Category": "Electronics",
                "count": 67737
            },
            {
                "Product_Category": "Grocery",
                "count": 63685
            },
            {
                "Product_Category": "Clothing",
                "count": 52044
            },
            {
                "Product_Category": "Books",
                "count": 51899
            },
            {
                "Product_Category": "Home Decor",
                "count": 51640
            }
        ],
        "avgOrderValue": 255.18402808450534
        },
        "productInsights": {
            "topHighRated": [
                {
                    "Product_Type": "BlueStar AC",
                    "Avg_Rating": 4.394293732460243
                },
                {
                    "Product_Type": "Mitsubishi 1.5 Ton 3 Star Split AC",
                    "Avg_Rating": 3.8780678443020165
                },
                {
                    "Product_Type": "Fridge",
                    "Avg_Rating": 3.467000835421888
                },
                {
                    "Product_Type": "Water",
                    "Avg_Rating": 3.3017432917450007
                },
                {
                    "Product_Type": "Shirt",
                    "Avg_Rating": 3.1430534088957582
                }
            ],
            "lowestRated": [
                {
                    "Product_Type": "Jeans",
                    "Avg_Rating": 3.0670899107755663
                },
                {
                    "Product_Type": "Dress",
                    "Avg_Rating": 3.088407292741658
                },
                {
                    "Product_Type": "Shoes",
                    "Avg_Rating": 3.08970792767733
                },
                {
                    "Product_Type": "Tools",
                    "Avg_Rating": 3.094874977832949
                },
                {
                    "Product_Type": "Shorts",
                    "Avg_Rating": 3.0970873786407767
                }
            ],
            "topFrequent": [
                {
                    "Product_Type": "Water",
                    "count": 23404
                },
                {
                    "Product_Type": "Smartphone",
                    "count": 17490
                },
                {
                    "Product_Type": "Non-Fiction",
                    "count": 17229
                },
                {
                    "Product_Type": "Fiction",
                    "count": 17121
                },
                {
                    "Product_Type": "Juice",
                    "count": 11625
                }
            ]
        },
        "operationalInsights": {
        "mostUsedPaymentMethod": [
            {
                "Payment_Method": "Credit Card",
                "count": 85362
            }
        ],
        "mostUsedShippingMethod": [
            {
                "Shipping_Method": "Same-Day",
                "count": 99167
            }
        ],
        "orderStatusDistribution": [
            {
                "Order_Status": "Shipped",
                "count": 61602
            },
            {
                "Order_Status": "Processing",
                "count": 54157
            },
            {
                "Order_Status": "Delivered",
                "count": 124929
            },
            {
                "Order_Status": "Pending",
                "count": 46317
            }
        ],
        "deliverySuccessRate": 43.528509956272536,
        "shippedDeliverRatio": 0.49309607857262927
        }
    };
  
    const formattedStartDate = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(startDate)
  
    const formattedEndDate = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(endDate)
  
    return (
      <div className="w-full h-full overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-hide py-3 px-5">
          <div className="flex flex-row gap-4">
            <Card className="w-[300px] px-4 bg-blue-800">
              <CardTitle className="font-medium text-blue-200">Total Transactions</CardTitle>
              <h1 className="mt-[-9%] text-white font-bold">{transactions.toLocaleString()}</h1>
            </Card>
            <Card className="w-[350px] px-4 bg-blue-800">
              <CardTitle className="font-medium mt-1 text-blue-200">Start Date</CardTitle>
              <h5 className="mt-[-7%] text-white font-bold">{formattedStartDate}</h5>
            </Card>
            <Card className="w-[350px] px-4 bg-blue-800">
              <CardTitle className="font-medium mt-1 text-blue-200">End Date</CardTitle>
              <h5 className="mt-[-7%] text-white font-bold">{formattedEndDate}</h5>
            </Card>
          </div>
          <Tabs className="w-[800px] pt-4" defaultValue="Customer Insights">
                <TabsList className="grid w-full grid-cols-5 gap-1">
                    <TabsTrigger value="Customer Insights">Customer Insights</TabsTrigger>
                    <TabsTrigger value="Geographic Insights">Geographic Insights</TabsTrigger>
                    <TabsTrigger value="Sales Insights">Sales Insights</TabsTrigger>
                    <TabsTrigger value="Product Insights">Product Insights</TabsTrigger>
                    <TabsTrigger value="Operational Insights">Operational Insights</TabsTrigger>
                </TabsList>
                <TabsContent value="Customer Insights">
                <Card className="w-[1170px]">
                <div className="flex flex-wrap">
                    <div className="w-1/2 p-2 h-1/2">
                    <CardTitle className="font-medium text-blue-500 px-4 pb-3">Gender Distribution</CardTitle>
                    <GenderDistribution data={data.customerInsights.genderWise}/>
                    </div>
                    <div className="w-1/2 p-2 h-1/2">
                    <CardTitle className="font-medium text-blue-500 px-4 pb-3">Age Distribution</CardTitle>
                    <AgeDistribution data={data.customerInsights.ageWise}/>
                    </div>
                    <div className="w-1/2 p-2 h-1/2">
                    <CardTitle className="font-medium text-blue-500 px-4 pb-3">Income Distribution</CardTitle>
                    <IncomeDistribution data={data.customerInsights.incomeWise}/>
                    </div>
                    <div className="w-1/2 p-2 h-1/2">
                    <CardTitle className="font-medium text-blue-500 px-4 pb-3">Revenue by Customer Segment</CardTitle>
                    <RevenueSegments data={data.customerInsights.segmentsByRevenue}/>
                    </div>
                </div>
                </Card>
                </TabsContent>
                <TabsContent value="Geographic Insights">
                    <Card className="w-[1170px]">
                    <div className="flex flex-wrap">
                    <div className="w-1/2 p-2 h-1/2">
                    <CardTitle className="font-medium text-blue-500 px-4 pb-3">Sales by Cities</CardTitle>
                    <CitySales data={data.geographicInsights.citiesBySales}/>
                    </div>
                    <div className="w-1/2 p-2 h-1/2">
                    <CardTitle className="font-medium text-blue-500 px-4 pb-3">Sales by Countries</CardTitle>
                    <CustomersByCountryMap data={data.geographicInsights.customerOverCountries}/>
                    </div>                    
                    </div>                        
                    </Card>
                </TabsContent>
                 <TabsContent value="Sales Insights">
                    <Card className="w-[1170px]">
                    <div className="flex flex-wrap">
                    <div className="w-1/2 p-2 h-1/2">
                    <CardTitle className="font-medium text-blue-500 px-4 pb-3">Monthly Revenue</CardTitle>
                    <MonthlyRevenueChart data={data.salesInsights.monthlyRevenue}/>
                    </div>
                    <div className="w-1/2 p-2 h-1/2">
                    <CardTitle className="font-medium text-blue-500 px-4 pb-3">Yearly Revenue</CardTitle>
                    <YearlyRevenueChart data={data.salesInsights.yearlyRevenue}/>
                    </div>                     
                    </div>                        
                    </Card>
                </TabsContent>
                <TabsContent value="Product Insights">
                    <Card className="w-[1170px]">
                    <div className="flex flex-wrap">
                    <div className="w-1/2 p-2 h-1/2">
                    <CardTitle className="font-medium text-blue-500 px-4 pb-3">Top Product Categories</CardTitle>
                    <TopCategoriesChart data={data.salesInsights.topPopularCategories}/>
                    </div> 
                    <div className="w-1/2 p-2 h-1/2">
                    <CardTitle className="font-medium text-blue-500 px-4 pb-3">Product Ratings Comparison (Top/Lowest 5)</CardTitle>
                    <ProductRatingsChart 
                        topHighRated={data.productInsights.topHighRated} 
                        lowestRated={data.productInsights.lowestRated} 
                    />
                    </div>                     
                    </div>                          
                    </Card>
                </TabsContent>
                <TabsContent value="Operational Insights">
                    <Card className="w-[1170px]">
                    <div className="flex flex-wrap">
                    <div className="w-1/2 p-2 h-1/2">
                    <CardTitle className="font-medium text-blue-500 px-4 pb-3">Order Status Distribution</CardTitle>
                    <OrderStatusChart data={data.operationalInsights.orderStatusDistribution}/>
                    </div> 
                    <div className="w-1/2 p-2 h-1/2">
                    <CardTitle className="font-medium text-blue-500 px-4 pb-3">Delivery Performance</CardTitle>
                    <DeliveryMetrics 
                        successRate={data.operationalInsights.deliverySuccessRate} 
                        ratio={data.operationalInsights.shippedDeliverRatio}
                    />
                    </div>                                         
                    </div>                        
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
      </div>
    )
  }
  
