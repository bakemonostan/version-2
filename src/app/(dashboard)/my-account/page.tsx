import React from 'react';

export default function MyAccountPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      <div className="grid gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <p>Manage your profile, preferences, and account settings.</p>
        </div>
      </div>
    </div>
  );
} 
