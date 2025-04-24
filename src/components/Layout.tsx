
import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarMenu, 
  SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter, SidebarTrigger } 
  from "@/components/ui/sidebar";
import { Home, Package, Plus, TruckIcon, ClipboardList, Bell, LogOut } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();

  // Menu items with routes
  const menuItems = [
    { title: "Dashboard", icon: Home, path: "/" },
    { title: "Shipments", icon: Package, path: "/shipments" },
    { title: "Create Shipment", icon: Plus, path: "/create-shipment" },
    { title: "Delivery", icon: TruckIcon, path: "/delivery" },
    { title: "Reports", icon: ClipboardList, path: "/reports" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4">
              <TruckIcon size={24} className="text-sidebar-foreground" />
              <h2 className="text-xl font-bold text-sidebar-foreground">TrackFlow</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link to={item.path} className={location.pathname === item.path ? "bg-sidebar-accent" : ""}>
                      <SidebarMenuButton>
                        <item.icon size={20} />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <div className="bg-primary text-primary-foreground rounded-full h-full w-full flex items-center justify-center">
                    {user?.email.substring(0, 2).toUpperCase() || 'JD'}
                  </div>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-sidebar-foreground">
                    {user?.email.split('@')[0] || 'John Doe'}
                  </p>
                  <p className="text-xs text-sidebar-foreground/80">
                    {user?.role.charAt(0).toUpperCase() + user?.role.slice(1) || 'Manager'}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                <LogOut size={18} />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1">
          <header className="w-full bg-white p-4 border-b flex justify-between items-center">
            <div className="flex items-center">
              <SidebarTrigger>
                <Button variant="ghost" size="icon" className="mr-4 md:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SidebarTrigger>
              <div className="text-xl font-semibold md:hidden">TrackFlow</div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1.5 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </Button>
              <Avatar className="h-8 w-8 md:hidden">
                <div className="bg-primary text-primary-foreground rounded-full h-full w-full flex items-center justify-center">
                  {user?.email.substring(0, 2).toUpperCase() || 'JD'}
                </div>
              </Avatar>
            </div>
          </header>
          <div className="p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
