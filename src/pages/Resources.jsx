import React, { useState } from "react";
import { FileText, Download, Link as LinkIcon, ExternalLink, Search, Plus, Filter, ChevronDown } from "lucide-react";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  
  // Sample resources data
  const resources = [
    {
      id: 1,
      title: "Community Guidelines",
      description: "Official guidelines for all community members to follow for a harmonious living environment.",
      type: "document",
      fileType: "pdf",
      fileSize: "1.2 MB",
      category: "Rules",
      date: "2023-06-01",
      featured: true,
    },
    {
      id: 2,
      title: "Maintenance Request Form",
      description: "Form to submit maintenance requests for common areas or community facilities.",
      type: "document",
      fileType: "docx",
      fileSize: "458 KB",
      category: "Forms",
      date: "2023-05-15",
      featured: false,
    },
    {
      id: 3,
      title: "Emergency Contact List",
      description: "List of emergency contacts including local authorities and community representatives.",
      type: "document",
      fileType: "pdf",
      fileSize: "785 KB",
      category: "Emergency",
      date: "2023-04-22",
      featured: true,
    },
    {
      id: 4,
      title: "Community Calendar",
      description: "Calendar of all upcoming community events, meetings, and important dates.",
      type: "link",
      url: "https://calendar.example.com",
      category: "Events",
      date: "2023-06-10",
      featured: false,
    },
    {
      id: 5,
      title: "Neighborhood Map",
      description: "Detailed map of the community showing important locations and facilities.",
      type: "document",
      fileType: "jpg",
      fileSize: "3.5 MB",
      category: "Maps",
      date: "2023-03-18",
      featured: false,
    },
    {
      id: 6,
      title: "Community Newsletter - June 2023",
      description: "Monthly newsletter with updates, announcements, and featured community members.",
      type: "document",
      fileType: "pdf",
      fileSize: "2.1 MB",
      category: "Newsletter",
      date: "2023-06-05",
      featured: true,
    },
    {
      id: 7,
      title: "Local Services Directory",
      description: "Directory of local businesses, services, and amenities near the community.",
      type: "link",
      url: "https://directory.example.com",
      category: "Services",
      date: "2023-05-27",
      featured: false,
    },
    {
      id: 8,
      title: "Board Meeting Minutes - May 2023",
      description: "Official minutes from the last community board meeting.",
      type: "document",
      fileType: "pdf",
      fileSize: "950 KB",
      category: "Meeting Minutes",
      date: "2023-05-20",
      featured: false,
    },
  ];
  
  // Get all unique categories
  const categories = ["All", ...new Set(resources.map(resource => resource.category))];
  
  // Filter resources based on search query and selected category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Sort resources
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOrder === "oldest") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOrder === "a-z") {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });
  
  // Featured resources
  const featuredResources = resources.filter(resource => resource.featured);
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Resources</h1>
          <p className="text-gray-600 mt-2">Access and download community resources</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} className="mr-2" />
          Add Resource
        </button>
      </div>
      
      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map(resource => (
              <div key={resource.id} className="card hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                      resource.type === 'document' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {resource.type === 'document' ? (
                        <FileText size={24} />
                      ) : (
                        <LinkIcon size={24} />
                      )}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                      {resource.category}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <div className="flex justify-between items-center">
                    {resource.type === 'document' ? (
                      <div className="text-sm text-gray-500">
                        {resource.fileType.toUpperCase()} • {resource.fileSize}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">External Link</div>
                    )}
                    <button className={`btn px-3 py-1 flex items-center gap-1 ${
                      resource.type === 'document' ? 'btn-primary' : 'btn-secondary'
                    }`}>
                      {resource.type === 'document' ? (
                        <>
                          <Download size={16} />
                          <span>Download</span>
                        </>
                      ) : (
                        <>
                          <ExternalLink size={16} />
                          <span>Open</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <button className="btn btn-outline flex items-center gap-2 w-48">
              <Filter size={16} />
              <span>Category: {selectedCategory}</span>
              <ChevronDown size={16} className="ml-auto" />
            </button>
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 hidden group-focus-within:block">
              {categories.map(category => (
                <button
                  key={category}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <button className="btn btn-outline flex items-center gap-2 w-48">
              <span>Sort: {sortOrder === 'newest' ? 'Newest First' : 
                         sortOrder === 'oldest' ? 'Oldest First' : 
                         sortOrder === 'a-z' ? 'A to Z' : 'Z to A'}</span>
              <ChevronDown size={16} className="ml-auto" />
            </button>
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 hidden group-focus-within:block">
              {[
                { value: 'newest', label: 'Newest First' },
                { value: 'oldest', label: 'Oldest First' },
                { value: 'a-z', label: 'A to Z' },
                { value: 'z-a', label: 'Z to A' },
              ].map(option => (
                <button
                  key={option.value}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => setSortOrder(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Resource List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">All Resources</h2>
        </div>
        
        <div className="divide-y">
          {sortedResources.length > 0 ? (
            sortedResources.map(resource => (
              <div key={resource.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-wrap gap-4">
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 ${
                    resource.type === 'document' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {resource.type === 'document' ? (
                      <FileText size={24} />
                    ) : (
                      <LinkIcon size={24} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{resource.title}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                        {resource.category}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{resource.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      {new Date(resource.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                      {resource.type === 'document' && ` • ${resource.fileType.toUpperCase()} • ${resource.fileSize}`}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <button className={`btn px-3 py-1 flex items-center gap-1 ${
                      resource.type === 'document' ? 'btn-primary' : 'btn-secondary'
                    }`}>
                      {resource.type === 'document' ? (
                        <>
                          <Download size={16} />
                          <span>Download</span>
                        </>
                      ) : (
                        <>
                          <ExternalLink size={16} />
                          <span>Open</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-3">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-medium mb-1">No resources found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;