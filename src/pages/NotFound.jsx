import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <div className="mb-8">
          <div className="relative">
            <div className="text-9xl font-bold text-surface-200 dark:text-surface-800">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Page Not Found
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-lg mb-8 text-surface-600 dark:text-surface-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          <Home size={20} />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;