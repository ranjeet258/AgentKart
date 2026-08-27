"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { agentsData } from '@/lib/agentsData';

function DashboardContent() {
  const searchParams = useSearchParams();
  const agentId = searchParams.get('agentId');
  const agent = agentId && agentsData[agentId] ? agentsData[agentId] : agentsData['1']; // fallback to Support Agent

  const [input, setInput] = useState('');
  const initialGreeting = `Hello! I am your new ${agent.name}. I am securely connected to your knowledge base and integrations (${agent.integrations.join(', ')}). I'm monitoring the queue and ready to handle tasks autonomously.`;

  const [messages, setMessages] = useState([
    { role: 'agent', content: initialGreeting }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages([...newMessages, { 
        role: 'agent', 
        content: `I have received your request. I am logging this task into Temporal.io for durable execution. You can monitor the execution in the Active Tasks queue.` 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-blue-600 hover:opacity-80">
              AgentKart
            </Link>
            <span className="text-gray-300">|</span>
            <span className="font-semibold text-gray-800">
              {agent.name} Workspace
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="text-gray-500">Uptime: 99.9%</span>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700">Autonomous Mode Active</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 3-Column Dashboard */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Live Queue & Integrations */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
              Active Integrations
              <span className="text-xs font-normal bg-blue-50 text-blue-600 px-2 py-1 rounded">All Systems Go</span>
            </h3>
            <div className="space-y-3">
              {agent.integrations.map((int, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">{int} Connector</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex-1">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
              Live Task Queue
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600">3</span>
            </h3>
            <div className="space-y-4">
              <div className="border-l-2 border-blue-500 pl-3">
                <p className="text-sm font-semibold text-gray-800">{agent.id === '1' ? 'Ticket #14092: Password Reset' : 'Task: Analyze Q2 Metrics'}</p>
                <p className="text-xs text-gray-500 mt-1">Status: Processing step-by-step...</p>
              </div>
              <div className="border-l-2 border-yellow-500 pl-3">
                <p className="text-sm font-semibold text-gray-800">{agent.id === '1' ? 'Ticket #14093: Refund Request' : 'Task: Generate Content'}</p>
                <p className="text-xs text-gray-500 mt-1">Status: Waiting on API response</p>
              </div>
              <div className="border-l-2 border-gray-200 pl-3">
                <p className="text-sm font-semibold text-gray-500">{agent.id === '1' ? 'Ticket #14094: Shipping Delay' : 'Task: Outbound Email'}</p>
                <p className="text-xs text-gray-400 mt-1">Status: Queued via Temporal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column: Chat / CLI Interface */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 p-4">
            <h3 className="font-bold text-gray-900">Direct Agent Override Console</h3>
            <p className="text-xs text-gray-500 mt-0.5">Interrupt autonomous workflows by sending direct commands.</p>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-slate-100 border border-slate-200 text-gray-800 rounded-bl-none'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 border border-slate-200 rounded-2xl rounded-bl-none p-4 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <form onSubmit={handleSend} className="flex gap-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="E.g., Escalate ticket #14093 to a human..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition outline-none"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg text-sm font-semibold transition shadow-sm disabled:opacity-50"
              >
                Execute
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Knowledge Base & Memory */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="font-bold text-gray-900 mb-4">Core Capabilities</h3>
            <div className="flex flex-wrap gap-2">
              {agent.capabilities.map((cap, i) => (
                <span key={i} className="text-[11px] font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">
                  {cap.split('(')[0].trim()}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex-1">
            <h3 className="font-bold text-gray-900 mb-4">Knowledge Base (RAG)</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">PDF</div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Return_Policy_2026.pdf</p>
                  <p className="text-xs text-gray-500">Indexed 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">DOC</div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Internal_Troubleshooting_Guide</p>
                  <p className="text-xs text-gray-500">Indexed yesterday</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">DB</div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Customer FAQs Vector DB</p>
                  <p className="text-xs text-gray-500">Live sync via Qdrant</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Workspace...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
