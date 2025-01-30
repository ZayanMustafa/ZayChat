import React from "react";

export const Avatar = ({ children, className }) => {
  return (
    <div
      className={`rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
};

export const AvatarImage = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="object-cover w-full h-full"
      onError={(e) => (e.target.style.display = "none")} 
    />
  );
};

export const AvatarFallback = ({ children }) => {
  return (
    <span className="text-gray-700 font-bold text-lg">
      {children}
    </span>
  );
};
