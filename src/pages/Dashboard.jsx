import React from 'react';
import { Calendar, Users, Award, FileText } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, change, changeType }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 font-medium">{title}</h3>
        <div className="bg-blue-100 p-2 rounded-full">
          <Icon size={20} className="text-blue-600" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold">{value}</p>
          <p className={`text-sm ${changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
            {changeType === 'positive' ? '↑' : '↓'} {change}
          </p>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const activities = [
    { user: 'Jennifer Smith', action: 'posted a new resource', time: '2 hours ago' },
    { user: 'Michael Johnson', action: 'registered for Community Meetup', time: '3 hours ago' },
    { user: 'Emily Williams', action: 'commented on Discussion Thread', time: '5 hours ago' },
    { user: 'David Brown', action: 'shared your post', time: 'Yesterday' },
    { user: 'Sarah Miller', action: 'joined the community', time: 'Yesterday' },
  ];

  const upcomingEvents = [
    { id: 1, name: 'Community Meetup', date: 'May 15, 2023', time: '6:00 PM', attendees: 24 },
    { id: 2, name: 'Workshop: Introduction to React', date: 'May 20, 2023', time: '3:00 PM', attendees: 45 },
    { id: 3, name: 'Networking Event', date: 'May 25, 2023', time: '5:30 PM', attendees: 32 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={Users} 
          title="Total Members" 
          value="2,543" 
          change="12% this month"
          changeType="positive" 
        />
        <StatCard 
          icon={Calendar} 
          title="Active Events" 
          value="12" 
          change="3 more than last month"
          changeType="positive" 
        />
        <StatCard 
          icon={FileText} 
          title="Resources" 
          value="87" 
          change="5 new this week"
          changeType="positive" 
        />
        <StatCard 
          icon={Award} 
          title="Engagement" 
          value="76%" 
          change="2% from last week"
          changeType="negative" 
        />
      </div>
      
      {/* Two-column layout for activities and events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start border-b border-gray-100 pb-3">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <Users size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{activity.user} <span className="font-normal text-gray-600">{activity.action}</span></p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-600 font-medium">View all activities</button>
        </div>
        
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex items-start border-b border-gray-100 pb-3">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <Calendar size={16} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{event.name}</p>
                    <p className="text-sm bg-blue-100 text-blue-600 rounded-full px-2 py-1">{event.attendees} attending</p>
                  </div>
                  <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-600 font-medium">View all events</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;