import React from 'react';

export default function LoadingPage() {
  return (
    <div className="text-center spinner-overlay">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}