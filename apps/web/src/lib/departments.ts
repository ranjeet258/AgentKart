export const DEPARTMENTS = {
  ceo: {
    name: 'Chief Executive Officer',
    agents: [
      { id: 'rohan', name: 'Rohan', title: 'CEO', avatar: 'https://i.pravatar.cc/150?img=68', status: 'online' }
    ]
  },
  assistant: {
    name: 'Personal Assistant',
    agents: [
      { id: 'anjali', name: 'Anjali', title: 'Assistant', avatar: 'https://i.pravatar.cc/150?img=32', status: 'online' }
    ]
  },
  coo: {
    name: 'Operations (COO)',
    agents: [
      { id: 'ops', name: 'Arjun', title: 'Operations Manager', avatar: 'https://i.pravatar.cc/150?img=11', status: 'online', isStarred: true },
      { id: 'logistics', name: 'Karan', title: 'Logistics Manager', avatar: 'https://i.pravatar.cc/150?img=12', status: 'online' },
      { id: 'support', name: 'Priya', title: 'Support Specialist', avatar: 'https://i.pravatar.cc/150?img=5', status: 'offline' }
    ]
  },
  cto: {
    name: 'Engineering (CTO)',
    agents: [
      { id: 'vp_eng', name: 'Ravi', title: 'VP of Engineering', avatar: 'https://i.pravatar.cc/150?img=13', status: 'online', isStarred: true },
      { id: 'eng_mgr', name: 'Aditya', title: 'Engineering Manager', avatar: 'https://i.pravatar.cc/150?img=14', status: 'online' },
      { id: 'swe', name: 'Neha', title: 'Software Engineer', avatar: 'https://i.pravatar.cc/150?img=9', status: 'online' },
      { id: 'data_eng', name: 'Kavya', title: 'Data Engineer', avatar: 'https://i.pravatar.cc/150?img=10', status: 'offline' },
      { id: 'ml_ai', name: 'Riya', title: 'ML/AI Engineer', avatar: 'https://i.pravatar.cc/150?img=20', status: 'online' }
    ]
  },
  cfo: {
    name: 'Finance (CFO)',
    agents: [
      { id: 'fin_mgr', name: 'Sneha', title: 'Finance Manager', avatar: 'https://i.pravatar.cc/150?img=32', status: 'online', isStarred: true },
      { id: 'fin_ana', name: 'Vikram', title: 'Financial Analyst', avatar: 'https://i.pravatar.cc/150?img=33', status: 'online' },
      { id: 'accountant', name: 'Pooja', title: 'Accountant', avatar: 'https://i.pravatar.cc/150?img=35', status: 'offline' }
    ]
  },
  cmo: {
    name: 'Marketing (CMO)',
    agents: [
      { id: 'prod_des', name: 'Aisha', title: 'Product Designer', avatar: 'https://i.pravatar.cc/150?img=60', status: 'online', isStarred: true },
      { id: 'mktg_mgr', name: 'Ananya', title: 'Marketing Manager', avatar: 'https://i.pravatar.cc/150?img=40', status: 'online' },
      { id: 'sales_rep', name: 'Dev', title: 'Sales Rep', avatar: 'https://i.pravatar.cc/150?img=68', status: 'offline' }
    ]
  }
};
