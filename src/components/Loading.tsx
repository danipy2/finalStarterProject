// components/Loading.tsx
import React from "react";

export const Loading: React.FC = () => (
  <div className="flex items-center justify-center p-4">
    <svg
      className="animate-spin h-6 w-6 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25 stroke-current"
        cx="12"
        cy="12"
        r="10"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75 stroke-current"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      ></path>
    </svg>
    <span>Loading…</span>
  </div>
);