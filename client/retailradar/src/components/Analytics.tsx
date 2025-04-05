import {
    Card,
    CardTitle,
  } from "@/components/ui/card"
  
  export default function Analytics() {
    const startDate = new Date("2001-01-24T00:00:00")
    const endDate = new Date("2024-02-29T00:00:00")
    const transactions = 522456
  
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
            <Card className="w-[300px] px-4">
              <CardTitle className="text-xl">Total Transactions</CardTitle>
              <h1 className="mt-[-9%] text-blue-800">{transactions.toLocaleString()}</h1>
            </Card>
            <Card className="w-[350px] px-4">
              <CardTitle className="text-xl">Start Date</CardTitle>
              <h2 className="mt-[-9%] text-blue-800">{formattedStartDate}</h2>
            </Card>
            <Card className="w-[350px] px-4">
              <CardTitle className="text-xl">End Date</CardTitle>
              <h2 className="mt-[-9%] text-blue-800">{formattedEndDate}</h2>
            </Card>
          </div>
        </div>
      </div>
    )
  }
  
