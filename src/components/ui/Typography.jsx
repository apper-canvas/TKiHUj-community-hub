import React from 'react';
import PropTypes from 'prop-types';

// Heading 1 - Main page titles
export const Heading1 = ({ 
  children, 
  className = '', 
  color = 'text-surface-800 dark:text-surface-100', 
  align = 'text-left'
}) => {
  return (
    <h1 className={`text-3xl md:text-4xl font-bold ${color} ${align} leading-tight mb-4 font-heading ${className}`}>
      {children}
    </h1>
  );
};

// Heading 2 - Section titles
export const Heading2 = ({ 
  children, 
  className = '', 
  color = 'text-surface-700 dark:text-surface-200', 
  align = 'text-left'
}) => {
  return (
    <h2 className={`text-2xl md:text-3xl font-semibold ${color} ${align} leading-tight mb-3 font-heading ${className}`}>
      {children}
    </h2>
  );
};

// Heading 3 - Subsection titles
export const Heading3 = ({ 
  children, 
  className = '', 
  color = 'text-surface-700 dark:text-surface-300', 
  align = 'text-left'
}) => {
  return (
    <h3 className={`text-xl md:text-2xl font-medium ${color} ${align} leading-snug mb-2 font-heading ${className}`}>
      {children}
    </h3>
  );
};

// Heading 4 - Component titles
export const Heading4 = ({ 
  children, 
  className = '', 
  color = 'text-surface-600 dark:text-surface-300', 
  align = 'text-left'
}) => {
  return (
    <h4 className={`text-lg font-medium ${color} ${align} leading-normal mb-2 font-heading ${className}`}>
      {children}
    </h4>
  );
};

// Paragraph text
export const Paragraph = ({ 
  children, 
  className = '', 
  color = 'text-surface-600 dark:text-surface-400', 
  size = 'normal'
}) => {
  const sizeClass = {
    small: 'text-sm',
    normal: 'text-base',
    large: 'text-lg'
  }[size] || 'text-base';
  
  return (
    <p className={`${sizeClass} ${color} leading-relaxed mb-4 ${className}`}>
      {children}
    </p>
  );
};

// Text components for different purposes
export const Label = ({ children, className = '' }) => (
  <label className={`font-medium text-surface-700 dark:text-surface-300 mb-1 block ${className}`}>
    {children}
  </label>
);

export const Caption = ({ children, className = '' }) => (
  <span className={`text-sm text-surface-500 dark:text-surface-400 ${className}`}>
    {children}
  </span>
);

// PropTypes for all components
Heading1.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  align: PropTypes.string
};

Heading2.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  align: PropTypes.string
};

Heading3.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  align: PropTypes.string
};

Heading4.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  align: PropTypes.string
};

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'normal', 'large'])
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

Caption.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};