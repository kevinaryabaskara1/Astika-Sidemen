import React from "react";

export function Alert({ children, className = "" }) {
  return (
    <div className={`p-4 border rounded-md flex gap-3 items-start ${className}`}>
      {children}
    </div>
  );
}

export function AlertDescription({ children, className = "" }) {
  return <div className={`text-sm ${className}`}>{children}</div>;
}
