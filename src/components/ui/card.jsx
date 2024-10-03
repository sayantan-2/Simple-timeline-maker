import React from "react";

export const Card = ({ className, ...props }) => (
  <div className={`border rounded-xl shadow p-4 ${className}`} {...props} />
);

export const CardContent = ({ className, ...props }) => (
  <div className={`${className}`} {...props} />
);
