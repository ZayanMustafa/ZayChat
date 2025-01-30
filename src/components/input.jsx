import React from 'react';

export default function Input({ placeholder, className }) {
  return (
    <input
      type="search"
      placeholder={placeholder}
      className={className}
    />
  );
}