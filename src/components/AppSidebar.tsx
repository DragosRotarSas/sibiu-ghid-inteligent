
import { Calendar, Bell, MessageCircle, Map, Home, Shield, MapPin, Trash2 } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Acasă", url: "/", icon: Home },
  { title: "Organizator Personal", url: "/organizer", icon: Calendar },
  { title: "Amintiri Inteligente", url: "/reminders", icon: Bell },
  { title: "Chat cu Iris", url: "/chat", icon: MessageCircle },
  { title: "Harta Sibiului", url: "/map", icon: Map },
  { title: "Securitate Seniori", url: "/security", icon: Shield },
  { title: "Oraș Inteligent", url: "/smart-city", icon: MapPin },
  { title: "Gunoi Inteligent", url: "/waste", icon: Trash2 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted/70 text-foreground";

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-background border-r border-border">
        <SidebarGroup>
          <SidebarGroupLabel className="text-foreground font-semibold text-sm px-4 py-3">
            Meniu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10 hover:bg-muted/70">
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-5 w-5 text-foreground" />
                      {!isCollapsed && <span className="font-medium text-foreground">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
