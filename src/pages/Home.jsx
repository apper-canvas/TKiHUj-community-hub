import React from 'react';
import { ArrowRight, Calendar, FileText, MessageSquare, Users } from 'lucide-react';

const Home = () => {
  const announcements = [
    {
      id: 1,
      title: 'Community Update: New Features Released',
      content: 'We\'ve added several new features to enhance your community experience. Check out the new resource library and improved event calendar!',
      date: 'May 12, 2023',
      author: 'Admin Team'
    },
    {
      id: 2,
      title: 'Upcoming Maintenance: May 20',
      content: 'The platform will be undergoing scheduled maintenance on May 20 from 2AM - 5AM EST. Please save your work ahead of time.',
      date: 'May 10, 2023',
      author: 'Tech Support'
    }
  ];

  const featuredEvents = [
    {
      id: 1,
      title: 'Community Meetup',
      date: 'May 15, 2023',
      time: '6:00 PM - 8:00 PM',
      attendees: 24,
      image: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Workshop: Introduction to React',
      date: 'May 20, 2023',
      time: '3:00 PM - 5:00 PM',
      attendees: 45,
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Networking Event',
      date: 'May 25, 2023',
      time: '5:30 PM - 7:30 PM',
      attendees: 32,
      image: 'https://images.unsplash.com/photo-1536510233921-8e5043fce771?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const activeDiscussions = [
    {
      id: 1,
      title: 'Tips for remote collaboration',
      author: 'Michael Johnson',
      replies: 24,
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      title: 'What resource helped you the most when learning React?',
      author: 'Sarah Williams',
      replies: 18,
      lastActivity: '5 hours ago'
    },
    {
      id: 3,
      title: 'Introduce yourself to the community!',
      author: 'David Chen',
      replies: 45,
      lastActivity: 'Yesterday'
    }
  ];

  return (
    <div className="p-6">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 mb-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Welcome to Our Community Hub</h1>
          <p className="text-xl mb-6">Connect, collaborate, and grow with our vibrant community of like-minded individuals.</p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              Join Discussions
            </button>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold border border-blue-400 hover:bg-blue-600 transition">
              Explore Resources
            </button>
          </div>
        </div>
      </div>

      {/* Quick access cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <Calendar size={28} className="text-blue-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Events</h3>
          <p className="text-gray-600 mb-4">Discover upcoming events and meetups in the community.</p>
          <button className="text-blue-600 font-medium flex items-center mt-auto">
            View Events <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <FileText size={28} className="text-blue-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Resources</h3>
          <p className="text-gray-600 mb-4">Access our library of helpful guides, tutorials and templates.</p>
          <button className="text-blue-600 font-medium flex items-center mt-auto">
            Browse Resources <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <MessageSquare size={28} className="text-blue-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Discussions</h3>
          <p className="text-gray-600 mb-4">Join conversations and share your insights with the community.</p>
          <button className="text-blue-600 font-medium flex items-center mt-auto">
            Join Discussions <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <Users size={28} className="text-blue-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Members</h3>
          <p className="text-gray-600 mb-4">Connect with other members and expand your network.</p>
          <button className="text-blue-600 font-medium flex items-center mt-auto">
            Find Members <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Announcements */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Announcements</h2>
            <button className="text-blue-600 font-medium text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {announcements.map(announcement => (
              <div key={announcement.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <h3 className="font-medium text-lg">{announcement.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{announcement.content}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{announcement.date}</span>
                  <span>{announcement.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Events */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Featured Events</h2>
            <button className="text-blue-600 font-medium text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {featuredEvents.map(event => (
              <div key={event.id} className="flex border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-20 h-20 rounded-lg object-cover mr-3"
                />
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.date}</p>
                  <p className="text-sm text-gray-600">{event.time}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Users size={12} className="mr-1" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Discussions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Active Discussions</h2>
            <button className="text-blue-600 font-medium text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {activeDiscussions.map(discussion => (
              <div key={discussion.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <h3 className="font-medium">{discussion.title}</h3>
                <p className="text-sm text-gray-600">Started by {discussion.author}</p>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <div className="flex items-center">
                    <MessageSquare size={12} className="mr-1" />
                    <span>{discussion.replies} replies</span>
                  </div>
                  <span>Last activity: {discussion.lastActivity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;