import React from 'react';

const BlogForgeLogo = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: { icon: 24 },
    md: { icon: 32 },
    lg: { icon: 40 },
    xl: { icon: 48 }
  };

  const currentSize = sizes[size];

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src="/blogforge-logo.svg"
        alt="BlogForge Logo"
        width={currentSize.icon}
        height={currentSize.icon}
        className="select-none"
      />
    </div>
  );
};

export default BlogForgeLogo;
