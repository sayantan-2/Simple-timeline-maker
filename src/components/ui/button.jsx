import React from "react";

export const Button = React.forwardRef(
  ({ className, variant = "default", size = "medium", ...props }, ref) => {
    const baseStyles =
      "font-medium rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variantStyles = {
      default:
        "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
      outline:
        "border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
      ghost: "text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };
    const sizeStyles = {
      small: "px-2 py-1 text-sm",
      medium: "px-4 py-2",
      large: "px-6 py-3 text-lg",
    };

    const finalClassName = `${baseStyles} ${variantStyles[variant]} ${
      sizeStyles[size]
    } ${className || ""}`.trim();

    return <button ref={ref} className={finalClassName} {...props} />;
  }
);
