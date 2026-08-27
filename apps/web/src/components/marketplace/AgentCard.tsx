import React from 'react';

export interface AgentProps {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  price: string;
}

export function AgentCard({ agent }: { agent: AgentProps }) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition bg-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{agent.name}</h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{agent.category}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span className="text-sm font-medium">{agent.rating.toFixed(1)}</span>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{agent.description}</p>
      <div className="flex justify-between items-center mt-auto">
        <span className="font-medium text-blue-600">{agent.price}</span>
        <button className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition">
          View Profile
        </button>
      </div>
    </div>
  );
}
