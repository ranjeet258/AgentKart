import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
        Welcome to AgentKart
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
        The global AI agent marketplace. Make AI capability purchasable and operable like business talent: discover it, evaluate it, hire it, and run the work reliably.
      </p>
      
      <div className="flex gap-4">
        <Link href="/marketplace" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition">
          Find an Agent
        </Link>
        <Link href="/provider/onboarding" className="bg-white border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 px-8 py-4 rounded-lg font-medium text-lg transition">
          Become a Provider
        </Link>
      </div>
    </main>
  );
}
