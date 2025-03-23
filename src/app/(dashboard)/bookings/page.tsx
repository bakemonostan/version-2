import React from 'react';

export default function BookingsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <div className="grid gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
          <p>View and manage all your current and upcoming bookings.</p>
        </div>
      </div>
    </div>
  );
} 
