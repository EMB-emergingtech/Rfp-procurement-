import { Project, Activity, VendorSubmission, BoQItem, CommercialTerm, TechnicalScore } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Al Wasl Pipeline Extension',
    rfqRef: 'RFQ-2025-041',
    status: 'Analysis Complete',
    deadline: '15 Mar 2025',
    vendors: 4,
    submissions: 3,
    progress: 100,
  },
  {
    id: 'p2',
    name: 'Dubai South Substation Upgrade',
    rfqRef: 'RFQ-2025-038',
    status: 'Awaiting Submissions',
    deadline: '22 Mar 2025',
    vendors: 5,
    submissions: 2,
    progress: 40,
  },
  {
    id: 'p3',
    name: 'Sharjah Logistics Hub — Civil Works',
    rfqRef: 'RFQ-2025-035',
    status: 'Clarifications Pending',
    deadline: '18 Mar 2025',
    vendors: 6,
    submissions: 5,
    progress: 65,
  },
  {
    id: 'p4',
    name: 'Abu Dhabi Water Treatment Plant',
    rfqRef: 'RFQ-2025-044',
    status: 'Draft',
    deadline: 'Not set',
    vendors: 0,
    submissions: 0,
    progress: 0,
  },
  {
    id: 'p5',
    name: 'Ras Al Khaimah Road Infrastructure',
    rfqRef: 'RFQ-2025-029',
    status: 'Awarded',
    deadline: '01 Feb 2025',
    vendors: 5,
    submissions: 5,
    progress: 100,
    awardedTo: 'Al Faris Contracting',
  },
  {
    id: 'p6',
    name: 'Fujairah Desalination Plant — Phase 2',
    rfqRef: 'RFQ-2025-022',
    status: 'Awarded',
    deadline: '15 Jan 2025',
    vendors: 4,
    submissions: 4,
    progress: 100,
    awardedTo: 'Gulf Tech Solutions',
  },
];

export const ACTIVITIES: Activity[] = [
  { id: '1', timestamp: '10 Mar 09:14', message: 'Al Faris Contracting submitted bid', projectId: 'p1' },
  { id: '2', timestamp: '10 Mar 09:15', message: 'Acknowledgement email dispatched', projectId: 'p1' },
  { id: '3', timestamp: '10 Mar 09:20', message: 'LLM analysis started', projectId: 'p1' },
  { id: '4', timestamp: '10 Mar 10:45', message: 'Analysis complete — report ready', projectId: 'p1' },
  { id: '5', timestamp: '11 Mar 14:32', message: 'Gulf Tech incomplete submission flagged', projectId: 'p1' },
  { id: '6', timestamp: '11 Mar 14:33', message: 'Clarification request sent to Gulf Tech', projectId: 'p1' },
  { id: '7', timestamp: '16 Mar 08:00', message: 'Nasser Engineering late submission received', projectId: 'p1' },
  { id: '8', timestamp: '16 Mar 08:05', message: 'Quarantine alert sent to procurement team', projectId: 'p1' },
];

export const VENDOR_SUBMISSIONS: VendorSubmission[] = [
  {
    id: 'v1',
    name: 'Al Faris Contracting',
    status: 'Received',
    submittedAt: '10 Mar 09:14',
    docsCount: 4,
    alignmentScore: 94,
    clarifications: 1,
    clarificationStatus: 'Resolved',
  },
  {
    id: 'v2',
    name: 'Gulf Tech Solutions',
    status: 'Incomplete',
    submittedAt: '11 Mar 14:32',
    docsCount: 2,
    alignmentScore: 61,
    clarifications: 2,
    clarificationStatus: 'Open',
  },
  {
    id: 'v3',
    name: 'Arabian Industrial Co',
    status: 'Received',
    submittedAt: '09 Mar 17:45',
    docsCount: 4,
    alignmentScore: 88,
    clarifications: 0,
  },
  {
    id: 'v4',
    name: 'Nasser Engineering',
    status: 'Late',
    submittedAt: '16 Mar 08:00',
    docsCount: 3,
    alignmentScore: 72,
    clarifications: 1,
    clarificationStatus: 'Open',
  },
];

export const BOQ_ITEMS: BoQItem[] = [
  {
    id: '1',
    description: 'Pipeline Supply (12km)',
    unit: 'm',
    qty: 12000,
    estimateRate: 180,
    vendors: {
      v1: 185,
      v2: 162,
      v3: 210,
    },
  },
  {
    id: '2',
    description: 'Civil Works',
    unit: 'LS',
    qty: 1,
    estimateRate: 800000,
    vendors: {
      v1: 820000,
      v2: 790000,
      v3: 950000,
    },
  },
  {
    id: '3',
    description: 'Mechanical Install',
    unit: 'LS',
    qty: 1,
    estimateRate: 630000,
    vendors: {
      v1: 650000,
      v2: 580000,
      v3: 720000,
    },
  },
  {
    id: '4',
    description: 'Electrical Works',
    unit: 'LS',
    qty: 1,
    estimateRate: 300000,
    vendors: {
      v1: 310000,
      v2: 295000,
      v3: 340000,
    },
  },
  {
    id: '5',
    description: 'Testing and Commissioning',
    unit: 'LS',
    qty: 1,
    estimateRate: 175000,
    vendors: {
      v1: 180000,
      v2: 165000,
      v3: 195000,
    },
  },
];

export const COMMERCIAL_TERMS: CommercialTerm[] = [
  {
    id: '1',
    term: 'Advance Payment',
    requirement: '20% max',
    vendors: {
      v1: { value: '30% requested', severity: 'Minor' },
      v2: { value: '20%', severity: 'Compliant' },
      v3: { value: '20%', severity: 'Compliant' },
    },
  },
  {
    id: '2',
    term: 'Retention',
    requirement: '10%',
    vendors: {
      v1: { value: '10%', severity: 'Compliant' },
      v2: { value: '5% requested', severity: 'Critical' },
      v3: { value: '10%', severity: 'Compliant' },
    },
  },
  {
    id: '3',
    term: 'Bid Validity',
    requirement: '90 days',
    vendors: {
      v1: { value: '90 days', severity: 'Compliant' },
      v2: { value: '60 days', severity: 'Critical' },
      v3: { value: '90 days', severity: 'Compliant' },
    },
  },
  {
    id: '4',
    term: 'Warranty',
    requirement: '24 months',
    vendors: {
      v1: { value: '24 months', severity: 'Compliant' },
      v2: { value: '24 months', severity: 'Compliant' },
      v3: { value: '12 months', severity: 'Minor' },
    },
  },
  {
    id: '5',
    term: 'LD Rate',
    requirement: '0.5%/week',
    vendors: {
      v1: { value: '0.5%', severity: 'Compliant' },
      v2: { value: '0.25% requested', severity: 'Minor' },
      v3: { value: '0.5%', severity: 'Compliant' },
    },
  },
];

export const TECHNICAL_SCORES: TechnicalScore[] = [
  {
    vendorId: 'v1',
    overall: 91,
    mandatory: { met: 10, total: 10 },
    preferred: { met: 7, total: 9 },
    deviations: [
      { label: 'ASME B16.5', detail: 'Specified: BS 10 | Vendor Proposed: ASME B16.5 | Status: Acceptable Substitution — Engineer Review Required' }
    ]
  },
  {
    vendorId: 'v2',
    overall: 73,
    mandatory: { met: 8, total: 10 },
    preferred: { met: 5, total: 9 },
    deviations: []
  },
  {
    vendorId: 'v3',
    overall: 86,
    mandatory: { met: 9, total: 10 },
    preferred: { met: 7, total: 9 },
    deviations: []
  }
];
