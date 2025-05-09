import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconBook,
  IconStairs,
  IconFileAi,
  IconFileDescription,
  IconBrain,
  IconBuildingStore,
  IconMessageFilled,
  IconWashDryclean,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import mainLogo from '../assets/logo/logo3.png'

const companyName = sessionStorage.getItem('company');
const companyEmail = sessionStorage.getItem('email');
const avatarUrl = "https://i.pravatar.cc/150?u=a042581f4e29026704d"

const data = {
  user: {
    name: companyName,
    email: companyEmail,
    avatar: avatarUrl,
  },
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      icon: IconStairs,
    },
    {
      title: "Train Models",
      url: "#",
      icon: IconWashDryclean,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Predictions",
      url: "#",
      icon: IconBrain,
    },
    {
      title: "Product Search",
      url: "#",
      icon: IconBuildingStore,
    },
    {
      title: "Ask Agent",
      url: "#",
      icon: IconMessageFilled,
    },
    {
      title: "Instruction Manual",
      url: "#",
      icon: IconBook,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({
    setSelectedItem,
    setShowLogoutConfirmation,
    ...props
  }: React.ComponentProps<typeof Sidebar> & {  
    setSelectedItem: (item: string) => void;
    setShowLogoutConfirmation: (show: boolean) => void;
}) {

  const handleItemClick = (title: string) => {
    setSelectedItem(title);
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
              <img
                src={mainLogo}
                alt="Image"
                className="main-logo2"
                style ={{ marginTop: '20px', marginLeft: '-17px' }}
              />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} onItemClick={handleItemClick} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} setShowLogoutConfirmation={setShowLogoutConfirmation}/>
      </SidebarFooter>
    </Sidebar>
  )
}
