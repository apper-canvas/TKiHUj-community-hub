import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Heart, Share2, Bell, Calendar, Tool, AlertTriangle } from "lucide-react";
import MainFeature from "../components/MainFeature";

const Home = () => {
  const [activeTab, setActiveTab] = useState("feed");
  
  // Sample data for posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Jane Cooper",
      role: "Resident",
      avatar: "JC",
      content: "Just moved in to Block C! Looking forward to meeting everyone at the community BBQ this weekend.",
      timestamp: "2 hours ago",
      likes: 12,
      comments: 5,
      isLiked: false,
      type: "personal"
    },
    {
      id: 2,
      author: "Admin",
      role: "Society Admin",
      avatar: "A",
      content: "NOTICE: Water supply will be interrupted tomorrow from 10 AM to 2 PM due to maintenance work. Please store water accordingly.",
      timestamp: "5 hours ago",
      likes: 3,
      comments: 8,
      isLiked: false,
      type: "announcement"
    },
    {
      id: 3,
      author: "Robert Fox",
      role: "Chairperson",
      avatar: "RF",
      content: "Reminder: Monthly society meeting this Sunday at 11 AM in the community hall. Agenda includes discussion on new security measures and playground renovation.",
      timestamp: "1 day ago",
      likes: 24,
      comments: 15,
      isLiked: true,
      type: "event"
    },
    {
      id: 4,
      author: "Maintenance Team",
      role: "Staff",
      avatar: "MT",
      content: "The elevator in Block B has been repaired and is now operational. Thank you for your patience.",
      timestamp: "2 days ago",
      likes: 18,
      comments: 2,
      isLiked: false,
      type: "maintenance"
    }
  ]);

  // Toggle like on a post
  const toggleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  // Filter posts based on active tab
  const filteredPosts = activeTab === "feed" 
    ? posts 
    : posts.filter(post => post.type === activeTab);

  // Quick access cards data
  const quickAccessCards = [
    {
      title: "Notifications",
      icon: <Bell size={24} className="text-blue-500" />,
      count: 5,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      path: "/notifications"
    },
    {
      title: "Upcoming Events",
      icon: <Calendar size={24} className="text-purple-500" />,
      count: 2,
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      path: "/events"
    },
    {
      title: "Maintenance",
      icon: <Tool size={24} className="text-green-500" />,
      count: 3,
      bgColor: "bg-green-50 dark:bg-green-900/20",
      path: "/maintenance"
    },
    {
      title: "Urgent Notices",
      icon: <AlertTriangle size={24} className="text-red-500" />,
      count: 1,
      bgColor: "bg-red-50 dark:bg-red-900/20",
      path: "/notices"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="p-4 border-b border-surface-200 dark:border-surface-700">
              <h2 className="text-xl font-bold">Community Feed</h2>
            </div>
            
            {/* Tabs */}
            <div className="flex overflow-x-auto scrollbar-hide border-b border-surface-200 dark:border-surface-700">
              <button 
                onClick={() => setActiveTab("feed")}
                className={`px-6 py-3 font-medium whitespace-nowrap transition-colors relative ${
                  activeTab === "feed" 
                    ? "text-primary" 
                    : "text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100"
                }`}
              >
                All Posts
                {activeTab === "feed" && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
              <button 
                onClick={() => setActiveTab("announcement")}
                className={`px-6 py-3 font-medium whitespace-nowrap transition-colors relative ${
                  activeTab === "announcement" 
                    ? "text-primary" 
                    : "text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100"
                }`}
              >
                Announcements
                {activeTab === "announcement" && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
              <button 
                onClick={() => setActiveTab("event")}
                className={`px-6 py-3 font-medium whitespace-nowrap transition-colors relative ${
                  activeTab === "event" 
                    ? "text-primary" 
                    : "text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100"
                }`}
              >
                Events
                {activeTab === "event" && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
              <button 
                onClick={() => setActiveTab("maintenance")}
                className={`px-6 py-3 font-medium whitespace-nowrap transition-colors relative ${
                  activeTab === "maintenance" 
                    ? "text-primary" 
                    : "text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100"
                }`}
              >
                Maintenance
                {activeTab === "maintenance" && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            </div>
            
            {/* Posts */}
            <div className="divide-y divide-surface-200 dark:divide-surface-700">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-medium
                        ${post.type === 'announcement' ? 'bg-blue-500' : 
                          post.type === 'event' ? 'bg-purple-500' : 
                          post.type === 'maintenance' ? 'bg-green-500' : 
                          'bg-primary-light'}`}
                      >
                        {post.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{post.author}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300">
                            {post.role}
                          </span>
                        </div>
                        <p className="text-xs text-surface-500 dark:text-surface-400 mb-2">
                          {post.timestamp}
                        </p>
                        <p className="mb-3 text-balance">{post.content}</p>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => toggleLike(post.id)}
                            className={`flex items-center gap-1 text-sm ${
                              post.isLiked 
                                ? 'text-red-500' 
                                : 'text-surface-500 dark:text-surface-400 hover:text-red-500 dark:hover:text-red-500'
                            }`}
                          >
                            <Heart size={18} className={post.isLiked ? "fill-current" : ""} />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-sm text-surface-500 dark:text-surface-400 hover:text-primary dark:hover:text-primary">
                            <MessageSquare size={18} />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center gap-1 text-sm text-surface-500 dark:text-surface-400 hover:text-primary dark:hover:text-primary">
                            <Share2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center text-surface-500 dark:text-surface-400">
                  No posts found in this category.
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right column - Quick access and create post */}
        <div className="space-y-6">
          {/* Quick access cards */}
          <div className="grid grid-cols-2 gap-4">
            {quickAccessCards.map((card, index) => (
              <motion.a
                key={index}
                href={card.path}
                whileHover={{ y: -5 }}
                className={`${card.bgColor} p-4 rounded-xl border border-surface-200 dark:border-surface-700 flex flex-col items-center justify-center text-center gap-2 transition-all hover:shadow-md`}
              >
                <div className="p-2 rounded-full bg-white dark:bg-surface-800 shadow-sm">
                  {card.icon}
                </div>
                <h3 className="font-medium">{card.title}</h3>
                <div className="text-2xl font-bold">{card.count}</div>
              </motion.a>
            ))}
          </div>
          
          {/* Create post component */}
          <MainFeature />
        </div>
      </div>
    </div>
  );
};

export default Home;