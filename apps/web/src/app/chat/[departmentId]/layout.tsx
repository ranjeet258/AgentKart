import React from 'react';
import Link from 'next/link';
import { Search, Building2, Users, Star, Plus } from 'lucide-react';
import { DEPARTMENTS } from '@/lib/departments';

export default async function ChatLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ departmentId: string }>;
}) {
  const resolvedParams = await params;
  const deptId = resolvedParams.departmentId as keyof typeof DEPARTMENTS;
  const department = DEPARTMENTS[deptId] || DEPARTMENTS['coo']; // Fallback
  
  return (
    <div className="flex h-[calc(100vh-56px)] bg-white overflow-hidden">
      {/* Sidebar (Light Theme) */}
      <div className="w-80 bg-slate-50 text-slate-700 flex flex-col flex-shrink-0 border-r border-slate-200">
        
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-200">
          <div className="bg-white border border-slate-200 rounded-md flex items-center px-3 py-2 text-sm">
            <Search size={16} className="text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none flex-1 text-slate-800 placeholder-slate-400"
            />
            <div className="flex items-center gap-1 text-slate-400 text-xs font-mono ml-2">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">⌘</span>
              <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">K</span>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-2">
          
          {/* Top Level Item */}
          <div className="px-4 py-2 flex items-center gap-3 text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors">
            <div className="w-4 flex justify-center"><Building2 size={18} className="text-slate-400" /></div>
            <span className="text-sm font-medium">{department.name}</span>
          </div>
          
          {/* Sub Level Item (Agents Group) */}
          <div className="px-4 py-2 flex items-center gap-3 text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors mt-2">
            <div className="w-4 flex justify-center"><Users size={18} className="text-slate-400" /></div>
            <span className="text-sm font-medium">Direct Reports</span>
          </div>

          {/* Agents List */}
          <div className="mt-1 flex flex-col">
            {department.agents.map((agent) => (
              <Link 
                href={`/chat/${deptId}/${agent.id}`} 
                key={agent.id}
                className="pl-12 pr-4 py-2 flex items-center gap-3 hover:bg-slate-100 cursor-pointer transition-colors group relative"
              >
                {/* Radio ring indicator on left */}
                <div className="absolute left-6 w-2 h-2 rounded-full border-2 border-slate-300 group-hover:border-slate-400 transition-colors"></div>
                
                {/* Avatar with Status */}
                <div className="relative">
                  <img src={agent.avatar} alt={agent.name} className="w-8 h-8 rounded-full object-cover" />
                  {agent.status === 'online' && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-800 truncate">{agent.name}</span>
                    {agent.isStarred && <Star size={14} className="text-yellow-500 fill-yellow-500 ml-2" />}
                  </div>
                  <span className="text-[11px] text-slate-500 truncate">{agent.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Add Agent Button */}
        <div className="p-4 mt-auto border-t border-slate-200">
          <button className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors w-full p-2 hover:bg-slate-100 rounded-md">
            <Plus size={16} />
            Add New Agent
          </button>
        </div>
      </div>

      {/* Main Content Area (White Theme) */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {children}
      </div>
    </div>
  );
}
