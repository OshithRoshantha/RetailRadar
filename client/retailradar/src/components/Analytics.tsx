import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function Analytics() {
  return (
    <div className="w-full h-full overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-hide py-3 px-5">
        <Card className="w-[300px] px-4">
            <CardTitle className="text-xl">Total Transcations</CardTitle>
            <h1 className="mt-[-9%]">522,456</h1>
        </Card>
        </div>
    </div>
  )
}
