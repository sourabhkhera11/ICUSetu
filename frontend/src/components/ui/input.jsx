import React from "react";

export const Input = ({ className, ...props }) => (
  <input
    className={`w-full px-3 py-2 rounded-md bg-gray-700 text-white ${className}`}
    {...props}
  />
);
