import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Sun, Moon, Menu, X, Bell, Calendar, Wrench, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clearUser } from './store/userSlice';
import ProtectedRoute from './components/ProtectedRoute';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: User, text: "Home", path: "/" },
    { icon: Calendar, text: "Dashboard", path: "/dashboard" },
    { icon: Calendar, text: "Events", path: "/events" },
    { icon: Wrench, text: "Resources", path: "/resources" },
  ];

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black z-10"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`fixed top-0 bottom-0 left-0 z-20 w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h1 className="text-2xl font-bold text-blue-600">Community Hub</h1>
          <button 
            onClick={toggleSidebar} 
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {isAuthenticated && user && (
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {user.firstName ? user.firstName.charAt(0) : ''}
                {user.lastName ? user.lastName.charAt(0) : ''}
              </div>
              <div className="ml-3">
                <p className="font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-gray-500">{user.emailAddress}</p>
              </div>
            </div>
          </div>
        )}

        <div className="py-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link 
                key={index} 
                to={item.path}
                className={`flex items-center px-4 py-3 text-gray-700 ${
                  isActive ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : "hover:bg-gray-100"
                }`}
                onClick={() => toggleSidebar()}
              >
                <Icon size={20} className="mr-3" />
                <span>{item.text}</span>
              </Link>
            );
          })}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          {isAuthenticated ? (
            <button 
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md w-full"
              onClick={handleLogout}
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md w-full"
              onClick={() => toggleSidebar()}
            >
              <User size={20} className="mr-3" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </motion.div>
    </>
  );
};

const Header = ({ toggleSidebar, toggleDarkMode, darkMode }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 md:hidden"
          >
            <Menu size={20} />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {isAuthenticated && (
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
          )}
          {isAuthenticated && user && (
            <button className="flex items-center space-x-2 focus:outline-none">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {user.firstName ? user.firstName.charAt(0) : ''}
                {user.lastName ? user.lastName.charAt(0) : ''}
              </div>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={`flex ${darkMode ? "dark" : ""}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 md:ml-64 bg-gray-50 min-h-screen flex flex-col">
        <Header 
          toggleSidebar={toggleSidebar} 
          toggleDarkMode={toggleDarkMode} 
          darkMode={darkMode} 
        />
        
        <main className="flex-1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/events" element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            } />
            <Route path="/resources" element={
              <ProtectedRoute>
                <Resources />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;