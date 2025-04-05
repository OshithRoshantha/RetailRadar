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
        geographicInsights: { /*...*/ },
        salesInsights: { /*...*/ }
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
                        
                    </Card>
                </TabsContent>
                 <TabsContent value="Sales Insights">
                    <Card className="w-[1170px]">
                        
                    </Card>
                </TabsContent>
                <TabsContent value="Product Insights">
                    <Card className="w-[1170px]">
                        
                    </Card>
                </TabsContent>
                <TabsContent value="Operational Insights">
                    <Card className="w-[1170px]">
                        
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
      </div>
    )
  }
  
