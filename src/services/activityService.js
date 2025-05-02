import { getApperClient } from './apperService';

// Table name from the provided schema
const TABLE_NAME = 'Activity1';

// Fields to fetch based on the schema
const FIELDS = [
  'Id', 'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 
  'ModifiedOn', 'ModifiedBy', 'activity_description', 'member', 
  'type', 'date', 'status'
];

/**
 * Fetch all activities with optional filtering
 */
export const fetchActivities = async (filters = {}) => {
  const apperClient = getApperClient();
  
  try {
    const params = {
      fields: FIELDS,
      orderBy: [{ field: 'date', direction: 'desc' }],
      where: [],
    };

    // Add type filter if provided
    if (filters.type) {
      params.where.push({ 
        field: 'type', 
        operator: 'equals', 
        value: filters.type 
      });
    }
    
    // Add status filter if provided
    if (filters.status) {
      params.where.push({ 
        field: 'status', 
        operator: 'equals', 
        value: filters.status 
      });
    }
    
    // Add pagination if requested
    if (filters.limit) {
      params.pagingInfo = {
        limit: filters.limit,
        offset: filters.offset || 0
      };
    }

    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};

/**
 * Fetch a single activity by ID
 */
export const fetchActivityById = async (activityId) => {
  const apperClient = getApperClient();
  
  try {
    const params = {
      fields: FIELDS
    };
    
    const response = await apperClient.getRecordById(TABLE_NAME, activityId, params);
    return response.data;
  } catch (error) {
    console.error(`Error fetching activity with ID ${activityId}:`, error);
    throw error;
  }
};

/**
 * Create a new activity
 */
export const createActivity = async (activityData) => {
  const apperClient = getApperClient();
  
  try {
    // Map the UI data model to the database schema
    const record = {
      activity_description: activityData.description,
      member: activityData.member,
      type: activityData.type,
      date: new Date(activityData.date || new Date()).toISOString(),
      status: activityData.status || 'Active'
    };
    
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
    
    throw new Error('Failed to create activity');
  } catch (error) {
    console.error('Error creating activity:', error);
    throw error;
  }
};

/**
 * Update an existing activity
 */
export const updateActivity = async (activityId, activityData) => {
  const apperClient = getApperClient();
  
  try {
    // Map the UI data model to the database schema
    const record = {
      Id: activityId,
      activity_description: activityData.description,
      member: activityData.member,
      type: activityData.type,
      status: activityData.status
    };
    
    // Only update date if provided
    if (activityData.date) {
      record.date = new Date(activityData.date).toISOString();
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
    
    throw new Error('Failed to update activity');
  } catch (error) {
    console.error(`Error updating activity with ID ${activityId}:`, error);
    throw error;
  }
};

/**
 * Delete an activity
 */
export const deleteActivity = async (activityId) => {
  const apperClient = getApperClient();
  
  try {
    const params = {
      RecordIds: [activityId]
    };
    
    const response = await apperClient.deleteRecord(TABLE_NAME, params);
    
    if (response && response.success) {
      return true;
    }
    
    throw new Error('Failed to delete activity');
  } catch (error) {
    console.error(`Error deleting activity with ID ${activityId}:`, error);
    throw error;
  }
};

/**
 * Count activities by type
 */
export const countActivitiesByType = async () => {
  const apperClient = getApperClient();
  
  try {
    const params = {
      fields: ['type'],
      groupBy: ['type'],
      aggregators: [
        {
          field: 'Id',
          function: 'count',
          alias: 'count'
        }
      ]
    };
    
    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    return response.data || [];
  } catch (error) {
    console.error('Error counting activities by type:', error);
    throw error;
  }
};