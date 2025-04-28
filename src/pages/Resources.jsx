import React from 'react';
import { FileText, Download, Search, Book, Video, Link, Filter } from 'lucide-react';

const Resources = () => {
  const resources = [
    {
      id: 1,
      title: 'Community Guidelines',
      description: 'Learn about our community rules and expectations for all members.',
      type: 'Document',
      author: 'Admin Team',
      dateAdded: 'April 15, 2023',
      downloads: 342,
      icon: FileText
    },
    {
      id: 2,
      title: 'Getting Started Guide',
      description: 'A comprehensive guide to help new members navigate the community.',
      type: 'Document',
      author: 'Onboarding Team',
      dateAdded: 'March 22, 2023',
      downloads: 567,
      icon: Book
    },
    {
      id: 3,
      title: 'Introduction to React Workshop Recording',
      description: 'Recording of our popular React workshop for beginners.',
      type: 'Video',
      author: 'Sarah Johnson',
      dateAdded: 'May 2, 2023',
      downloads: 189,
      icon: Video
    },
    {
      id: 4,
      title: 'Best Practices for Remote Collaboration',
      description: 'Learn effective strategies for working with remote teams.',
      type: 'Document',
      author: 'Michael Chen',
      dateAdded: 'April 5, 2023',
      downloads: 231,
      icon: FileText
    },
    {
      id: 5,
      title: 'Community Survey Results 2023',
      description: 'Detailed analysis of our annual community survey.',
      type: 'Document',
      author: 'Research Team',
      dateAdded: 'May 10, 2023',
      downloads: 127,
      icon: FileText
    },
    {
      id: 6,
      title: 'Useful External Resources',
      description: 'A curated list of helpful external websites, tools, and learning resources.',
      type: 'Link Collection',
      author: 'Education Team',
      dateAdded: 'April 29, 2023',
      downloads: 205,
      icon: Link
    },
  ];

  const categories = [
    { name: 'All Resources', count: 42 },
    { name: 'Documents', count: 23 },
    { name: 'Videos', count: 8 },
    { name: 'Templates', count: 5 },
    { name: 'Presentations', count: 4 },
    { name: 'Link Collections', count: 2 },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resource Library</h1>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center">
          <FileText className="mr-2" size={16} />
          Upload Resource
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar with filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="font-semibold text-lg mb-4 flex items-center">
              <Filter size={16} className="mr-2" />
              Categories
            </h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name} className="flex justify-between items-center">
                  <button className="text-gray-700 hover:text-blue-600 focus:outline-none">
                    {category.name}
                  </button>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h2 className="font-semibold text-lg mb-4">Date Added</h2>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="radio" name="date" className="mr-2" />
                  <span>Last 7 days</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="date" className="mr-2" />
                  <span>Last 30 days</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="date" className="mr-2" />
                  <span>Last 90 days</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="date" className="mr-2" defaultChecked />
                  <span>All time</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {resources.map((resource) => {
              const ResourceIcon = resource.icon;
              return (
                <div key={resource.id} className="bg-white rounded-lg shadow-md p-5">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <ResourceIcon size={24} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-lg">{resource.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {resource.type} • Added {resource.dateAdded}
                      </p>
                      <p className="text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">By {resource.author}</span>
                        <button className="flex items-center text-blue-600 hover:text-blue-800">
                          <Download size={16} className="mr-1" />
                          <span className="text-sm">{resource.downloads}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;