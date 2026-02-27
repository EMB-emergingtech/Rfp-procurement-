export type ProjectStatus = 'Analysis Complete' | 'Awaiting Submissions' | 'Clarifications Pending' | 'Draft' | 'Awarded';

export interface Project {
  id: string;
  name: string;
  rfqRef: string;
  status: ProjectStatus;
  deadline: string;
  vendors: number;
  submissions: number;
  progress: number;
  value?: string;
  awardedTo?: string;
}

export interface Activity {
  id: string;
  timestamp: string;
  message: string;
  projectId: string;
}

export interface VendorSubmission {
  id: string;
  name: string;
  status: 'Received' | 'Incomplete' | 'Late';
  submittedAt: string;
  docsCount: number;
  alignmentScore: number;
  clarifications: number;
  clarificationStatus?: 'Resolved' | 'Open';
}

export interface BoQItem {
  id: string;
  description: string;
  unit: string;
  qty: number;
  estimateRate: number;
  vendors: {
    [vendorId: string]: number;
  };
}

export interface CommercialTerm {
  id: string;
  term: string;
  requirement: string;
  vendors: {
    [vendorId: string]: {
      value: string;
      severity: 'Compliant' | 'Minor' | 'Critical';
    };
  };
}

export interface TechnicalScore {
  vendorId: string;
  overall: number;
  mandatory: { met: number; total: number };
  preferred: { met: number; total: number };
  deviations: { label: string; detail: string }[];
}
