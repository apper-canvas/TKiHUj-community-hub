import { getApperClient } from './apperService';

// Table name from the provided schema
const TABLE_NAME = 'resource';

// Fields to fetch based on the schema
const FIELDS = [
  'Id', 'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 
  'ModifiedOn', 'ModifiedBy', 'title', 'description', 'type', 
  'category', 'file_type', 'file_size', 'url', 'date', 'featured'
];

/**
 * Fetch all resources with optional filtering
 */
export const fetchResources = async (filters = {}) => {
  const apperClient = getApperClient();
  
  try {
    const params = {
      fields: FIELDS,
      orderBy: [{ field: 'date', direction: 'desc' }],
      where: [],
    };

    // Add category filter if provided
    if (filters.category && filters.category !== "All") {
      params.where.push({ 
        field: 'category', 
        operator: 'equals', 
        value: filters.category 
      });
    }
    
    // Add type filter if provided
    if (filters.type) {
      params.where.push({ 
        field: 'type', 
        operator: 'equals', 
        value: filters.type 
      });
    }
    
    // Add featured filter if provided
    if (filters.featured !== undefined) {
      params.where.push({ 
        field: 'featured', 
        operator: 'equals', 
        value: filters.featured 
      });
    }
    
    // Add search query if provided
    if (filters.searchQuery) {
      params.whereGroups = [{
        operator: 'or',
        where: [
          { field: 'title', operator: 'contains', value: filters.searchQuery },
          { field: 'description', operator: 'contains', value: filters.searchQuery }
        ]
      }];
    }

    // Apply sorting
    if (filters.sortOrder) {
      switch (filters.sortOrder) {
        case 'newest':
          params.orderBy = [{ field: 'date', direction: 'desc' }];
          break;
        case 'oldest':
          params.orderBy = [{ field: 'date', direction: 'asc' }];
          break;
        case 'a-z':
          params.orderBy = [{ field: 'title', direction: 'asc' }];
          break;
        case 'z-a':
          params.orderBy = [{ field: 'title', direction: 'desc' }];
          break;
      }
    }

    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw error;
  }
};

/**
 * Fetch a single resource by ID
 */
export const fetchResourceById = async (resourceId) => {
  const apperClient = getApperClient();
  
  try {
    const params = {
      fields: FIELDS
    };
    
    const response = await apperClient.getRecordById(TABLE_NAME, resourceId, params);
    return response.data;
  } catch (error) {
    console.error(`Error fetching resource with ID ${resourceId}:`, error);
    throw error;
  }
};

/**
 * Create a new resource
 */
export const createResource = async (resourceData) => {
  const apperClient = getApperClient();
  
  try {
    // Map the UI data model to the database schema
    const record = {
      title: resourceData.title,
      description: resourceData.description,
      type: resourceData.type,
      category: resourceData.category,
      date: new Date(resourceData.date || new Date()).toISOString(),
      featured: !!resourceData.featured
    };
    
    // Add type-specific fields
    if (resourceData.type === 'document') {
      record.file_type = resourceData.fileType;
      record.file_size = resourceData.fileSize;
    } else if (resourceData.type === 'link') {
      record.url = resourceData.url;
    }
    
    const params = {
      records: [record]
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, params);
    
    if (response && response.success && response.results) {
      const successfulRecord = response.results.find(result => result.success);
      if (successfulRecord) {
        return successfulRecord.data;
      }
    }
    
    throw new Error('Failed to create resource');
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error;
  }
};

/**
 * Update an existing resource
 */
export const updateResource = async (resourceId, resourceData) => {
  const apperClient = getApperClient();
  
  try {
    // Map the UI data model to the database schema
    const record = {
      Id: resourceId,
      title: resourceData.title,
      description: resourceData.description,
      type: resourceData.type,
      category: resourceData.category,
      featured: !!resourceData.featured
    };
    
    // Add type-specific fields
    if (resourceData.type === 'document') {
      record.file_type = resourceData.fileType;
      record.file_size = resourceData.fileSize;
    } else if (resourceData.type === 'link') {
      record.url = resourceData.url;
    }
    
    // Only update date if provided
    if (resourceData.date) {
      record.date = new Date(resourceData.date).toISOString();
    }
    
    const params = {
      records: [record]
    };
    
    const response = await apperClient.updateRecord(TABLE_NAME, params);
    
    if (response && response.success && response.results) {
      const successfulRecord = response.results.find(result => result.success);
      if (successfulRecord) {
        return successfulRecord.data;
      }
    }
    
    throw new Error('Failed to update resource');
  } catch (error) {
    console.error(`Error updating resource with ID ${resourceId}:`, error);
    throw error;
  }
};

/**
 * Delete a resource
 */
export const deleteResource = async (resourceId) => {
  const apperClient = getApperClient();
  
  try {
    const params = {
      RecordIds: [resourceId]
    };
    
    const response = await apperClient.deleteRecord(TABLE_NAME, params);
    
    if (response && response.success) {
      return true;
    }
    
    throw new Error('Failed to delete resource');
  } catch (error) {
    console.error(`Error deleting resource with ID ${resourceId}:`, error);
    throw error;
  }
};