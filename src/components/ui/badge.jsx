import React from "react";

const badgeVariants = {
  variant: {
    default: "border-transparent bg-gray-900 text-gray-50 hover:bg-gray-900/80",
    secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80",
    destructive: "border-transparent bg-red-500 text-gray-50 hover:bg-red-500/80",
    outline: "text-gray-950 border-gray-200",
  }
};

export function Badge({ className = "", variant = "default", ...props }) {
  const variantClass = badgeVariants.variant[variant] || badgeVariants.variant.default;
  
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 ${variantClass} ${className}`}
      {...props}
    />
  );
}

export default Badge;