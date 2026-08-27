"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { agentsData } from '@/lib/agentsData';

function DashboardContent() {
  const searchParams = useSearchParams();
  const agentId = searchParams.get('agentId');
  const agent = agentId && agentsData[agentId] ? agentsData[agentId] : null;

  const [input, setInput] = useState('');
  
  // Set dynamic greeting based on agent capabilities
  const initialGreeting = agent 
    ? `Hello! I am your new ${agent.name}. I am securely connected to your knowledge base and integrations (${agent.integrations.join(', ')}). I'm ready to handle ${agent.capabilities[0].toLowerCase()} and much more. What would you like me to tackle first?`
    : 'Hello! I am your newly hired Agent. I am connected to your Neo4j org chart and ready to receive instructions. What would you like me to do?';

  const [messages, setMessages] = useState([
    { role: 'agent', content: initialGreeting }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: 'agent', 
        content: `I have received your request. I am logging this task into Temporal.io for durable execution. I will notify you once I have orchestrated this across the required sub-agents.` 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Dashboard Nav */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-blue-600">
              AgentKart
            </Link>
            <span className="text-gray-300">|</span>
            <span className="font-semibold text-gray-700">
              {agent ? `${agent.name} Workspace` : 'Active Agent Workspace'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600">Agent Online</span>
          </div>
        </div>
      </nav>

      {/* Main Chat Interface */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col">
        <div className="bg-white flex-1 rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          
          {/* Chat History */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 bg-slate-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                }`}>
                  <p className="leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <form onSubmit={handleSend} className="flex gap-4">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Assign a task to your agent..."
                className="flex-1 bg-gray-100 border-transparent rounded-xl px-4 py-3 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-medium transition shadow-sm disabled:opacity-50"
              >
                Send Task
              </button>
            </form>
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
