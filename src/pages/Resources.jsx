import React, { useState, useEffect } from "react";
import { FileText, Download, Link as LinkIcon, ExternalLink, Search, Plus, Filter, ChevronDown } from "lucide-react";
import { fetchResources, createResource, updateResource, deleteResource } from "../services/resourceService";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [featuredResources, setFeaturedResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [categories, setCategories] = useState(["All"]);
  
  // Modal states
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState(null);
  
  // Load resources on component mount
  useEffect(() => {
    loadResources();
  }, []);
  
  // Filter resources when filter criteria change
  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedCategory, sortOrder]);
  
  // Load resources from the database
  const loadResources = async () => {
    try {
      setLoading(true);
      
      // Fetch all resources
      const allResources = await fetchResources();
      
      // Extract categories
      const uniqueCategories = ["All", ...new Set(allResources.map(resource => resource.category))];
      setCategories(uniqueCategories);
      
      // Filter featured resources
      const featured = allResources.filter(resource => resource.featured);
      setFeaturedResources(featured);
      
      // Apply initial filtering
      setResources(allResources);
      setLoading(false);
    } catch (err) {
      console.error("Error loading resources:", err);
      setError("Failed to load resources. Please try again later.");
      setLoading(false);
    }
  };
  
  // Apply filters to resources
  const applyFilters = async () => {
    try {
      setLoading(true);
      
      // Build filter object
      const filters = {
        searchQuery: searchQuery,
        sortOrder: sortOrder
      };
      
      // Add category filter if not "All"
      if (selectedCategory !== "All") {
        filters.category = selectedCategory;
      }
      
      // Fetch filtered resources
      const filteredResources = await fetchResources(filters);
      setResources(filteredResources);
      
      setLoading(false);
    } catch (err) {
      console.error("Error applying filters:", err);
      setError("Failed to filter resources. Please try again later.");
      setLoading(false);
    }
  };
  
  // Handle resource creation/update
  const handleSaveResource = async (resourceData) => {
    try {
      setLoading(true);
      
      if (resourceToEdit) {
        // Update existing resource
        await updateResource(resourceToEdit.Id, resourceData);
      } else {
        // Create new resource
        await createResource(resourceData);
      }
      
      // Reload resources
      await loadResources();
      
      // Close modal
      setShowResourceModal(false);
      setResourceToEdit(null);
      setLoading(false);
    } catch (err) {
      console.error("Error saving resource:", err);
      setError("Failed to save resource. Please try again later.");
      setLoading(false);
    }
  };
  
  // Handle resource deletion
  const handleDeleteResource = async (resourceId) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      try {
        setLoading(true);
        await deleteResource(resourceId);
        await loadResources();
        setLoading(false);
      } catch (err) {
        console.error("Error deleting resource:", err);
        setError("Failed to delete resource. Please try again later.");
        setLoading(false);
      }
    }
  };
  
  // Open edit modal
  const handleEditResource = (resource) => {
    setResourceToEdit(resource);
    setShowResourceModal(true);
  };
  
  // Open create modal
  const handleAddResource = () => {
    setResourceToEdit(null);
    setShowResourceModal(true);
  };
  
  // Loading state
  if (loading && resources.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Error state
  if (error && resources.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={loadResources}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Resources</h1>
          <p className="text-gray-600 mt-2">Access and download community resources</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={handleAddResource}
        >
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
              <div key={resource.Id} className="card hover:shadow-md transition-shadow">
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
                        {resource.file_type?.toUpperCase()} • {resource.file_size}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">External Link</div>
                    )}
                    <button 
                      className={`btn px-3 py-1 flex items-center gap-1 ${
                        resource.type === 'document' ? 'btn-primary' : 'btn-secondary'
                      }`}
                      onClick={() => resource.type === 'document' ? 
                        console.log('Download resource:', resource.Id) : 
                        window.open(resource.url, '_blank')
                      }
                    >
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
          <div className="relative group">
            <button className="btn btn-outline flex items-center gap-2 w-48">
              <Filter size={16} />
              <span>Category: {selectedCategory}</span>
              <ChevronDown size={16} className="ml-auto" />
            </button>
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 hidden group-hover:block">
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
          
          <div className="relative group">
            <button className="btn btn-outline flex items-center gap-2 w-48">
              <span>Sort: {sortOrder === 'newest' ? 'Newest First' : 
                         sortOrder === 'oldest' ? 'Oldest First' : 
                         sortOrder === 'a-z' ? 'A to Z' : 'Z to A'}</span>
              <ChevronDown size={16} className="ml-auto" />
            </button>
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 hidden group-hover:block">
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
          {resources.length > 0 ? (
            resources.map(resource => (
              <div key={resource.Id} className="p-4 hover:bg-gray-50 transition-colors">
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
                      {resource.type === 'document' && resource.file_type && resource.file_size && 
                       ` • ${resource.file_type.toUpperCase()} • ${resource.file_size}`}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      className={`btn px-3 py-1 flex items-center gap-1 ${
                        resource.type === 'document' ? 'btn-primary' : 'btn-secondary'
                      }`}
                      onClick={() => resource.type === 'document' ? 
                        console.log('Download resource:', resource.Id) : 
                        window.open(resource.url, '_blank')
                      }
                    >
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
                    <button
                      className="btn btn-outline px-3 py-1"
                      onClick={() => handleEditResource(resource)}
                    >
                      Edit
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
      
      {/* Resource Modal would go here (omitted for brevity) */}
      {showResourceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {resourceToEdit ? "Edit Resource" : "Add Resource"}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Resource title"
                defaultValue={resourceToEdit?.title || ""}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                className="input w-full min-h-[100px]"
                placeholder="Resource description"
                defaultValue={resourceToEdit?.description || ""}
              ></textarea>
            </div>
            
            {/* Additional form fields would go here */}
            
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="btn btn-outline"
                onClick={() => {
                  setShowResourceModal(false);
                  setResourceToEdit(null);
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  // Handle form submission
                  const mockData = {
                    title: "New Resource",
                    description: "Resource description",
                    type: "document",
                    category: "Forms",
                    file_type: "pdf",
                    file_size: "1.2 MB",
                    featured: false
                  };
                  handleSaveResource(mockData);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;