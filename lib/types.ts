export type BusinessType = "agency" | "freelancer" | "consultant" | "startup";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ProcessStep {
  order: number;
  action: string;
  owner: string;
  duration?: string;
  output: string;
}

export interface Process {
  id: string;
  name: string;
  owner: string;
  trigger: string;
  steps: ProcessStep[];
  decisionPoints: string[];
}

export interface Skill {
  name: string;
  description: string;
  inputs: string[];
  outputs: string[];
  steps: string[];
}

export interface BrainData {
  meta: {
    id: string;
    userId?: string;
    businessName: string;
    businessType: BusinessType;
    generatedAt: string;
    sessionDuration: number;
  };
  knowledge: {
    operatingModel: string;
    clientProfile: string;
    pricingModel: string;
    teamStructure: string;
    keyMetrics: string[];
  };
  processes: Process[];
  judgment: {
    qualityCriteria: string;
    hardRules: string[];
    scoringFramework: string;
    approvalRequired: string[];
  };
  skills: Skill[];
}

export interface BrainMarkdown {
  knowledge_md: string;
  processes_md: string;
  judgment_md: string;
}

export interface BrainRecord extends BrainData {
  markdown: BrainMarkdown;
}

export interface SessionState {
  id: string;
  userId?: string;
  businessType: BusinessType;
  businessName?: string;
  messages: ChatMessage[];
  questionsAnswered: number;
  extractedData: Partial<BrainData>;
  status: "onboarding" | "coaching" | "generating" | "complete";
  createdAt: string;
}

export interface ChatRoutePayload {
  sessionId: string;
  userMessage: string;
  businessType?: BusinessType;
  businessName?: string;
}
