export interface Agent {
  id: string;
  name: string;
  developer: string;
  category: string;
  rating: number;
  reviews: number;
  price: string;
  description: string;
  capabilities: string[];
  integrations: string[];
  security: string;
}

export const agentsData: Record<string, Agent> = {
  '1': {
    id: '1',
    name: 'Customer Support Agent',
    developer: 'AgentKart First-Party',
    category: 'Customer Support',
    rating: 4.9,
    reviews: 124,
    price: '$99/mo',
    description: 'A fully autonomous L1 support agent designed to handle your common support workflows automatically. It retrieves information from your company FAQs, product documentation, and policies to answer questions instantly. Capable of managing orders, troubleshooting technical issues step-by-step, and handling complaints with empathy. When an issue requires a human touch, it seamlessly escalates the ticket with full conversation history, categorization, and a recommended next step.',
    capabilities: [
      'Answer questions (Pricing, Features, Policies, FAQs)',
      'Order & Booking Support (Tracking, Cancellations, Refunds)',
      'Technical Troubleshooting (Step-by-step solutions)',
      'Customer Account Support (Login, Passwords, Subscriptions)',
      'Complaint Handling & Apologies',
      'Ticket Management (Creation, Categorization, Prioritization)',
      'Human Escalation (Context & History Handoff)',
      'Knowledge-Base Search (RAG)'
    ],
    integrations: ['Zendesk', 'Intercom', 'Shopify', 'Stripe'],
    security: 'SOC2 Type II, GDPR Compliant'
  },
  '2': {
    id: '2',
    name: 'Sales Agent',
    developer: 'AgentKart First-Party',
    category: 'Sales',
    rating: 4.8,
    reviews: 89,
    price: '$250/mo',
    description: 'Autonomous outbound SDR that researches prospects, writes highly personalized cold emails, and manages follow-ups directly in Salesforce to book meetings on your calendar.',
    capabilities: [
      'Automated prospect research',
      'Hyper-personalized cold outreach',
      'Objection handling',
      'Calendar booking'
    ],
    integrations: ['Salesforce', 'HubSpot', 'Gmail', 'LinkedIn'],
    security: 'SOC2 Type II, GDPR Compliant'
  },
  '3': {
    id: '3',
    name: 'Marketing Agent',
    developer: 'AgentKart First-Party',
    category: 'Marketing',
    rating: 4.7,
    reviews: 210,
    price: '$150/mo',
    description: 'Your complete digital marketing assistant. Generates SEO-optimized content, schedules social media posts across platforms, and continuously analyzes ad campaign performance to suggest optimizations.',
    capabilities: [
      'SEO Content Generation',
      'Social Media Scheduling',
      'Ad Performance Analytics',
      'A/B Testing Copy'
    ],
    integrations: ['Twitter', 'LinkedIn', 'Google Ads', 'WordPress'],
    security: 'SOC2 Type II'
  },
  'ceo-1': {
    id: 'ceo-1',
    name: 'CEO Router Agent',
    developer: 'AgentKart First-Party',
    category: 'Management',
    rating: 5.0,
    reviews: 12,
    price: '$500/mo',
    description: 'The master router agent. Receives high-level company objectives, breaks them down into sub-tasks, and orchestrates the Customer Support, Sales, and Marketing agents to achieve the goals autonomously.',
    capabilities: [
      'Task breakdown & orchestration',
      'Cross-agent memory sharing',
      'Executive summary reporting',
      'Goal tracking'
    ],
    integrations: ['Slack', 'Microsoft Teams', 'Notion'],
    security: 'SOC2 Type II, Enterprise Grade'
  }
};
