'use client';

import React, { useState } from 'react';

const YOU_TOOLS = [
  { icon: '📞', name: 'Phone' },
  { icon: '💬', name: 'Slack' },
  { icon: '📱', name: 'WhatsApp' },
  { icon: '✉️', name: 'Telegram' },
  { icon: '📧', name: 'Email' },
  { icon: '💻', name: 'Code' },
  { icon: '🔌', name: 'API' },
  { icon: '🌐', name: 'Network' },
  { icon: '💭', name: 'Chat' },
  { icon: '🎙️', name: 'Voice' },
];

const TEAM_MEMBERS = [
  {
    id: 'sales',
    role: 'Sales Representative',
    name: 'Sales',
    image: 'https://i.pravatar.cc/150?img=11',
    tools: [
      { icon: '🎯', name: 'HubSpot', color: 'text-orange-500' },
      { icon: '💼', name: 'Salesforce', color: 'text-blue-500' },
      { icon: '💬', name: 'Slack', color: 'text-purple-500' },
    ]
  },
  {
    id: 'marketing',
    role: 'Marketing Manager',
    name: 'Marketing',
    image: 'https://i.pravatar.cc/150?img=5',
    tools: [
      { icon: '🌍', name: 'Web', color: 'text-gray-300' },
      { icon: '📊', name: 'Analytics', color: 'text-blue-400' },
      { icon: '🎯', name: 'Ads', color: 'text-blue-600' },
    ]
  },
  {
    id: 'support',
    role: 'Support Specialist',
    name: 'Support',
    image: 'https://i.pravatar.cc/150?img=9',
    tools: [
      { icon: '📖', name: 'Docs', color: 'text-gray-300' },
      { icon: '💭', name: 'Zendesk', color: 'text-green-500' },
      { icon: '📧', name: 'Intercom', color: 'text-blue-400' },
    ]
  },
  {
    id: 'accountant',
    role: 'Accountant',
    name: 'Accounting',
    image: 'https://i.pravatar.cc/150?img=12',
    tools: [
      { icon: '🧮', name: 'QuickBooks', color: 'text-green-600' },
      { icon: '📁', name: 'Xero', color: 'text-blue-300' },
      { icon: '💳', name: 'PayPal', color: 'text-blue-700' },
    ]
  },
  {
    id: 'data',
    role: 'Data Analyst',
    name: 'Data',
    image: 'https://i.pravatar.cc/150?img=13',
    tools: [
      { icon: '💾', name: 'Drive', color: 'text-yellow-500' },
      { icon: '📈', name: 'Sheets', color: 'text-green-500' },
      { icon: '🐙', name: 'GitHub', color: 'text-white' },
    ]
  }
];

export function AgentHierarchy() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  
  // Calculate positions for the circular arrangement of "You" tools
  const radius = 140;
  
  return (
    <div className="min-h-screen bg-[#1e2330] text-white flex flex-col items-center justify-start py-20 px-4 font-sans overflow-x-hidden">
      
      {/* Central "You" Node Area */}
      <div className="relative w-[400px] h-[400px] flex items-center justify-center">
        {/* Tool Ring */}
        <div className="absolute inset-0 border border-gray-600/30 rounded-full animate-[spin_60s_linear_infinite]" style={{ borderStyle: 'dashed' }} />
        
        {YOU_TOOLS.map((tool, index) => {
          const angle = (index / YOU_TOOLS.length) * 2 * Math.PI - Math.PI / 2;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          
          return (
            <div
              key={tool.name}
              className="absolute w-12 h-12 bg-[#2a3040] rounded-full flex items-center justify-center cursor-pointer border border-gray-600/50 hover:bg-[#343b4d] hover:border-blue-400/50 hover:scale-110 transition-all duration-300 z-20 group"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              onMouseEnter={() => setHoveredTool(tool.name)}
              onMouseLeave={() => setHoveredTool(null)}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{tool.icon}</span>
              
              {hoveredTool === tool.name && (
                <div
                  className="absolute -top-10 bg-[#343b4d] px-3 py-1.5 rounded-md text-xs whitespace-nowrap border border-gray-600 shadow-xl animate-in fade-in slide-in-from-bottom-2"
                >
                  {tool.name}
                </div>
              )}
            </div>
          );
        })}
        
        {/* Connecting Line to active tool (mock) */}
        {hoveredTool && (
           <svg className="absolute inset-0 pointer-events-none z-10" viewBox="-200 -200 400 400">
             {(() => {
               const index = YOU_TOOLS.findIndex(t => t.name === hoveredTool);
               if (index === -1) return null;
               const angle = (index / YOU_TOOLS.length) * 2 * Math.PI - Math.PI / 2;
               const x = (radius - 20) * Math.cos(angle);
               const y = (radius - 20) * Math.sin(angle);
               return (
                 <line x1="0" y1="0" x2={x} y2={y} stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
               );
             })()}
           </svg>
        )}

        {/* Central "You" Profile */}
        <div className="relative z-30 flex flex-col items-center">
          <div className="text-sm text-gray-400 mb-2 font-medium">You</div>
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl scale-150 animate-pulse" />
            <div className="w-24 h-24 bg-blue-300 rounded-full flex items-center justify-center border-4 border-[#1e2330] relative z-10 shadow-[0_0_30px_rgba(96,165,250,0.3)]">
              <span className="text-4xl">👤</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connection from You to Alice */}
      <div className="h-24 w-px bg-gray-600/50 relative">
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/50 to-transparent animate-pulse" />
      </div>

      {/* Alice (Personal Assistant) */}
      <div className="relative flex flex-col items-center z-20">
        <div className="relative group cursor-pointer">
           <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl scale-125 opacity-0 group-hover:opacity-100 transition-opacity" />
           <img 
            src="https://i.pravatar.cc/150?img=32" 
            alt="Alice" 
            className="w-20 h-20 rounded-full border-2 border-blue-400/50 object-cover"
          />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1e2330]" />
        </div>
        <div className="mt-3 font-semibold text-white">Alice</div>
        <div className="text-sm text-gray-400">Personal Assistant</div>
      </div>

      {/* Hierarchy Connections container */}
      <div className="relative w-full max-w-5xl h-32 mt-4">
        {/* We use SVG for precise curved lines from Alice to Team */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
           {TEAM_MEMBERS.map((_, index) => {
             const startX = '50%';
             const startY = '0';
             const endX = `${10 + (index * (80 / (TEAM_MEMBERS.length - 1)))}%`;
             const endY = '100%';
             
             return (
               <path 
                 key={index}
                 d={`M 50% 0 C 50% 50%, ${endX} 50%, ${endX} 100%`} 
                 fill="none" 
                 stroke="#4b5563" 
                 strokeWidth="1.5"
                 className="opacity-40"
               />
             );
           })}
        </svg>
      </div>

      {/* Team Members Row */}
      <div className="w-full max-w-6xl flex justify-between px-4 sm:px-10 z-20 relative -mt-2 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {TEAM_MEMBERS.map((member, index) => (
          <div 
            key={member.id}
            className="flex flex-col items-center flex-1"
          >
            <div className="text-sm text-gray-300 font-medium mb-3 h-10 text-center flex items-center justify-center">
              {member.role}
            </div>
            
            <div className="relative group cursor-pointer mb-6 hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl scale-125 opacity-0 group-hover:opacity-100 transition-opacity" />
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-16 h-16 rounded-full border-2 border-gray-600/50 group-hover:border-blue-400/50 transition-colors object-cover relative z-10"
              />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#1e2330] z-20" />
            </div>

            {/* Team Member Tools Layout */}
            <div className="relative w-full flex justify-center h-20">
               {/* Connections to tools */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '-20px' }}>
                  <path d="M 50% 0 L 25% 100%" fill="none" stroke="#4b5563" strokeWidth="1" className="opacity-30" />
                  <path d="M 50% 0 L 50% 100%" fill="none" stroke="#4b5563" strokeWidth="1" className="opacity-30" />
                  <path d="M 50% 0 L 75% 100%" fill="none" stroke="#4b5563" strokeWidth="1" className="opacity-30" />
               </svg>
               
               <div className="flex gap-3 absolute bottom-0">
                  {member.tools.map((tool, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full bg-[#2a3040] border border-gray-600/50 flex items-center justify-center hover:scale-110 hover:border-blue-400/50 transition-all cursor-pointer group relative"
                      title={tool.name}
                    >
                       <span className="text-sm">{tool.icon}</span>
                       
                       {/* Tooltip */}
                       <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-[#343b4d] text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap z-30">
                         {tool.name}
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
