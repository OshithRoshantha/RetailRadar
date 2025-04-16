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
import predictError from '../assets/img/error.jpg'

  export default function Analytics() {
    const data = JSON.parse(sessionStorage.getItem('analyticsData') || 'null');

    if (!data) {
      return (
        <div className="w-full h-full overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-hide py-3 px-5">
            <div className='flex flex-col items-center justify-center h-full'>
              <img
                src={predictError}
                alt="Image"
              />
              <p className='text-gray-500 pt-5'>To view analytics data, please initialize the application first. Currently, no analytics information is available to display.</p>
            </div>
          </div>
        </div>
      );
  }
    
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const transactions = data.ProcessedRows;
    
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
        <div className="flex gap-3">
        <div className="bg-white p-4 rounded-lg shadow w-[350px]">
          <h3 className="text-gray-500 text-sm font-medium">Total Transactions</h3>
          <p className="text-6xl font-bold text-blue-800">{transactions.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow w-[350px]">
          <h3 className="text-gray-500 text-sm font-medium">Start Date</h3>
          <p className="text-2xl font-bold text-[#6b67a0]">{formattedStartDate}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow w-[350px]">
          <h3 className="text-gray-500 text-sm font-medium">End Date</h3>
          <p className="text-2xl font-bold text-[#6b67a0]">{formattedEndDate}</p>
        </div>
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
  
