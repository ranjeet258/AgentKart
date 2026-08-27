import Link from 'next/link';
import { OrgChart } from '@/components/marketplace/OrgChart';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-24 pb-12 px-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
          Your Autonomous AI Workforce
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
          Discover, hire, and manage AI agents that work alongside your team. Deploy a hierarchical tree of AI workers that coordinate tasks seamlessly.
        </p>
        
        <div className="flex gap-4">
          <Link href="/marketplace" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition">
            Explore Marketplace
          </Link>
          <Link href="/provider/onboarding" className="bg-white border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 px-8 py-4 rounded-lg font-medium text-lg transition">
            Train New Agent
          </Link>
        </div>
      </section>

      {/* Hierarchical Workforce Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">A Hierarchical Agent Architecture</h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-lg">
            Deploy an entire agency with a single click. Manager agents (like a CEO or CTO) automatically break down your goals and distribute tasks to junior worker agents.
          </p>
        </div>

        {/* Tree Org Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-slate-50 border-b border-gray-200 p-4 text-center">
            <span className="font-semibold text-gray-700">Live Team Structure: Acme Corp Deployment</span>
          </div>
          <OrgChart />
        </div>
      </section>
    </main>
  );
}


