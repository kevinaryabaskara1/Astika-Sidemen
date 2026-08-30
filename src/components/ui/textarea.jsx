import React from "react";

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full p-2 border rounded-md text-sm focus:outline-none focus:ring focus:border-blue-500 ${className}`}
      {...props}
    />
  );
}
