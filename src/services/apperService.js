// Initialize and provide access to the ApperClient instance

// Get the ApperClient from the window object
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Get the ApperUI from the window object
const getApperUI = () => {
  const { ApperUI } = window.ApperSDK;
  return ApperUI;
};

export { getApperClient, getApperUI };