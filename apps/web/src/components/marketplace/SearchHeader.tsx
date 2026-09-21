"use client";

import React, { useState } from 'react';
import { AgentProps } from '@/components/marketplace/AgentCard';

export function SearchHeader({ onMatch }: { onMatch?: (agents: AgentProps[]) => void }) {
  const [requirement, setRequirement] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (!requirement) return;
    setLoading(true);
    try {
      const aiApiUrl = process.env.NEXT_PUBLIC_AI_API_URL || 'http://localhost:8000';
      const res = await fetch(`${aiApiUrl}/api/v1/requirements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-tenant-id': 'org_123' },
        body: JSON.stringify({ raw_text: requirement, tenant_id: 'org_123' })
      });
      const data = await res.json();
      
      // Map AI API matches to the frontend AgentProps
      const matchedAgents: AgentProps[] = (data.matches || []).map((m: any, i: number) => ({
        id: m.agent_id || String(i),
        name: `Matched Agent ${m.agent_id}`, // In real app, fetch profile from core-api
        description: m.explanation,
        category: 'Customer Support',
        rating: 4.5 + (m.score * 0.5),
        price: 'Dynamic'
      }));

      if (onMatch) {
        onMatch(matchedAgents);
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching matches.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Discover the Right AI Agent for Your Business</h1>
        <p className="text-xl text-slate-300 mb-8">
          Describe the work you need done, and we'll match you with verified agents.
        </p>
        <div className="flex max-w-2xl mx-auto bg-white rounded-lg p-2 shadow-lg">
          <input 
            type="text" 
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            placeholder="E.g., I need an agent to answer customer support tickets in Zendesk..."
            className="flex-grow text-gray-900 px-4 py-3 outline-none rounded-l-lg"
          />
          <button 
            onClick={handleMatch}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition disabled:bg-blue-400"
          >
            {loading ? 'Matching...' : 'Match Me'}
          </button>
        </div>
      </div>
    </div>
  );
}

