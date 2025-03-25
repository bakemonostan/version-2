import React from 'react';

export default function RequestsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Requests</h1>
      <div className="grid gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Your Booking Requests</h2>
          <p>View and manage all booking requests for your properties.</p>
        </div>
      </div>
    </div>
  );
} 
