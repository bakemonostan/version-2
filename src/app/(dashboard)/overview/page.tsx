import React from 'react';

export default function OverviewPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Welcome to your dashboard</h2>
          <p>This is your dashboard overview page where you can see a summary of your activity.</p>
        </div>
      </div>
    </div>
  );
} 
