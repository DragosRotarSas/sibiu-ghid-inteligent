
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Organizer from "./pages/Organizer";
import Reminders from "./pages/Reminders";
import Chat from "./pages/Chat";
import Map from "./pages/Map";
import Security from "./pages/Security";
import SmartCity from "./pages/SmartCity";
import Waste from "./pages/Waste";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/organizer" element={<Layout><Organizer /></Layout>} />
            <Route path="/reminders" element={<Layout><Reminders /></Layout>} />
            <Route path="/chat" element={<Layout><Chat /></Layout>} />
            <Route path="/map" element={<Layout><Map /></Layout>} />
            <Route path="/security" element={<Layout><Security /></Layout>} />
            <Route path="/smart-city" element={<Layout><SmartCity /></Layout>} />
            <Route path="/waste" element={<Layout><Waste /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
