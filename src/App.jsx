import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X, Bell, Calendar, Tool, User, LogOut } from "lucide-react";
import { HomeIcon } from "lucide-react"; // Renamed Home to HomeIcon to avoid conflict
import { motion, AnimatePresence } from "framer-motion";

// Import your page components here
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon size={20} /> },
    { name: "Dashboard", path: "/dashboard", icon: <Bell size={20} /> },
    { name: "Events", path: "/events", icon: <Calendar size={20} /> },
    { name: "Resources", path: "/resources", icon: <Tool size={20} /> },
    { name: "Profile", path: "/profile", icon: <User size={20} /> },
  ];

  return (
    <Router>
      <div className="min-h-screen font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <header className="shadow-md dark:shadow-gray-800 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-xl font-bold">Community Hub</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
              <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                J
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 pt-6 flex">
          {/* Sidebar for mobile - overlay */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleSidebar}
              >
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-lg pt-20"
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <nav className="px-4">
                    <NavLinks 
                      navItems={navItems} 
                      closeSidebar={() => setIsSidebarOpen(false)} 
                    />
                    <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                      <Link 
                        to="/logout" 
                        className="flex items-center gap-4 p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <LogOut size={20} />
                        <span>Logout</span>
                      </Link>
                    </div>
                  </nav>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sidebar for desktop - persistent */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-6 pr-4">
              <nav>
                <NavLinks navItems={navItems} />
                <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Link to="/logout" className="flex items-center gap-4 p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                    <LogOut size={20} />
                    <span>Logout</span>
                  </Link>
                </div>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1 pb-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/events" element={<Events />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

// Navigation links component
function NavLinks({ navItems, closeSidebar }) {
  const location = useLocation();
  
  return (
    <ul className="space-y-2">
      {navItems.map((item) => (
        <li key={item.path}>
          <Link
            to={item.path}
            className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={closeSidebar}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default App;