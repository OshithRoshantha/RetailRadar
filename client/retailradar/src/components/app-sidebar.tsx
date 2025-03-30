import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconBook,
  IconStairs,
  IconFileAi,
  IconFileDescription,
  IconFolder,
  IconListDetails,
  IconBrain,
  IconBuildingStore,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import mainLogo from '../assets/logo/logo3.png'

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      icon: IconStairs,
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
      title: "Dataset Manager",
      url: "#",
      icon: IconFolder,
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const handleItemClick = (title: string) => {
    console.log("Clicked:", title); 
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
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
