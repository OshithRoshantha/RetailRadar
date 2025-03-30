import { AppSidebar } from "@/components/app-sidebar"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import * as React from "react"

export default function Dashboard() {

  const [selectedItem, setSelectedItem] = React.useState<string>("Instruction Manual");

  return (
    <div>
        <div className="main-hero">
        <SidebarProvider>
        <AppSidebar variant="inset" setSelectedItem={setSelectedItem}/>
        <SidebarInset>
            <SiteHeader selectedItem={selectedItem}/>
            <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                    
                </div>

                </div>
            </div>
            </div>
        </SidebarInset>
        </SidebarProvider>
        </div>
    </div>
  )
}
