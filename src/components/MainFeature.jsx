import React from "react";
import { ArrowRight } from "lucide-react";

const MainFeature = () => {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1544644181-1484b3fdfc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        alt="Community" 
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-900/30 flex items-end">
        <div className="p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Join Our Summer Celebration</h2>
          <p className="mb-4 max-w-md">Join us this weekend for our annual community summer celebration with food, music, and activities for the whole family!</p>
          <button className="inline-flex items-center px-4 py-2 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Learn More
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainFeature;