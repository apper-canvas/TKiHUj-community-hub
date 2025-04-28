import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Sun, Moon, Menu, X, Home, Bell, Calendar, Tool, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || 
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { name: "Home", icon: <Home size={20} />, path: "/" },
    { name: "Notifications", icon: <Bell size={20} />, path: "/notifications" },
    { name: "Events", icon: <Calendar size={20} />, path: "/events" },
    { name: "Maintenance", icon: <Tool size={20} />, path: "/maintenance" },
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-900 text-surface-800 dark:text-surface-100 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors md:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CommUnity<span className="font-normal">Hub</span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="relative">
              <button className="flex items-center gap-2 p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700">
                <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center text-white">
                  JD
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for mobile */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
              onClick={toggleSidebar}
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween" }}
                className="absolute top-0 left-0 bottom-0 w-64 bg-white dark:bg-surface-800 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 flex justify-between items-center border-b border-surface-200 dark:border-surface-700">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
                      C
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      CommUnity<span className="font-normal">Hub</span>
                    </h1>
                  </div>
                  <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <nav className="p-4">
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.path}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700">
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-colors">
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </div>
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sidebar for desktop */}
        <aside className="hidden md:block w-64 border-r border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800">
          <nav className="p-4 sticky top-20">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700">
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-colors">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;