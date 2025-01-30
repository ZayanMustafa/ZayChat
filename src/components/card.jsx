import React from 'react'

function Card({ className, children }) {
  return <div className={`shadow-lg rounded-lg ${className}`}>{children}</div>
}

function CardHeader({ className, children }) {
  return <div className={`p-4 border-b ${className}`}>{children}</div>
}

function CardContent({ className, children }) {
  return <div className={`p-4 ${className}`}>{children}</div>
}

export { Card, CardHeader, CardContent }
