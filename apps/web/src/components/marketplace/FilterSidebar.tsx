import React from 'react';

export function FilterSidebar() {
  return (
    <aside className="w-64 flex-shrink-0">
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Categories</h4>
        <div className="space-y-2">
          {['Customer Support', 'Data Analysis', 'Engineering', 'Marketing', 'Sales'].map((category) => (
            <label key={category} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-3">Pricing Model</h4>
        <div className="space-y-2">
          {['Subscription', 'Pay-per-task', 'Token-based'].map((model) => (
            <label key={model} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              {model}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-3">Integrations</h4>
        <div className="space-y-2">
          {['Shopify', 'Zendesk', 'Salesforce', 'Slack'].map((integration) => (
            <label key={integration} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              {integration}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
