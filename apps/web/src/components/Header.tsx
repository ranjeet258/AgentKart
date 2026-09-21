import React from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  BookOpen, 
  Users, 
  Bell, 
  Sun 
} from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full h-14 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="flex justify-between items-center px-4 h-full">
        
        {/* 1. Left Section: Branding */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            {/* Stylized AI/Nodes SVG Icon */}
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:rotate-12 transition-transform duration-300"
            >
              <defs>
                <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="url(#aiGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="2" fill="#06b6d4" />
              <circle cx="2" cy="7" r="1.5" fill="#3b82f6" />
              <circle cx="22" cy="7" r="1.5" fill="#3b82f6" />
            </svg>
            <span className="font-bold text-lg text-slate-800 tracking-tight">
              AgentKart
            </span>
          </Link>
        </div>



        {/* 3. Right Section: Quick Actions & User Profile */}
        <div className="flex items-center gap-2">
          {/* Action Buttons */}
          <button className="p-2 rounded-md hover:bg-slate-100 text-slate-500 transition-colors" title="Documentation">
            <BookOpen size={18} />
          </button>
          
          <button className="p-2 rounded-md hover:bg-slate-100 text-slate-500 transition-colors" title="Members">
            <Users size={18} />
          </button>
          
          <button className="p-2 rounded-md hover:bg-slate-100 text-slate-500 transition-colors relative" title="Notifications">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white">
              1
            </span>
          </button>
          
          <button className="p-2 rounded-md hover:bg-slate-100 text-slate-500 transition-colors mr-2" title="Theme">
            <Sun size={18} />
          </button>

          {/* User Avatar */}
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm shadow-sm hover:ring-2 hover:ring-blue-300 transition-all">
            R
          </button>
        </div>

      </div>
    </header>
  );
}
