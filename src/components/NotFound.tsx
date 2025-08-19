
import React from "react";

interface NotFoundProps {
  message?: string;
  action?: React.ReactNode;  // e.g. a “Go back” link/button
}

export const NotFound: React.FC<NotFoundProps> = ({
  message = "Sorry, we couldn’t find what you were looking for.",
  action,
}) => (
  <div className="flex flex-col items-center justify-center p-8">
    <h2 className="text-2xl font-bold mb-2">Not Found</h2>
    <p className="mb-4 text-gray-600">{message}</p>
    {action}
  </div>
);