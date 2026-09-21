'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, MessageSquare, Mail, Code, Briefcase, Calculator, BarChart, Settings, Box, HelpCircle, 
  Database, LineChart, FileText, Image as ImageIcon, Users, ShoppingCart, ShieldCheck,
  Smartphone
} from 'lucide-react';

const YOU_TOOLS = [
  { icon: Smartphone, name: 'WhatsApp', color: 'text-green-500' },
  { icon: MessageSquare, name: 'Slack', color: 'text-purple-500' },
  { icon: Mail, name: 'Email', color: 'text-blue-500' },
  { icon: Phone, name: 'Phone', color: 'text-gray-600' },
  { icon: Code, name: 'Code', color: 'text-indigo-500' },
];

const TIER_2 = {
  coo: [
    { id: 'ops', name: 'Arjun', title: 'Operations Manager', avatar: 'https://i.pravatar.cc/150?img=11', tools: [{icon: Box, name: 'HubSpot'}] },
    { id: 'logistics', name: 'Karan', title: 'Logistics Manager', avatar: 'https://i.pravatar.cc/150?img=12', tools: [{icon: ShieldCheck, name: 'Tracker'}] },
    { id: 'support', name: 'Priya', title: 'Support Specialist', avatar: 'https://i.pravatar.cc/150?img=5', tools: [{icon: HelpCircle, name: 'Zendesk'}, {icon: MessageSquare, name: 'Chat'}] }
  ],
  cto: [
    { id: 'vp_eng', name: 'Ravi', title: 'VP of Engineering', avatar: 'https://i.pravatar.cc/150?img=13', tools: [{icon: Settings, name: 'AWS'}] },
    { id: 'eng_mgr', name: 'Aditya', title: 'Engineering Manager', avatar: 'https://i.pravatar.cc/150?img=14', tools: [{icon: BarChart, name: 'Jira'}] },
    { id: 'swe', name: 'Neha', title: 'Software Engineer', avatar: 'https://i.pravatar.cc/150?img=9', tools: [{icon: Code, name: 'VS Code'}] },
    { id: 'data_eng', name: 'Kavya', title: 'Data Engineer', avatar: 'https://i.pravatar.cc/150?img=10', tools: [{icon: Database, name: 'Postgres'}, {icon: Box, name: 'Airflow'}] },
    { id: 'ml_ai', name: 'Riya', title: 'ML/AI Engineer', avatar: 'https://i.pravatar.cc/150?img=20', tools: [{icon: LineChart, name: 'TensorFlow'}] }
  ],
  cfo: [
    { id: 'fin_mgr', name: 'Sneha', title: 'Finance Manager', avatar: 'https://i.pravatar.cc/150?img=32', tools: [{icon: FileText, name: 'Oracle'}] },
    { id: 'fin_ana', name: 'Vikram', title: 'Financial Analyst', avatar: 'https://i.pravatar.cc/150?img=33', tools: [{icon: LineChart, name: 'Bloomberg'}] },
    { id: 'accountant', name: 'Pooja', title: 'Accountant', avatar: 'https://i.pravatar.cc/150?img=35', tools: [{icon: Calculator, name: 'Tally'}, {icon: BarChart, name: 'Excel'}] }
  ],
  cmo: [
    { id: 'prod_des', name: 'Aisha', title: 'Product Designer', avatar: 'https://i.pravatar.cc/150?img=60', tools: [{icon: ImageIcon, name: 'Figma'}] },
    { id: 'mktg_mgr', name: 'Ananya', title: 'Marketing Manager', avatar: 'https://i.pravatar.cc/150?img=40', tools: [{icon: LineChart, name: 'Google Ads'}] },
    { id: 'sales_rep', name: 'Dev', title: 'Sales Rep', avatar: 'https://i.pravatar.cc/150?img=68', tools: [{icon: ShoppingCart, name: 'HubSpot'}, {icon: Briefcase, name: 'Salesforce'}] }
  ]
};

const C_SUITE = [
  { id: 'coo', name: 'Rahul', title: 'Chief Operating Officer', avatar: 'https://i.pravatar.cc/150?img=52', team: TIER_2.coo },
  { id: 'cto', name: 'Vikram', title: 'Chief Technology Officer', avatar: 'https://i.pravatar.cc/150?img=53', team: TIER_2.cto },
  { id: 'cfo', name: 'Amit', title: 'Chief Financial Officer', avatar: 'https://i.pravatar.cc/150?img=54', team: TIER_2.cfo },
  { id: 'cmo', name: 'Sanya', title: 'Chief Marketing Officer', avatar: 'https://i.pravatar.cc/150?img=55', team: TIER_2.cmo },
];

export function AdvancedOrgChart({ maxDepth = Infinity }: { maxDepth?: number }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // SVG dashed animation style
  const dashAnimation = `
    @keyframes dash {
      to {
        stroke-dashoffset: -20;
      }
    }
    .animate-dash {
      animation: dash 1s linear infinite;
    }
  `;

  return (
    <div className="w-full bg-slate-50 text-slate-800 font-sans p-10 overflow-hidden relative">
      <style>{dashAnimation}</style>
      
      <div className="min-w-[1400px] flex flex-col items-center mx-auto relative">
        
        {/* =========================================================
            LEVEL 1: "YOU" NODE (Admin) & ASSISTANT
            ========================================================= */}
        <div className="relative w-full max-w-4xl flex justify-center mb-8 h-64 mt-10">
          
          {/* Assistant (Left side) */}
          <motion.div 
            onClick={() => window.location.href = '/chat/assistant'}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center bg-white p-3 px-6 rounded-2xl border cursor-pointer ${hoveredNode === 'assistant' ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-105' : 'border-slate-200 shadow-md'} transition-all duration-300`}
            onMouseEnter={() => setHoveredNode('assistant')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className="relative">
              <img src="https://i.pravatar.cc/150?img=32" alt="Anjali" className="w-16 h-16 rounded-full border-2 border-slate-100 object-cover" />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full flex items-center justify-center">
                <span className="absolute w-full h-full bg-emerald-400 rounded-full animate-ping opacity-75"></span>
              </span>
            </div>
            <h2 className="font-bold text-slate-800 text-md mt-2">Anjali</h2>
            <p className="text-xs text-slate-500 font-medium text-center">Personal Assistant</p>
            <p className="text-[9px] text-slate-400 text-center mt-1 leading-tight max-w-[120px]">Your right hand, handling the day needs and bringing it in You</p>
          </motion.div>

          {/* Connection: Assistant -> You */}
          <svg className="absolute left-32 top-1/2 w-48 h-2 -translate-y-1/2 pointer-events-none z-0">
             <line 
               x1="0" y1="50%" x2="100%" y2="50%" 
               stroke={hoveredNode === 'ceo' || hoveredNode === 'assistant' || hoveredNode === 'you' ? '#06b6d4' : '#cbd5e1'} 
               strokeWidth="2" 
               strokeDasharray="4 4" 
               className="transition-colors duration-300 animate-dash"
             />
          </svg>

          {/* "You" Node (Center) */}
          <div 
            className="relative flex items-center justify-center w-64 h-64 z-10"
            onMouseEnter={() => setHoveredNode('you')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Concentric Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 rounded-full border border-blue-200 bg-blue-50/50 absolute" />
              <div className="w-48 h-48 rounded-full border border-blue-100 bg-blue-50/30 absolute" />
            </div>

            {/* Orbit Track (Dashed) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-52 h-52 rounded-full border-2 border-slate-300 border-dashed opacity-60" />
            </div>

            {/* Orbiting Icons Container */}
            <motion.div 
              className="absolute inset-0 z-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {YOU_TOOLS.map((tool, index) => {
                const angle = (index / YOU_TOOLS.length) * 2 * Math.PI;
                const radius = 104; // Match the 52 w/h orbit track (208px diameter -> 104px radius)
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                const Icon = tool.icon;
                
                return (
                  <motion.div
                    key={tool.name}
                    className="absolute w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center border border-slate-200 cursor-pointer"
                    style={{ 
                      x, y,
                    }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    // Counter-rotate so icons stay upright
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  >
                    <Icon size={18} className={tool.color} />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* "You" Generic Avatar */}
            <motion.div 
              className={`relative z-10 flex flex-col items-center bg-white p-2 rounded-full border ${hoveredNode === 'you' ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-105' : 'border-blue-200 shadow-lg'} transition-all duration-300 w-20 h-20 justify-center`}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 overflow-hidden shadow-inner relative">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                 </svg>
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full flex items-center justify-center">
                <span className="absolute w-full h-full bg-emerald-400 rounded-full animate-ping opacity-75"></span>
              </span>
              <p className="absolute -bottom-6 text-sm text-slate-600 font-bold">You</p>
            </motion.div>
          </div>
        </div>

        {/* Connection: You -> CEO */}
        <div className="h-16 w-full relative flex justify-center mt-2">
          <svg className="absolute w-2 h-full overflow-visible">
             <line 
               x1="50%" y1="0" x2="50%" y2="100%" 
               stroke={hoveredNode === 'you' || hoveredNode === 'ceo' ? '#06b6d4' : '#cbd5e1'} 
               strokeWidth="2" 
               strokeDasharray="4 4" 
               className="transition-colors duration-300 animate-dash"
             />
          </svg>
        </div>

        {/* =========================================================
            LEVEL 2: CEO 
            ========================================================= */}
        <motion.div 
          onClick={() => window.location.href = '/chat/ceo'}
          className={`relative z-10 flex flex-col items-center bg-white p-3 px-6 rounded-2xl border cursor-pointer ${hoveredNode === 'ceo' ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-105' : 'border-slate-200 shadow-md'} transition-all duration-300 mb-4`}
          onMouseEnter={() => setHoveredNode('ceo')}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <div className="relative">
            <img src="https://i.pravatar.cc/150?img=68" alt="Rohan" className="w-20 h-20 rounded-full border-2 border-slate-100 object-cover" />
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full flex items-center justify-center">
              <span className="absolute w-full h-full bg-emerald-400 rounded-full animate-ping opacity-75"></span>
            </span>
          </div>
          <h2 className="font-bold text-slate-800 text-lg mt-2">Rohan</h2>
          <p className="text-xs text-slate-500 font-medium">Chief Executive Officer</p>
        </motion.div>

        {/* Connection 2: CEO to C-Suite (Curved SVG Branches) */}
        <div className="h-24 w-full relative px-20">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1240 96" preserveAspectRatio="none">
            {C_SUITE.map((cSuite, index) => {
              const totalFlex = C_SUITE.reduce((acc, curr) => acc + curr.team.length, 0);
              const previousFlex = C_SUITE.slice(0, index).reduce((acc, curr) => acc + curr.team.length, 0);
              const flexCenter = previousFlex + (cSuite.team.length / 2);
              const endX = (flexCenter / totalFlex) * 1240;
              
              const isHovered = hoveredNode === 'assistant' || hoveredNode === cSuite.id;
              return (
                <path 
                  key={index}
                  d={`M 620 0 C 620 48, ${endX} 48, ${endX} 96`} 
                  fill="none" 
                  stroke={isHovered ? '#06b6d4' : '#cbd5e1'} 
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  vectorEffect="nonScalingStroke"
                  className="transition-colors duration-300 animate-dash"
                />
              );
            })}
          </svg>
        </div>

        {/* =========================================================
            LEVEL 3 & 4: C-SUITE AND SUB-TEAMS
            ========================================================= */}
        <div className="w-full flex justify-between px-8 gap-6 z-10 relative">
          {C_SUITE.map((cSuite) => (
            <div key={cSuite.id} className="flex flex-col items-center" style={{ flex: cSuite.team.length }}>
              
              {/* C-Suite Node */}
              <motion.div 
                onClick={() => window.location.href = `/chat/${cSuite.id}`}
                className={`relative flex flex-col items-center bg-white p-3 rounded-2xl border w-full max-w-[220px] cursor-pointer ${hoveredNode === cSuite.id ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-105' : 'border-slate-200 shadow-md'} transition-all duration-300`}
                onMouseEnter={() => setHoveredNode(cSuite.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="relative">
                  <img src={cSuite.avatar} alt={cSuite.name} className="w-14 h-14 rounded-full border-2 border-slate-100 object-cover" />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full flex items-center justify-center">
                    <span className="absolute w-full h-full bg-emerald-400 rounded-full animate-ping opacity-75"></span>
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm mt-2">{cSuite.name}</h3>
                <p className="text-[10px] text-slate-500 font-medium text-center">{cSuite.title}</p>
              </motion.div>

              {/* Team Hierarchies */}
              {maxDepth >= 3 && (
                <>
                  {/* Connection 3: C-Suite to Team */}
                  <div className="h-16 w-full relative mt-1">
                    {/* Dynamically size viewBox so 1 unit roughly = 1px, preserving 1:1 dot scale */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${1240 * (cSuite.team.length / 14)} 64`} preserveAspectRatio="none">
                      {cSuite.team.map((_, index) => {
                        const colWidth = 1240 * (cSuite.team.length / 14);
                        const endX = (colWidth / cSuite.team.length) * index + (colWidth / cSuite.team.length / 2);
                        return (
                          <path 
                            key={index}
                            d={`M ${colWidth / 2} 0 C ${colWidth / 2} 32, ${endX} 32, ${endX} 64`} 
                            fill="none" 
                            stroke={hoveredNode === cSuite.id || hoveredNode === cSuite.team[index].id ? '#06b6d4' : '#cbd5e1'} 
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                            vectorEffect="nonScalingStroke"
                            className="transition-colors duration-300 animate-dash"
                          />
                        );
                      })}
                    </svg>
                  </div>

                  {/* Team Members Row */}
                  <div className="w-full flex justify-around gap-2 mt-1">
                {cSuite.team.map((member) => (
                  <div key={member.id} className="flex flex-col items-center flex-1">
                    
                    {/* Team Member Node */}
                    <motion.div
                      onClick={() => window.location.href = `/chat/${cSuite.id}/${member.id}`}
                      className={`relative flex flex-col items-center bg-white p-2 rounded-xl border w-full max-w-[120px] cursor-pointer ${hoveredNode === member.id ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-105' : 'border-slate-200 shadow-sm'} transition-all duration-300 z-10`}
                      onMouseEnter={() => setHoveredNode(member.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <div className="relative">
                        <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full border border-slate-200 object-cover" />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-white rounded-full">
                          <span className="absolute w-full h-full bg-emerald-400 rounded-full animate-ping opacity-75"></span>
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-[11px] mt-1 text-center leading-tight truncate w-full px-1">{member.name}</h4>
                      <p className="text-[9px] text-slate-500 font-medium text-center leading-tight mt-0.5 line-clamp-2">{member.title}</p>
                    </motion.div>

                    {/* Connection 4: Member to Tools */}
                    <div className="h-10 w-full relative mt-1">
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 88 40" preserveAspectRatio="none">
                        {member.tools.map((_, i) => {
                           const endX = (88 / member.tools.length) * i + (88 / member.tools.length / 2);
                           const isHovered = hoveredNode === member.id;
                           return (
                             <path 
                               key={i}
                               d={`M 44 0 C 44 20, ${endX} 20, ${endX} 40`} 
                               fill="none" 
                               stroke={isHovered ? '#22d3ee' : '#e2e8f0'} 
                               strokeWidth="1.5"
                               strokeDasharray="4 4"
                               vectorEffect="nonScalingStroke"
                               className="transition-colors duration-300 animate-dash"
                             />
                           );
                        })}
                      </svg>
                    </div>

                    {/* Tool Integrations */}
                    <div className="flex gap-1">
                      {member.tools.map((tool, i) => {
                        const ToolIcon = tool.icon;
                        const isHovered = hoveredNode === member.id;
                        return (
                          <div 
                            key={i} 
                            className={`w-7 h-7 bg-white rounded-md border flex items-center justify-center group relative cursor-pointer ${isHovered ? 'border-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.4)]' : 'border-slate-200'} transition-all`}
                          >
                            <ToolIcon size={12} className={isHovered ? 'text-cyan-500' : 'text-slate-400'} />
                            <div className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-30">
                              {tool.name}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
          ))}
        </div>
      </div>
    </div>
  );
}
