import React from "react";

const buttonVariants = {
  variant: {
    default: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 shadow-md",
    destructive: "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 shadow-md",
    outline: "border-2 border-blue-600 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-700 hover:-translate-y-0.5",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 hover:-translate-y-0.5",
    ghost: "hover:bg-blue-50 hover:text-blue-600",
    link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700",
  },
  size: {
    default: "h-11 px-8 py-2 text-base min-h-[44px]",
    sm: "h-9 px-6 text-sm min-h-[36px]",
    lg: "h-12 px-10 text-lg min-h-[48px]",
    icon: "h-10 w-10 min-h-[40px] min-w-[40px]",
  },
};

export const Button = React.forwardRef(({ 
  className = "", 
  variant = "default", 
  size = "default", 
  children,
  disabled,
  ...props 
}, ref) => {
  const variantClass = buttonVariants.variant[variant] || buttonVariants.variant.default;
  const sizeClass = buttonVariants.size[size] || buttonVariants.size.default;
  
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98]";
  
  const combinedClasses = `${baseClasses} ${variantClass} ${sizeClass} ${className}`;

  return (
    <button
      ref={ref}
      className={combinedClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;