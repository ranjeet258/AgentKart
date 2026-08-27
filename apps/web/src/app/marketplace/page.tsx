"use client";

import React, { useState } from 'react';
import { SearchHeader } from '@/components/marketplace/SearchHeader';
import { FilterSidebar } from '@/components/marketplace/FilterSidebar';
import { AgentCard, AgentProps } from '@/components/marketplace/AgentCard';

export default function MarketplacePage() {
  const [agents, setAgents] = useState<AgentProps[]>([]);

  return (
    <main className="min-h-screen bg-gray-50">
      <SearchHeader onMatch={(matches) => setAgents(matches)} />
      
      <div className="max-w-7xl mx-auto px-6 py-12 flex gap-8">
        <FilterSidebar />
        
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recommended Agents</h2>
            <div className="text-sm text-gray-500">
              Showing {agents.length} results
            </div>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {agents.length > 0 ? (
              agents.map(agent => (
                <AgentCard key={agent.id} agent={agent} />
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-gray-500">
                Describe your requirements above to see recommended agents.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

