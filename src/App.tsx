import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LegacyRedirect from "./pages/LegacyRedirect";

const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function RouteFallback() {
  return (
    <div className="flex items-center justify-center py-24" role="status" aria-label="Loading">
      <span className="text-sm text-muted-foreground">Loading…</span>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/namasivaayam-folio">
        <Navbar />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Legacy routes redirect to the matching single-page anchor. */}
            <Route path="/about" element={<LegacyRedirect hash="about" />} />
            <Route path="/experience" element={<LegacyRedirect hash="experience" />} />
            <Route path="/skills" element={<LegacyRedirect hash="skills" />} />
            <Route path="/certifications" element={<LegacyRedirect hash="certificates" />} />
            <Route path="/publications" element={<LegacyRedirect hash="publications" />} />
            <Route path="/blogs" element={<LegacyRedirect hash="writing" />} />
            <Route path="/academic-awards" element={<LegacyRedirect hash="awards" />} />
            <Route path="/contact" element={<LegacyRedirect hash="contact" />} />
            {/* Projects were retired from the nav; old links land on home. */}
            <Route path="/projects" element={<LegacyRedirect hash="top" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
