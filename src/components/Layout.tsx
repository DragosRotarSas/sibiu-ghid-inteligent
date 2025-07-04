
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <main className="flex-1 flex flex-col">
        <header className="h-14 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
          <SidebarTrigger className="ml-0" />
          <div className="ml-4">
            <h1 className="font-semibold text-lg text-foreground">Iris - Asistentul Tău Personal</h1>
          </div>
        </header>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
