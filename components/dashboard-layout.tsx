"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DashboardMain } from "@/components/dashboard-main"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardMain />
      </SidebarInset>
    </SidebarProvider>
  )
}
