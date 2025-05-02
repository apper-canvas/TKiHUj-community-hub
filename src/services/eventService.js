import { getApperClient } from './apperService';

// Table name from the provided schema
const TABLE_NAME = 'event';

// Fields to fetch based on the schema
const FIELDS = [
  'Id', 'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 
  'ModifiedOn', 'ModifiedBy', 'title', 'date', 'location', 
  'description', 'type'
];

/**
 * Fetch all events with optional filtering
 */
export const fetchEvents = async (filters = {}) => {
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
    
    // Add date filter if provided
    if (filters.date) {
      const date = new Date(filters.date);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
      
      params.whereGroups = [{
        operator: 'and',
        where: [
          { field: 'date', operator: 'greaterThanOrEqual', value: startOfDay.toISOString() },
          { field: 'date', operator: 'lessThanOrEqual', value: endOfDay.toISOString() }
        ]
      }];
    }

    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

/**
 * Fetch a single event by ID
 */
export const fetchEventById = async (eventId) => {
  const apperClient = getApperClient();
  
  try {
    const params = {
      fields: FIELDS
    };
    
    const response = await apperClient.getRecordById(TABLE_NAME, eventId, params);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event with ID ${eventId}:`, error);
    throw error;
  }
};

/**
 * Create a new event
 */
export const createEvent = async (eventData) => {
  const apperClient = getApperClient();
  
  try {
    // Map the UI data model to the database schema
    const record = {
      title: eventData.title,
      date: new Date(eventData.date).toISOString(),
      location: eventData.location,
      description: eventData.description,
      type: eventData.type
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
    
    throw new Error('Failed to create event');
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

/**
 * Update an existing event
 */
export const updateEvent = async (eventId, eventData) => {
  const apperClient = getApperClient();
  
  try {
    // Map the UI data model to the database schema
    const record = {
      Id: eventId,
      title: eventData.title,
      date: new Date(eventData.date).toISOString(),
      location: eventData.location,
      description: eventData.description,
      type: eventData.type
    };
    
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
    
    throw new Error('Failed to update event');
  } catch (error) {
    console.error(`Error updating event with ID ${eventId}:`, error);
    throw error;
  }
};

/**
 * Delete an event
 */
export const deleteEvent = async (eventId) => {
  const apperClient = getApperClient();
  
  try {
    const params = {
      RecordIds: [eventId]
    };
    
    const response = await apperClient.deleteRecord(TABLE_NAME, params);
    
    if (response && response.success) {
      return true;
    }
    
    throw new Error('Failed to delete event');
  } catch (error) {
    console.error(`Error deleting event with ID ${eventId}:`, error);
    throw error;
  }
};