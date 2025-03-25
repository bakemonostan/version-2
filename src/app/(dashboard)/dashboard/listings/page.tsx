import React from 'react';

export default function ListingsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Listings</h1>
      <div className="grid gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Your Property Listings</h2>
          <p>View and manage all your property listings here.</p>
        </div>
      </div>
    </div>
  );
} 
