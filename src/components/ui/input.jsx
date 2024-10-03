import React from "react";

export const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`px-3 py-2 border rounded ${className}`}
    {...props}
  />
));
