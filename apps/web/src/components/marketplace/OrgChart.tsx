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
    },
    {
      id: 'coo-1',
      name: 'Vikram (COO)',
      role: 'Operations Lead',
      avatarColor: 'bg-emerald-600',
      children: [
        {
          id: 'ops-1',
          name: 'Ananya',
          role: 'Data Analyst',
          avatarColor: 'bg-teal-500',
        }
      ]
    }
  ]
};

function OrgNodeCard({ node }: { node: OrgNode }) {
  return (
    <div className="flex flex-col items-center">
      <Link href={`/agents/${node.id}`} className="relative z-10 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition w-48 text-center cursor-pointer hover:border-blue-400 group">
        <div className={`w-12 h-12 mx-auto rounded-full text-white flex items-center justify-center font-bold text-xl mb-3 shadow-inner ${node.avatarColor}`}>
          {node.name.charAt(0)}
        </div>
        <h3 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition">{node.name}</h3>
        <p className="text-xs text-gray-500 mt-1">{node.role}</p>
      </Link>
      
      {node.children && node.children.length > 0 && (
        <>
          {/* Vertical line down from parent */}
          <div className="w-px h-8 bg-gray-300"></div>
          
          {/* Horizontal connecting line container */}
          <div className="relative flex justify-center w-full">
            {/* The horizontal line that spans the children */}
            <div className="absolute top-0 h-px bg-gray-300" style={{ width: 'calc(100% - 12rem)' }}></div>
            
            <div className="flex gap-12 pt-8 relative">
              {node.children.map((child, index) => (
                <div key={child.id} className="relative">
                  {/* Vertical line up from child */}
                  <div className="absolute -top-8 left-1/2 w-px h-8 bg-gray-300 -translate-x-1/2"></div>
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
    <div className="w-full overflow-x-auto py-12 flex justify-center">
      <div className="min-w-max pb-8">
        <OrgNodeCard node={workforceData} />
      </div>
    </div>
  );
}
