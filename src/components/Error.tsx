import React from "react";

interface ErrorMessageProps {
  message?: string;
}

export const Error: React.FC<ErrorMessageProps> = ({
  message = "Something went wrong.",
}) => (
  <div className="bg-red-100 text-red-800 border border-red-200 p-4 rounded">
    <strong>Error:</strong> {message}
  </div>
);