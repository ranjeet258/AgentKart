import React from 'react';
import { Send, Bot, User, MoreVertical, Phone, Video } from 'lucide-react';

export default async function DepartmentDefaultPage({ params }: { params: Promise<{ departmentId: string }> }) {
  // Get department name or fallback
  const resolvedParams = await params;
  const deptName = resolvedParams.departmentId.toUpperCase();

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      {/* Chat Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold border border-slate-200">
              {deptName.charAt(0)}
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h2 className="font-bold text-slate-800 leading-tight">{deptName} Workspace</h2>
            <p className="text-xs text-emerald-600 font-medium">Online • Department Lead</p>
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
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center flex-shrink-0 mt-1">
              <Bot size={16} />
            </div>
            <div className="flex flex-col gap-1 max-w-[80%]">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-slate-700 text-sm">{deptName} Coordinator</span>
                <span className="text-xs text-slate-400">10:00 AM</span>
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-sm border border-slate-200 shadow-sm text-slate-600 text-sm leading-relaxed">
                {resolvedParams.departmentId === 'cfo' 
                  ? "Welcome to the CFO Workspace. I have aggregated the financial reports from the Finance Manager and Analyst. The Q3 budget is ready for your final review and signature."
                  : resolvedParams.departmentId === 'cto'
                  ? (
                    <>
                      Welcome to the CTO Workspace. The Engineering department is running at 99.9% uptime. I can delegate architecture reviews or pull request approvals to your direct reports.
                      <br /><br />
                      <a href="https://multi-mode-chatbot-99vryugpyksg3b9ps3hkj7.streamlit.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                        Click here to talk with agent
                      </a>
                    </>
                  )
                  : resolvedParams.departmentId === 'coo'
                  ? "Welcome to the COO Workspace. Operations and logistics data have been synchronized. I'm ready to escalate any critical bottlenecks to you immediately."
                  : resolvedParams.departmentId === 'cmo'
                  ? "Welcome to the CMO Workspace. Our marketing reach has expanded. I can coordinate the Marketing Manager and Product Designer to launch the new campaign."
                  : `Welcome to the ${deptName} department workspace. I am ready to assist with high-level reporting or task delegation. You can also select a specific direct report from the sidebar to assign them tasks directly.`
                }
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
            placeholder={`Message ${deptName} Coordinator...`} 
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
