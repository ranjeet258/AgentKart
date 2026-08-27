import React from 'react';
import Link from 'next/link';

interface OrgNode {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
  children?: OrgNode[];
}

const workforceData: OrgNode = {
  id: 'ceo-1',
  name: 'Aarav (CEO)',
  role: 'Strategic Planner',
  avatarColor: 'bg-indigo-600',
  children: [
    {
      id: 'cto-1',
      name: 'Rohan (CTO)',
      role: 'Architecture',
      avatarColor: 'bg-blue-600',
      children: [
        {
          id: 'dev-1',
          name: 'Aditi',
          role: 'Frontend Dev',
          avatarColor: 'bg-cyan-500',
        },
        {
          id: 'dev-2',
          name: 'Karan',
          role: 'Backend Dev',
          avatarColor: 'bg-sky-500',
        }
      ]
    },
    {
      id: 'cmo-1',
      name: 'Priya (CMO)',
      role: 'Marketing Lead',
      avatarColor: 'bg-rose-600',
      children: [
        {
          id: 'mkt-1',
          name: 'Neha',
          role: 'Content Writer',
          avatarColor: 'bg-pink-500',
        },
        {
          id: 'mkt-2',
          name: 'Rahul',
          role: 'SEO Specialist',
          avatarColor: 'bg-fuchsia-500',
        }
      ]
    }
  ]
};

function OrgNodeCard({ node }: { node: OrgNode }) {
  return (
    <div className="flex flex-col items-center">
      <Link href={`/agents/${node.id}`} className="relative z-10 bg-white/70 backdrop-blur-lg border border-gray-100 rounded-2xl p-3 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 w-32 md:w-36 text-center cursor-pointer hover:border-blue-300 group hover:-translate-y-1">
        <div className={`w-10 h-10 mx-auto rounded-full text-white flex items-center justify-center font-bold text-lg mb-2 shadow-inner ${node.avatarColor} group-hover:scale-110 transition-transform duration-300`}>
          {node.name.charAt(0)}
        </div>
        <h3 className="font-bold text-gray-800 text-xs group-hover:text-blue-600 transition-colors">{node.name}</h3>
        <p className="text-[10px] text-gray-500 mt-1 leading-tight">{node.role}</p>
      </Link>
      
      {node.children && node.children.length > 0 && (
        <>
          {/* Vertical line down from parent */}
          <div className="w-px h-6 bg-gradient-to-b from-gray-200 to-gray-300"></div>
          
          {/* Horizontal connecting line container */}
          <div className="relative flex justify-center w-full">
            {/* The horizontal line that spans the children */}
            <div className="absolute top-0 h-px bg-gray-300" style={{ width: 'calc(100% - 8rem)' }}></div>
            
            <div className="flex gap-4 md:gap-8 pt-6 relative">
              {node.children.map((child, index) => (
                <div key={child.id} className="relative">
                  {/* Vertical line up from child */}
                  <div className="absolute -top-6 left-1/2 w-px h-6 bg-gradient-to-t from-gray-200 to-gray-300 -translate-x-1/2"></div>
                  <OrgNodeCard node={child} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function OrgChart() {
  return (
    <div className="w-full flex justify-center items-start py-8 relative min-h-[300px]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-b-2xl pointer-events-none"></div>
      
      {/* Container with zoom/scale to fit */}
      <div className="origin-top scale-75 sm:scale-90 transition-transform duration-300">
        <OrgNodeCard node={workforceData} />
      </div>
    </div>
  );
}
