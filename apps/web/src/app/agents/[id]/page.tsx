"use client";

import React, { useState, use } from 'react';
import Link from 'next/link';
import { agentsData } from '@/lib/agentsData';

export default function AgentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const [loading, setLoading] = useState(false);
  const [trialStarted, setTrialStarted] = useState(false);
  
  // Unwrap the params promise (Next.js 15+ requirement)
  const resolvedParams = use(params);
  const agent = agentsData[resolvedParams.id];

  if (!agent) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Agent Not Found</h1>
          <p className="text-gray-500 mb-6">The agent you are looking for does not exist in our registry.</p>
          <Link href="/" className="text-blue-600 hover:underline">Return Home</Link>
        </div>
      </main>
    );
  }

  const handleStartTrial = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTrialStarted(true);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Top Nav / Breadcrumb */}
      <div className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between text-sm">
          <Link href="/" className="text-gray-500 hover:text-blue-600 transition font-medium">
            ← Back to Home
          </Link>
          <span className="text-gray-400 font-mono text-xs">Agent ID: {agent.id}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {agent.category}
              </span>
              <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium bg-yellow-50 px-2 py-1 rounded-full border border-yellow-200">
                ★ {agent.rating} <span className="text-gray-500 font-normal ml-1">({agent.reviews} reviews)</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-extrabold mb-2 text-gray-900 tracking-tight">{agent.name}</h1>
            <p className="text-gray-500 mb-8 font-medium">Developed by {agent.developer}</p>
            
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                About this Agent
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {agent.description}
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Core Capabilities</h2>
              <ul className="space-y-3">
                {agent.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <span className="text-green-500 mt-0.5 font-bold">✓</span>
                    {cap}
                  </li>
                ))}
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4 text-gray-900">Supported Integrations</h2>
              <div className="flex flex-wrap gap-2">
                {agent.integrations.map((integration, i) => (
                  <span key={i} className="border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:border-blue-300 transition cursor-default">
                    {integration}
                  </span>
                ))}
              </div>
            </section>
          </div>
          
          {/* Action Sidebar */}
          <div>
            <div className="border border-gray-200 rounded-2xl p-6 shadow-lg bg-white sticky top-8">
              <div className="mb-6 pb-6 border-b border-gray-100">
                <span className="text-4xl font-extrabold text-gray-900 tracking-tight">{agent.price}</span>
                <span className="text-gray-500 block text-sm mt-2 font-medium">Flat rate. Unlimited task executions.</span>
              </div>
              
              {!trialStarted ? (
                <>
                  <button className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3.5 rounded-xl transition shadow-md mb-3">
                    Hire Agent Now
                  </button>
                  <button 
                    onClick={handleStartTrial}
                    disabled={loading}
                    className="w-full bg-white border-2 border-blue-600 hover:bg-blue-50 text-blue-700 font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="animate-pulse">Provisioning Agent...</span>
                    ) : (
                      'Start 7-Day Free Trial'
                    )}
                  </button>
                </>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">✓</div>
                  <h3 className="font-bold text-green-800 mb-1">Trial Activated!</h3>
                  <p className="text-sm text-green-700 mb-4">Your agent is spinning up.</p>
                  <Link href={`/dashboard?agentId=${agent.id}`} className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition shadow-sm text-sm">
                    Open Agent Dashboard
                  </Link>
                </div>
              )}
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Security & Compliance</h3>
                <p className="text-sm text-gray-700 flex items-center gap-2 font-medium bg-gray-50 p-2 rounded-md">
                  🔒 {agent.security}
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
