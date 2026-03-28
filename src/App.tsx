import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

// DHYAN DE: Agar AdminPanel 'pages' folder me hai toh ye line use kar, 
// agar 'components' folder me hai toh "./components/AdminPanel.tsx" likhna.
import AdminPanel from "./components/AdminPanel.tsx"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* YAHAN HUMNE ADMIN PANEL KA ROUTE ADD KIYA HAI */}
          <Route path="/admin" element={<AdminPanel />} />
          
          {/* Catch-all route hamesha last me hona chahiye */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
