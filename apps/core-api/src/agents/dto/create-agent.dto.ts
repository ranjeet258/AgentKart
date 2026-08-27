export class CreateAgentDto {
  name: string;
  description: string;
  category: string;
  providerOrgId: string;
  // Initial version info
  version: string;
  runtimeSpec: Record<string, any>;
  skillSpec: Record<string, any>;
  pricingRef: string;
}
