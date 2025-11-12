import React, { useState } from "react";

// Simple tooltip implementation without Radix UI
export const TooltipProvider = ({ children }) => children;

export const Tooltip = ({ children }) => {
  return <>{children}</>;
};

export const TooltipTrigger = React.forwardRef(({ children, asChild, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { ref, ...props });
  }
  return <div ref={ref} {...props}>{children}</div>;
});
TooltipTrigger.displayName = "TooltipTrigger";

export const TooltipContent = ({ children, className = "" }) => {
  return (
    <div
      className={`absolute z-50 px-3 py-2 text-xs text-white bg-gray-900 rounded-lg shadow-xl pointer-events-none whitespace-nowrap ${className}`}
      style={{
        bottom: 'calc(100% + 8px)',
        left: '50%',
        transform: 'translateX(-50%)'
      }}
    >
      {children}
      <div 
        className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"
        style={{ marginTop: '-4px' }}
      />
    </div>
  );
};