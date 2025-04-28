import React from "react";
import { Calendar, Users, Eye, Radio, ArrowUp, ArrowDown } from "lucide-react";
import Chart from "react-apexcharts";

const Dashboard = () => {
  // Sample data for charts
  const communityActivityOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        style: {
          colors: '#64748b',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#64748b',
        },
      },
    },
    colors: ['#3b82f6', '#8b5cf6'],
    legend: {
      position: 'top',
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 5,
    },
    markers: {
      size: 5,
      hover: {
        size: 7,
      },
    },
  };

  const communityActivitySeries = [
    {
      name: 'Posts',
      data: [12, 9, 15, 10, 14, 17, 8],
    },
    {
      name: 'Events',
      data: [2, 3, 1, 4, 2, 5, 1],
    },
  ];

  const memberDistributionOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: ['Residents', 'Staff', 'Guests', 'Committee Members'],
    colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'],
    legend: {
      position: 'bottom',
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
        },
      },
    },
  };

  const memberDistributionSeries = [125, 20, 18, 15];

  // Stats data
  const statsData = [
    {
      title: "Total Members",
      value: "178",
      icon: Users,
      change: "+12%",
      increase: true
    },
    {
      title: "Active Posts",
      value: "543",
      icon: Radio,
      change: "+18%",
      increase: true
    },
    {
      title: "Page Views",
      value: "1,247",
      icon: Eye,
      change: "-3%",
      increase: false
    },
    {
      title: "Upcoming Events",
      value: "8",
      icon: Calendar,
      change: "+5%",
      increase: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of community activity and metrics</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-gray-500 font-medium">{stat.title}</h3>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Icon size={24} />
                </div>
              </div>
              <div className={`flex items-center mt-4 text-sm ${stat.increase ? 'text-green-600' : 'text-red-600'}`}>
                {stat.increase ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                <span className="ml-1">{stat.change} from last month</span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-6">Community Activity</h2>
          <Chart 
            options={communityActivityOptions}
            series={communityActivitySeries}
            type="line"
            height={350}
          />
        </div>
        
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-6">Member Distribution</h2>
          <Chart 
            options={memberDistributionOptions}
            series={memberDistributionSeries}
            type="donut"
            height={350}
          />
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-6">Recent Activities</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Activity</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Member</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                { activity: "New post created", member: "John Doe", type: "Post", date: "Today, 10:30 AM", status: "Active" },
                { activity: "Event announcement", member: "Sarah Johnson", type: "Event", date: "Yesterday, 2:15 PM", status: "Active" },
                { activity: "Resource updated", member: "Mike Brown", type: "Resource", date: "Jun 15, 2023", status: "Active" },
                { activity: "Maintenance request", member: "Emma Wilson", type: "Maintenance", date: "Jun 14, 2023", status: "Resolved" },
                { activity: "Community poll created", member: "Robert Clark", type: "Poll", date: "Jun 12, 2023", status: "Closed" },
              ].map((item, index) => (
                <tr key={index}>
                  <td className="py-3 px-4">{item.activity}</td>
                  <td className="py-3 px-4">{item.member}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      item.type === 'Post' ? 'bg-blue-100 text-blue-700' :
                      item.type === 'Event' ? 'bg-purple-100 text-purple-700' : 
                      item.type === 'Resource' ? 'bg-amber-100 text-amber-700' :
                      item.type === 'Maintenance' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">{item.date}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Active' ? 'bg-green-100 text-green-700' :
                      item.status === 'Resolved' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;