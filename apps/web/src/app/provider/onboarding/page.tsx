"use client";

import React, { useState } from 'react';

export default function ProviderOnboardingPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Customer Support',
    description: '',
    pricingRef: '$50/mo'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real app this hits core-api/api/v1/agents
      console.log('Submitting new agent:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      setSuccess(true);
    } catch (err) {
      alert('Error creating agent');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-gray-50 py-20 flex items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow-sm text-center max-w-md w-full border">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
          <h2 className="text-2xl font-bold mb-2">Agent Published!</h2>
          <p className="text-gray-600 mb-8">Your agent is now listed in the AgentKart marketplace and available for trial.</p>
          <button onClick={() => setSuccess(false)} className="text-blue-600 hover:underline">Publish another agent</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">List an AI Agent</h1>
        <p className="text-gray-500 mb-8">Publish your agent to the marketplace and define its capabilities.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Agent Name</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. SalesGenius AI"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option>Customer Support</option>
                <option>Data Analysis</option>
                <option>Engineering</option>
                <option>Sales</option>
                <option>Marketing</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pricing (Flat/mo)</label>
              <input 
                required
                type="text" 
                value={formData.pricingRef}
                onChange={e => setFormData({...formData, pricingRef: e.target.value})}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. $99/mo"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description & Capabilities</label>
            <textarea 
              required
              rows={5}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe what your agent does, tools it uses, and how it delivers value..."
            />
          </div>
          
          <div className="pt-4 border-t">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:bg-blue-400"
            >
              {loading ? 'Publishing...' : 'Publish to Marketplace'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
