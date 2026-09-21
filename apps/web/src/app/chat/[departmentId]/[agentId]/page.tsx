import React from 'react';
import { Send, Bot, User, MoreVertical, Phone, Video } from 'lucide-react';
import { DEPARTMENTS } from '@/lib/departments';

export default async function AgentChatPage({ params }: { params: Promise<{ departmentId: string, agentId: string }> }) {
  const resolvedParams = await params;
  
  // Look up agent details from DEPARTMENTS dictionary
  const deptId = resolvedParams.departmentId as keyof typeof DEPARTMENTS;
  const department = DEPARTMENTS[deptId] || DEPARTMENTS['coo'];
  const agentData = department.agents.find(a => a.id === resolvedParams.agentId);
  
  // Fallbacks if not found
  const agentName = agentData?.name || resolvedParams.agentId.charAt(0).toUpperCase() + resolvedParams.agentId.slice(1).replace('_', ' ');
  const agentTitle = agentData?.title || 'AI Agent';
  const agentAvatar = agentData?.avatar || null;
  const deptName = resolvedParams.departmentId.toUpperCase();

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      {/* Chat Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            {agentAvatar ? (
              <img src={agentAvatar} alt={agentName} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
            ) : (
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold border border-slate-200">
                {agentName.charAt(0)}
              </div>
            )}
            <span className={`absolute bottom-0 right-0 w-3 h-3 ${agentData?.status === 'offline' ? 'bg-slate-400' : 'bg-emerald-500'} border-2 border-white rounded-full`}></span>
          </div>
          <div>
            <h2 className="font-bold text-slate-800 leading-tight">{agentName}</h2>
            <p className="text-xs text-slate-500 font-medium">
              {agentData?.status === 'offline' ? 'Offline' : <span className="text-emerald-600">Online</span>} • {agentTitle}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-slate-400">
          <button className="hover:text-slate-600 transition-colors"><Phone size={20} /></button>
          <button className="hover:text-slate-600 transition-colors"><Video size={20} /></button>
          <button className="hover:text-slate-600 transition-colors ml-2"><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          {/* Agent Message */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
              <Bot size={16} />
            </div>
            <div className="flex flex-col gap-1 max-w-[80%]">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-slate-700 text-sm">{agentName}</span>
                <span className="text-xs text-slate-400">10:42 AM</span>
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-sm border border-slate-200 shadow-sm text-slate-600 text-sm leading-relaxed">
                {resolvedParams.departmentId === 'cfo' 
                  ? (
                    <>
                      I've finished reconciling the {agentName} accounts for this month. Cash flow is positive and we're under budget by 4%. Do you need the updated ledgers?
                      {resolvedParams.agentId === 'fin_ana' && (
                        <>
                          <br /><br />
                          <a href="https://multi-mode-chatbot-99vryugpyksg3b9ps3hkj7.streamlit.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                            Click here to talk with agent
                          </a>
                        </>
                      )}
                    </>
                  )
                  : resolvedParams.departmentId === 'cto'
                  ? (
                    <>
                      System metrics are stable. As your {agentName}, I'm currently reviewing the latest PRs and optimizing the database queries. Any priority shifts?
                      <br /><br />
                      <a href="https://multi-mode-chatbot-99vryugpyksg3b9ps3hkj7.streamlit.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                        Click here to talk with agent
                      </a>
                    </>
                  )
                  : resolvedParams.departmentId === 'cmo'
                  ? `The latest ad campaigns are live! Engagement is up 22% since yesterday. I can pull the detailed analytics whenever you're ready.`
                  : resolvedParams.departmentId === 'coo'
                  ? `Supply chain and daily operations are running smoothly. I've flagged two minor logistics bottlenecks for your review.`
                  : `Hello! I am monitoring the ${deptName} operations. As your ${agentName}, I am ready for your instructions.`
                }
              </div>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-4 flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center flex-shrink-0 mt-1">
              <User size={16} />
            </div>
            <div className="flex flex-col gap-1 max-w-[80%] items-end">
              <div className="flex items-baseline gap-2 flex-row-reverse">
                <span className="font-semibold text-slate-700 text-sm">You</span>
                <span className="text-xs text-slate-400">10:45 AM</span>
              </div>
              <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-sm shadow-sm text-sm leading-relaxed">
                {resolvedParams.departmentId === 'cfo' 
                  ? `Yes, please compile the ledgers and draft the Q3 financial summary.`
                  : resolvedParams.departmentId === 'cto'
                  ? `Good. Please prioritize the user authentication migration today.`
                  : resolvedParams.departmentId === 'cmo'
                  ? `Great job. Let's double down on the social channels that are performing best.`
                  : resolvedParams.departmentId === 'coo'
                  ? `Send over the logistics report. Let's fix those bottlenecks ASAP.`
                  : `Please generate a quick summary report of your active tasks.`
                }
              </div>
            </div>
          </div>
          
          {/* Agent Typing Indicator */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
              <Bot size={16} />
            </div>
            <div className="flex flex-col gap-1">
              <div className="bg-white p-3 px-4 rounded-2xl rounded-tl-sm border border-slate-200 shadow-sm flex items-center gap-1.5 h-[46px]">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto relative flex items-center">
          <input 
            type="text" 
            placeholder={`Message ${agentName}...`} 
            className="w-full bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-full py-3 pl-4 pr-12 text-sm transition-all outline-none"
          />
          <button className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors">
            <Send size={16} className="-ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
