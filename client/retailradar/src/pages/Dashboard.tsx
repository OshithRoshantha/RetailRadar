import Analytics from "@/components/Analytics";
import { AppSidebar } from "@/components/app-sidebar"
import AskAgent from "@/components/AskAgent";
import LogoutConfirmation from "@/components/ConfirmLogout";
import GettingStart from "@/components/GettingStart";
import Predictions from "@/components/Predictions";
import ProductSearch from "@/components/ProductSearch";
import { SiteHeader } from "@/components/site-header"
import TrainModels from "@/components/TrainModels";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import UserManual from "@/components/UserManual";
import * as React from "react"

export default function Dashboard() {

  const [selectedItem, setSelectedItem] = React.useState<string>("Instruction Manual");
  console.log("Selected Item:", selectedItem);
  const renderComponent = () => {
    switch (selectedItem) {
      case "Instruction Manual":
        return <UserManual />;
      case "Analytics":
        return <Analytics />;
      case "Ask Agent":
        return <AskAgent />;
      case "Getting Started":
        return <GettingStart />;
      case "Product Search":
        return <ProductSearch/>;
      case "Predictions":
        return <Predictions/>;
      case "Train Models":
        return <TrainModels/>;
    }
  };

  const [showLogoutConfirmation, setShowLogoutConfirmation] = React.useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/'
    setShowLogoutConfirmation(false);
  };

  return (
    <div>
        <div className="main-hero">
        <LogoutConfirmation
            isOpen={showLogoutConfirmation}
            onConfirm={handleLogout}
            onCancel={() => setShowLogoutConfirmation(false)}
        /> 
        <SidebarProvider>
        <AppSidebar variant="inset" setSelectedItem={setSelectedItem} setShowLogoutConfirmation={setShowLogoutConfirmation}/>
        <SidebarInset>
            <SiteHeader selectedItem={selectedItem}/>
            <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              {renderComponent()}
            </div>
            </div>
        </SidebarInset>
        </SidebarProvider>
        </div>
    </div>
  )
}
