import Link from 'next/link';
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
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-24 pb-16 px-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
          Your Autonomous AI Workforce
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
          Discover, hire, and manage AI agents that work alongside your team. Make AI capability purchasable and operable like human talent.
        </p>
        
        <div className="flex gap-4">
          <Link href="/marketplace" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition">
            Explore All Agents
          </Link>
          <Link href="/provider/onboarding" className="bg-white border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 px-8 py-4 rounded-lg font-medium text-lg transition">
            Become a Provider
          </Link>
        </div>
      </section>

      {/* Featured Agents Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Your New Hires</h2>
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

