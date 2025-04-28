import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Smile, MapPin, Calendar, AlertCircle, Send, X, Camera, Paperclip } from "lucide-react";

const MainFeature = () => {
  const [postContent, setPostContent] = useState("");
  const [postType, setPostType] = useState("personal");
  const [isExpanded, setIsExpanded] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Handle post submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!postContent.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setPostContent("");
      setAttachments([]);
      setIsExpanded(false);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  // Handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    // Create preview URLs for the files
    const newAttachments = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      url: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      size: file.size
    }));
    
    setAttachments([...attachments, ...newAttachments]);
  };
  
  // Remove an attachment
  const removeAttachment = (id) => {
    setAttachments(attachments.filter(attachment => attachment.id !== id));
  };
  
  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  return (
    <div className="card">
      <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
        <h2 className="text-xl font-bold">Create Post</h2>
        {isExpanded && (
          <button 
            onClick={() => setIsExpanded(false)}
            className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4">
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 flex items-center gap-2"
            >
              <div className="p-1 rounded-full bg-green-100 dark:bg-green-800">
                <AlertCircle size={16} />
              </div>
              <span>Your post has been published successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Post type selector */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-4"
          >
            <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
              Post Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <label className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                postType === "personal" 
                  ? "border-primary bg-primary/5 dark:bg-primary/10" 
                  : "border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800"
              }`}>
                <input 
                  type="radio" 
                  name="postType" 
                  value="personal" 
                  checked={postType === "personal"}
                  onChange={() => setPostType("personal")}
                  className="sr-only"
                />
                <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                  postType === "personal" 
                    ? "border-primary" 
                    : "border-surface-400 dark:border-surface-500"
                }`}>
                  {postType === "personal" && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
                <span className="text-sm font-medium">Personal</span>
              </label>
              
              <label className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                postType === "announcement" 
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                  : "border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800"
              }`}>
                <input 
                  type="radio" 
                  name="postType" 
                  value="announcement" 
                  checked={postType === "announcement"}
                  onChange={() => setPostType("announcement")}
                  className="sr-only"
                />
                <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                  postType === "announcement" 
                    ? "border-blue-500" 
                    : "border-surface-400 dark:border-surface-500"
                }`}>
                  {postType === "announcement" && (
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                  )}
                </div>
                <span className="text-sm font-medium">Announcement</span>
              </label>
              
              <label className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                postType === "event" 
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" 
                  : "border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800"
              }`}>
                <input 
                  type="radio" 
                  name="postType" 
                  value="event" 
                  checked={postType === "event"}
                  onChange={() => setPostType("event")}
                  className="sr-only"
                />
                <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                  postType === "event" 
                    ? "border-purple-500" 
                    : "border-surface-400 dark:border-surface-500"
                }`}>
                  {postType === "event" && (
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                  )}
                </div>
                <span className="text-sm font-medium">Event</span>
              </label>
              
              <label className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                postType === "maintenance" 
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                  : "border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800"
              }`}>
                <input 
                  type="radio" 
                  name="postType" 
                  value="maintenance" 
                  checked={postType === "maintenance"}
                  onChange={() => setPostType("maintenance")}
                  className="sr-only"
                />
                <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                  postType === "maintenance" 
                    ? "border-green-500" 
                    : "border-surface-400 dark:border-surface-500"
                }`}>
                  {postType === "maintenance" && (
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                  )}
                </div>
                <span className="text-sm font-medium">Maintenance</span>
              </label>
            </div>
          </motion.div>
        )}
        
        {/* Text area */}
        <div className="mb-3">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            onClick={() => !isExpanded && setIsExpanded(true)}
            placeholder={`What's on your mind?${isExpanded ? '' : ' Click to expand...'}`}
            rows={isExpanded ? 4 : 2}
            className="textarea"
          />
        </div>
        
        {/* Attachments preview */}
        {attachments.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-4 grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {attachments.map(attachment => (
              <div 
                key={attachment.id} 
                className="relative group rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden"
              >
                {attachment.type === 'image' ? (
                  <div className="aspect-square bg-surface-100 dark:bg-surface-800">
                    <img 
                      src={attachment.url} 
                      alt={attachment.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="p-3 flex items-center gap-2">
                    <Paperclip size={18} className="text-surface-500" />
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-sm">{attachment.name}</div>
                      <div className="text-xs text-surface-500">
                        {formatFileSize(attachment.size)}
                      </div>
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeAttachment(attachment.id)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-surface-800/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </motion.div>
        )}
        
        {/* Action buttons */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex flex-wrap items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2">
                <label className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer text-surface-600 hover:text-primary transition-colors">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileSelect}
                    className="sr-only"
                  />
                  <Camera size={20} />
                </label>
                <label className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer text-surface-600 hover:text-primary transition-colors">
                  <input 
                    type="file" 
                    onChange={handleFileSelect}
                    className="sr-only"
                  />
                  <Paperclip size={20} />
                </label>
                <button 
                  type="button"
                  className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 hover:text-primary transition-colors"
                >
                  <Smile size={20} />
                </button>
                <button 
                  type="button"
                  className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 hover:text-primary transition-colors"
                >
                  <MapPin size={20} />
                </button>
                {postType === "event" && (
                  <button 
                    type="button"
                    className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 hover:text-primary transition-colors"
                  >
                    <Calendar size={20} />
                  </button>
                )}
              </div>
              
              <button
                type="submit"
                disabled={!postContent.trim() || isSubmitting}
                className={`btn ${
                  postType === "personal" ? "btn-primary" :
                  postType === "announcement" ? "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500" :
                  postType === "event" ? "bg-purple-500 hover:bg-purple-600 text-white focus:ring-purple-500" :
                  "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500"
                } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Posting...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send size={18} />
                    <span>Post</span>
                  </div>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default MainFeature;