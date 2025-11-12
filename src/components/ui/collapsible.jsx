import React from "react";

const Collapsible = ({ open, onOpenChange, children }) => {
  return (
    <div data-state={open ? "open" : "closed"}>
      {children}
    </div>
  );
};

const CollapsibleTrigger = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div ref={ref} className={`overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
});
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };