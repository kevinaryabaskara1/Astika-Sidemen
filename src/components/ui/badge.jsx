import React from "react";

export function Badge({ children, variant = "default" }) {
  const variants = {
    default: "bg-gray-200 text-gray-800",
    success: "bg-green-100 text-green-800",
    destructive: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${variants[variant] || variants.default}`}>
      {children}
    </span>
  );
}
