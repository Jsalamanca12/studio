"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, LayoutDashboard } from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <Link href="/report" className="flex items-center gap-2">
                <Icons.logo className="size-7 text-primary" />
                <span className="text-lg font-semibold">SchoolSafe</span>
              </Link>
              <SidebarTrigger className="ml-auto" />
            </div>
          </SidebarHeader>
          <SidebarMenu className="flex-1">
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/report"
                isActive={pathname.startsWith("/report")}
                tooltip="Report Incident"
                asChild
              >
                <Link href="/report">
                  <Book />
                  <span>Report Incident</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/dashboard"
                isActive={pathname.startsWith("/dashboard")}
                tooltip="Dashboard"
                asChild
              >
                <Link href="/dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarFooter>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Avatar>
                  <AvatarImage src="https://placehold.co/40x40" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">Admin User</span>
                    <Link href="/login" className="text-xs text-muted-foreground hover:text-primary">
                        Logout
                    </Link>
                </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>{children}</SidebarInset>
      </div>
    </SidebarProvider>
  );
}
