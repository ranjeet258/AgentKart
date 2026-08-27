import Link from 'next/link';
import { OrgChart } from '@/components/marketplace/OrgChart';
import { AgentCard } from '@/components/marketplace/AgentCard';

const featuredAgents = [
  {
    id: '1',
    name: 'SupportGenie AI',
    description: 'Fully autonomous L1 customer support agent. Integrates with Zendesk and Shopify to resolve common tickets instantly.',
    category: 'Customer Support',
    rating: 4.8,
    price: '$99/mo'
  },
  {
    id: '2',
    name: 'DataCruncher Pro',
    description: 'Connects to your data warehouse and answers natural language questions with verified SQL and charts.',
    category: 'Data Analysis',
    rating: 4.9,
    price: '$0.02/task'
  },
  {
    id: '3',
    name: 'Outbound SDR',
    description: 'Researches prospects, writes highly personalized cold emails, and manages follow-ups in Salesforce.',
    category: 'Sales',
    rating: 4.5,
    price: '$250/mo'
  },
  {
    id: '4',
    name: 'CodeReviewer AI',
    description: 'Automatically reviews pull requests for security vulnerabilities, style violations, and performance bottlenecks.',
    category: 'Engineering',
    rating: 4.7,
    price: '$49/mo'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section - 2 Columns */}
      <section className="max-w-7xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-start text-left">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-5 leading-tight">
            Your Autonomous AI Workforce
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
            Discover, hire, and manage AI agents that work alongside your team. Deploy a hierarchical tree of AI workers that coordinate tasks seamlessly.
          </p>
          
          <div className="flex gap-4">
            <Link href="/marketplace" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-sm">
              Explore Marketplace
            </Link>
            <Link href="/provider/onboarding" className="bg-white border border-gray-300 hover:border-blue-600 hover:text-blue-600 text-gray-700 px-6 py-3 rounded-lg font-medium transition shadow-sm">
              Train New Agent
            </Link>
          </div>
        </div>

        {/* Tree Org Chart on the right */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden w-full overflow-x-auto">
          <div className="bg-slate-50 border-b border-gray-200 p-3 text-center">
            <span className="font-semibold text-gray-700 text-sm">Live Team Structure: Interactive Preview</span>
          </div>
          <OrgChart />
        </div>
      </section>

      {/* Featured Agents Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 w-full border-t border-gray-200 mt-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Meet Your New Hires</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Ready-to-deploy agents that integrate securely into your existing tools and workflows.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {featuredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>
    </main>
  );
}
