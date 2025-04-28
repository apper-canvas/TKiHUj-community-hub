import React from "react";
import MainFeature from "../components/MainFeature";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome to Community Hub</h1>
        <p className="text-gray-600 mt-2">Connect, share, and stay updated with your community</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MainFeature />
          
          <div className="mt-6 card p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border-b pb-4 last:border-0">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      JD
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">John Doe</h3>
                        <span className="text-sm text-gray-500">3h ago</span>
                      </div>
                      <p className="mt-1">Shared a new announcement about the upcoming community event this weekend.</p>
                      <div className="mt-2 rounded-lg overflow-hidden bg-gray-50 border p-3">
                        <p className="text-sm">We're excited to announce our summer community picnic this Saturday at Central Park!</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-3 border-b pb-4 last:border-0">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 text-purple-700 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-medium">JUN</span>
                    <span className="text-lg font-bold leading-none">{item + 14}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Community Meetup</h3>
                    <p className="text-sm text-gray-600">3:00 PM at Community Center</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-outline w-full mt-4">View All Events</button>
          </div>
          
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Community Resources</h2>
            <div className="space-y-3">
              {["Community Guidelines", "Emergency Contacts", "Maintenance Request", "Neighborhood Watch"].map((item, index) => (
                <div key={index} className="p-3 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer">
                  <h3 className="font-medium">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;