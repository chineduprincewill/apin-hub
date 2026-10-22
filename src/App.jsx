import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ThemeToggle from "./components/theme-toggle"
import Footer from "./components/footer"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./auth-pages/layout/protected-route";
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster as Sonner, Toaster } from "./components/ui/sonner"; 
import DefaultLayout from "./auth-pages/layout/DefaultLayout";
import Settings from "./auth-pages/settings/settings";
import AppContextProvider from "./context/AppContext";
import { setupAxiosInterceptors } from "./utils/axiosConfig";
import { useEffect } from "react";
import SignUp from "./public/sign-up";
import Home from "./public/home";
import Dashboard from "./auth-pages/dashboard/dashboard";
import Platforms from "./auth-pages/platforms/platforms";
import Users from "./auth-pages/users/users";

function App() {

  
  const queryClient = new QueryClient();
  
  useEffect(() => {
      setupAxiosInterceptors(() => {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          window.location.href = '/';
          alert('Your session has expired. Please log in again.');
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <ThemeToggle />
        <div className='w-full'>
          <TooltipProvider>
            <Router>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route element={<ProtectedRoute><DefaultLayout /></ProtectedRoute>}>
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                  <Route path="/platforms" element={<ProtectedRoute><Platforms /></ProtectedRoute>} />
                  <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                </Route>
              </Routes>
            </Router>
            <Sonner position="top-right" />
          </TooltipProvider>
          <Footer />
        </div>
      </AppContextProvider>
    </QueryClientProvider>
  )
}

export default App
