import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import Certifications from "./pages/Certifications";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Tools from "./pages/Tools";
import AcademicAwards from "./pages/AcademicAwards";
import Publications from "./pages/Publications";
import NotFound from "./pages/NotFound";
import Skills from "./pages/Skills";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/namasivaayam-folio">
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/experience" element={<Layout><Experience /></Layout>} />
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/blogs" element={<Layout><Blogs /></Layout>} />
          <Route path="/certifications" element={<Layout><Certifications /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/tools" element={<Layout><Tools /></Layout>} />
          <Route path="/academic-awards" element={<Layout><AcademicAwards /></Layout>} />
          <Route path="/publications" element={<Layout><Publications /></Layout>} />
          <Route path="/skills" element={<Layout><Skills /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
