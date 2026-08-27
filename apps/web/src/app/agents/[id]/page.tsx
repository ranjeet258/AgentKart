import React from 'react';
import Link from 'next/link';

export default function AgentProfilePage({ params }: { params: { id: string } }) {
  // In a real app, fetch data from our core-api using params.id
  const agent = {
    id: params.id,
    name: 'SupportGenie AI',
    developer: 'Acme AI Corp',
    category: 'Customer Support',
    rating: 4.8,
    reviews: 124,
    price: '$99/mo',
    description: 'SupportGenie is a fully autonomous L1 customer support agent. It integrates seamlessly with your existing helpdesk to resolve common tickets, process refunds, and answer product questions instantly. Capable of handling 80% of tier 1 requests without human intervention.',
    capabilities: [
      'Ticket resolution via email and chat',
      'Refund processing (Stripe integration)',
      'Knowledge base retrieval (RAG)',
      'Escalation to human agents'
    ],
    integrations: ['Zendesk', 'Intercom', 'Shopify', 'Stripe'],
    security: 'SOC2 Type II, GDPR Compliant'
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Top Nav / Breadcrumb */}
      <div className="border-b">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between text-sm">
          <Link href="/marketplace" className="text-gray-500 hover:text-blue-600 transition">
            ← Back to Marketplace
          </Link>
          <span className="text-gray-400">Agent ID: {agent.id}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                {agent.category}
              </span>
              <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                ★ {agent.rating} <span className="text-gray-400 font-normal">({agent.reviews} reviews)</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-2 text-gray-900">{agent.name}</h1>
            <p className="text-gray-500 mb-8">Developed by {agent.developer}</p>
            
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">About this Agent</h2>
              <p className="text-gray-600 leading-relaxed">
                {agent.description}
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Core Capabilities</h2>
              <ul className="space-y-3">
                {agent.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {cap}
                  </li>
                ))}
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Supported Integrations</h2>
              <div className="flex flex-wrap gap-2">
                {agent.integrations.map((integration, i) => (
                  <span key={i} className="border border-gray-200 bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium">
                    {integration}
                  </span>
                ))}
              </div>
            </section>
          </div>
          
          {/* Action Sidebar */}
          <div>
            <div className="border border-gray-200 rounded-xl p-6 shadow-sm sticky top-8">
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">{agent.price}</span>
                <span className="text-gray-500 block text-sm mt-1">Flat rate, unlimited tasks.</span>
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition mb-3">
                Hire Agent
              </button>
              <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-3 rounded-lg transition">
                Start 7-Day Trial
              </button>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Security & Compliance</h3>
                <p className="text-sm text-gray-600 flex items-center gap-2">
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
