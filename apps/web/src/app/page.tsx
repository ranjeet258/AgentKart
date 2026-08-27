import Link from 'next/link';
import { OrgChart } from '@/components/marketplace/OrgChart';
import { AgentCard } from '@/components/marketplace/AgentCard';
import { agentsData } from '@/lib/agentsData';

const featuredAgents = [
  agentsData['1'],
  agentsData['2'],
  agentsData['3'],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Hero Section - 2 Columns */}
      <section className="max-w-7xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-start text-left z-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-5 leading-tight">
            Your Autonomous AI Workforce
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
            Deploy an entire agency with a single click. Our specialized AI agents work alongside your team and coordinate tasks seamlessly.
          </p>
          
          <div className="flex gap-4">
            <Link href="/marketplace" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-sm">
              View Our Agents
            </Link>
          </div>
        </div>

        {/* Tree Org Chart on the right */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden w-full flex flex-col justify-center items-center">
          <div className="bg-slate-50 border-b border-gray-200 p-3 text-center w-full">
            <span className="font-semibold text-gray-700 text-sm">Live Team Structure: Interactive Preview</span>
          </div>
          <div className="w-full relative flex justify-center overflow-hidden">
            <OrgChart />
          </div>
        </div>
      </section>

      {/* Featured Agents Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 w-full border-t border-gray-200 mt-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Meet Your New Hires</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Ready-to-deploy agents that integrate securely into your existing tools and workflows.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>
    </main>
  );
}
