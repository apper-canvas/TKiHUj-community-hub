import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Community Meetup',
      date: 'May 15, 2023',
      time: '6:00 PM - 8:00 PM',
      location: 'Community Center, 123 Main St',
      description: 'Join us for our monthly community meetup! This is a great opportunity to network, share ideas, and learn from others in the community.',
      attendees: 24,
      image: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Workshop: Introduction to React',
      date: 'May 20, 2023',
      time: '3:00 PM - 5:00 PM',
      location: 'Tech Hub, 456 Innovation Ave',
      description: 'Learn the fundamentals of React in this hands-on workshop. Bring your laptop and be ready to code!',
      attendees: 45,
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Networking Event',
      date: 'May 25, 2023',
      time: '5:30 PM - 7:30 PM',
      location: 'The Gathering Space, 789 Networking Blvd',
      description: 'Expand your professional network at this casual networking event. Light refreshments will be provided.',
      attendees: 32,
      image: 'https://images.unsplash.com/photo-1536510233921-8e5043fce771?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Annual Community Festival',
      date: 'June 10, 2023',
      time: '11:00 AM - 6:00 PM',
      location: 'Community Park, 321 Festival Way',
      description: 'Our biggest event of the year! Join us for food, music, games, and more. Fun for the whole family!',
      attendees: 150,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      title: 'Tech Talk: The Future of AI',
      date: 'June 15, 2023',
      time: '7:00 PM - 8:30 PM',
      location: 'Modern Auditorium, 555 Tech Parkway',
      description: 'Hear from industry experts about the latest developments in artificial intelligence and what the future holds.',
      attendees: 78,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Community Events</h1>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center">
          <Calendar className="mr-2" size={16} />
          Create Event
        </button>
      </div>

      {/* Event filter */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Events</option>
              <option>Workshops</option>
              <option>Meetups</option>
              <option>Conferences</option>
              <option>Social</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input 
              type="date" 
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Locations</option>
              <option>Community Center</option>
              <option>Tech Hub</option>
              <option>Community Park</option>
              <option>Virtual</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users size={16} className="mr-2" />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
              <div className="flex justify-between">
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">
                  Register
                </button>
                <button className="border border-blue-600 text-blue-600 py-2 px-4 rounded-lg">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;