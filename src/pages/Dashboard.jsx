import React, { useState, useEffect } from "react";
import { Calendar, Users, Eye, Radio, ArrowUp, ArrowDown } from "lucide-react";
import Chart from "react-apexcharts";
import { fetchActivities, countActivitiesByType } from "../services/activityService";
import { fetchEvents } from "../services/eventService";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [activityCounts, setActivityCounts] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState(0);
  const [error, setError] = useState(null);

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch recent activities
        const recentActivities = await fetchActivities({ limit: 5 });
        setActivities(recentActivities);
        
        // Fetch activity counts by type
        const counts = await countActivitiesByType();
        setActivityCounts(counts);
        
        // Fetch upcoming events
        const now = new Date();
        const futureEvents = await fetchEvents({ 
          where: [{ 
            field: 'date', 
            operator: 'greaterThan', 
            value: now.toISOString() 
          }]
        });
        setUpcomingEvents(futureEvents.length);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Activity data for charts
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

  // Convert activity data for chart
  const activityByType = {};
  activities.forEach(activity => {
    const day = new Date(activity.date).getDay();
    const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayName = dayMap[day];
    
    if (!activityByType[activity.type]) {
      activityByType[activity.type] = {
        Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0
      };
    }
    
    activityByType[activity.type][dayName]++;
  });

  // Format data for the chart
  const communityActivitySeries = [
    {
      name: 'Posts',
      data: activityByType.Post ? 
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => activityByType.Post[day] || 0) : 
        [12, 9, 15, 10, 14, 17, 8], // Fallback data
    },
    {
      name: 'Events',
      data: activityByType.Event ? 
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => activityByType.Event[day] || 0) : 
        [2, 3, 1, 4, 2, 5, 1], // Fallback data
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
      value: activities.filter(a => a.type === "Post" && a.status === "Active").length.toString() || "543",
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
      value: upcomingEvents.toString() || "8",
      icon: Calendar,
      change: "+5%",
      increase: true
    }
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <tr key={activity.Id}>
                    <td className="py-3 px-4">{activity.activity_description}</td>
                    <td className="py-3 px-4">{activity.member}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        activity.type === 'Post' ? 'bg-blue-100 text-blue-700' :
                        activity.type === 'Event' ? 'bg-purple-100 text-purple-700' : 
                        activity.type === 'Resource' ? 'bg-amber-100 text-amber-700' :
                        activity.type === 'Maintenance' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {activity.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(activity.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'Active' ? 'bg-green-100 text-green-700' :
                        activity.status === 'Resolved' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    No recent activities found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;