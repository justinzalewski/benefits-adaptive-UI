/**
 * Fictional plan content shared by the Benefits page and every sub-page, so the
 * landing page and the drill-downs never disagree. No real member data here.
 */

import type { StatusTone } from '../components/primitives';

export type Brand = { name: string; color: string; dot?: boolean };

export const brands: Record<string, Brand> = {
  expressScripts: { name: 'Express Scripts', color: '#002c5f' },
  alight: { name: 'alight.', color: '#14181c' },
  benefitHub: { name: 'BenefitHub', color: '#1b6bc0' },
  cigna: { name: 'cigna', color: '#00629b' },
  empower: { name: 'EMPOWER', color: '#c8102e' },
  foodsmart: { name: 'foodsmart', color: '#2fa84f', dot: true },
  headspace: { name: 'headspace', color: '#f47d31', dot: true },
  healthEquity: { name: 'HealthEquity', color: '#6b2c91' },
  peloton: { name: 'PELOTON', color: '#14181c' },
};

export const idCard = {
  type: 'Pharmacy',
  administrator: 'Express Scripts',
  brand: brands.expressScripts,
  memberId: 'U3877226 01',
  rxBin: '23456',
};

export type ProgramCategory = 'Lifestyle' | 'Mind' | 'Money' | 'Virtual care';

export const programCategories: { id: ProgramCategory; blurb: string; icon: string }[] = [
  { id: 'Lifestyle', blurb: 'Creating healthier habits', icon: 'sun' },
  { id: 'Mind', blurb: 'Mental and emotional wellbeing', icon: 'brain' },
  { id: 'Money', blurb: 'Financial wellness and support', icon: 'wallet' },
  { id: 'Virtual care', blurb: 'Care from home or on the go', icon: 'video' },
];

export type Program = {
  id: string;
  name: string;
  brand: Brand;
  category: ProgramCategory;
  description: string;
  saved?: boolean;
  usedRecently?: boolean;
};

export const programs: Program[] = [
  {
    id: 'headspace',
    name: 'Headspace',
    brand: brands.headspace,
    category: 'Mind',
    description:
      'Headspace is a guided self-care app for everyday mental health support. It helps you sleep better, manage stress, and build lasting healthy habits.',
    saved: true,
    usedRecently: true,
  },
  {
    id: 'peloton',
    name: 'Peloton',
    brand: brands.peloton,
    category: 'Lifestyle',
    description: 'Thousands of classes you can take at home, from strength to stretching.',
    usedRecently: true,
  },
  {
    id: 'alight',
    name: 'Alight',
    brand: brands.alight,
    category: 'Lifestyle',
    description:
      'Access Benefits Self Service to view your benefit elections, costs for coverage or make changes.',
  },
  {
    id: 'benefit-hub',
    name: 'Benefit Hub',
    brand: brands.benefitHub,
    category: 'Money',
    description: 'Member discounts on everyday purchases, travel, and family activities.',
  },
  {
    id: 'cigna',
    name: 'Cigna',
    brand: brands.cigna,
    category: 'Mind',
    description:
      'Get 24/7 support for everyday challenges - counseling, legal & financial support, and home/life referrals.',
  },
  {
    id: 'empower',
    name: 'Empower',
    brand: brands.empower,
    category: 'Money',
    description: 'Review your retirement savings and get help planning your next contribution.',
  },
  {
    id: 'foodsmart',
    name: 'Foodsmart',
    brand: brands.foodsmart,
    category: 'Lifestyle',
    description:
      'Get one-on-one virtual visits with a registered dietitian for personalized nutrition guidance.',
  },
  {
    id: 'health-equity',
    name: 'HealthEquity',
    brand: brands.healthEquity,
    category: 'Money',
    description: 'Manage your health account, submit receipts, and check your reimbursements.',
  },
];

export const helpfulResources = [
  {
    id: 'videos',
    title: 'Videos on demand',
    description: 'Watch tutorials about common benefit topics',
    tint: 'var(--coral)',
  },
  {
    id: 'faq',
    title: 'Frequently asked questions',
    description: 'Find answers to common benefit questions',
    tint: 'var(--lime)',
  },
];

/* ---------- Recent activity ---------- */

export type ActivityStatus = { tone: StatusTone; label: string };

export type ActivityItem = {
  id: string;
  kind: 'claim' | 'prior-auth';
  name: string;
  date: string;
  month: string;
  person: string;
  tint: string;
  edge: string;
  statuses: ActivityStatus[];
  appliedToDeductible?: string;
  appliedToOop?: string;
  paid?: string;
  note?: string;
  action?: { label: string; helper: string };
};

export const activityItems: ActivityItem[] = [
  {
    id: 'azelaic-jun',
    kind: 'claim',
    name: 'Azelaic acid 20%',
    date: '06/18/2026',
    month: 'JUNE 2026',
    person: 'First Name',
    tint: '#f6a623',
    edge: '#12a58a',
    statuses: [{ tone: 'approved', label: 'Approved' }],
    appliedToDeductible: '$10.00',
    appliedToOop: '$0.00',
    paid: '$10.00',
  },
  {
    id: 'celexa-jun',
    kind: 'claim',
    name: 'Celexa 20 mg',
    date: '06/12/2026',
    month: 'JUNE 2026',
    person: 'First Name',
    tint: '#cfe86b',
    edge: '#12a58a',
    statuses: [{ tone: 'approved', label: 'Approved' }],
    appliedToDeductible: '$10.00',
    appliedToOop: '$0.00',
    paid: '$10.00',
  },
  {
    id: 'ubrelvy-pa',
    kind: 'prior-auth',
    name: 'Ubrelvy 50 mg',
    date: '06/21/2026',
    month: 'JUNE 2026',
    person: 'First Name',
    tint: '#f0f2ee',
    edge: '#d92d20',
    statuses: [
      { tone: 'approved', label: 'Request received' },
      { tone: 'pending', label: 'In review' },
      { tone: 'denied', label: 'Denied' },
    ],
    note: "We didn't receive proof from your prescriber that you've completed a faster therapy.",
    action: {
      label: 'Start an appeal',
      helper: 'Your prescriber can send the missing records. Appeals are open for 180 days.',
    },
  },
  {
    id: 'simvastatin-jun',
    kind: 'claim',
    name: 'simvastatin 20 mg',
    date: '06/04/2026',
    month: 'JUNE 2026',
    person: 'First Name',
    tint: '#0e7c66',
    edge: '#12a58a',
    statuses: [{ tone: 'approved', label: 'Approved' }],
    appliedToDeductible: '$10.00',
    appliedToOop: '$0.00',
    paid: '$10.00',
  },
  {
    id: 'zafirlukast-may',
    kind: 'claim',
    name: 'Zafirlukast 10 mg',
    date: '05/22/2026',
    month: 'MAY 2026',
    person: 'First Name',
    tint: '#f27a6b',
    edge: '#12a58a',
    statuses: [{ tone: 'approved', label: 'Approved' }],
    appliedToDeductible: '$10.00',
    appliedToOop: '$0.00',
    paid: '$10.00',
  },
  {
    id: 'simvastatin-may',
    kind: 'claim',
    name: 'simvastatin 20 mg',
    date: '05/09/2026',
    month: 'MAY 2026',
    person: 'First Name',
    tint: '#0e7c66',
    edge: '#12a58a',
    statuses: [{ tone: 'approved', label: 'Approved' }],
    appliedToDeductible: '$10.00',
    appliedToOop: '$0.00',
    paid: '$10.00',
  },
  {
    id: 'cyltezo-apr',
    kind: 'claim',
    name: 'Cyltezo(Cf) 40 mg/0.8 ml',
    date: '04/23/2026',
    month: 'APRIL 2026',
    person: 'First Name',
    tint: '#d9e7f5',
    edge: '#12a58a',
    statuses: [{ tone: 'approved', label: 'Approved' }],
    appliedToDeductible: '$10.00',
    appliedToOop: '$0.00',
    paid: '$10.00',
  },
  {
    id: 'azelaic-apr',
    kind: 'claim',
    name: 'Azelaic acid 20%',
    date: '04/08/2026',
    month: 'APRIL 2026',
    person: 'First Name',
    tint: '#f6a623',
    edge: '#12a58a',
    statuses: [{ tone: 'approved', label: 'Approved' }],
    appliedToDeductible: '$10.00',
    appliedToOop: '$0.00',
    paid: '$10.00',
  },
];

/* ---------- How your plan works ---------- */

export const planStages = [
  {
    id: 'deductible',
    stage: 'STAGE 1',
    title: 'Deductible',
    description:
      'Your deductible is the amount you pay for covered prescriptions before your plan starts sharing the cost.',
    current: true,
  },
  {
    id: 'copayment',
    stage: 'STAGE 2',
    title: 'Copayment',
    description:
      'Once you meet your deductible, you pay a set amount or share of the cost and your plan pays the rest.',
    current: false,
  },
  {
    id: 'oop',
    stage: 'STAGE 3',
    title: 'Out-of-pocket maximum',
    description:
      'After you reach this limit, your plan pays 100% of covered prescriptions for the rest of the plan year.',
    current: false,
  },
];

export const planPrograms = [
  {
    id: 'maintenance',
    title: 'Fill your long-term medications at maintenance pharmacies',
    description:
      'Your plan requires many long-term medications to be filled at participating maintenance pharmacies in your network.',
    bullets: [
      'Conveniently fill 90-day supplies',
      'Easily check costs at nearby pharmacies and change refill dates',
    ],
    linkLabel: 'View program details',
  },
  {
    id: 'network',
    title: 'Choose CVS or Walgreens to include in your network',
    description:
      'Your plan lets you add either CVS or Walgreens to your personal pharmacy network. You can change your choice once each plan year, and your other network pharmacies stay the same either way.',
    bullets: [],
    linkLabel: 'View your network',
  },
];

export const pharmacyOptions = [
  {
    id: 'retail',
    title: 'Retail',
    description: 'Pick up prescriptions from a retail pharmacy',
    recommended: false,
  },
  {
    id: 'home-delivery',
    title: 'Home delivery',
    description: 'Get up to a 90-day supply shipped to your door',
    recommended: true,
  },
  {
    id: 'specialty',
    title: 'Specialty',
    description: 'Extra support for complex conditions',
    recommended: false,
  },
  {
    id: 'compare',
    title: 'Compare costs',
    description: 'See prices side by side before you fill',
    recommended: false,
  },
];

export type IncludedPanel = {
  id: string;
  title: string;
  lede: string;
  sections?: { heading: string; body: string }[];
  bullets?: string[];
  callout?: { heading: string; body: string; linkLabel: string };
  button?: string;
  linkLabel?: string;
};

export const includedWithBenefits: IncludedPanel[] = [
  {
    id: 'discounts',
    title: 'Discounts and savings',
    lede: 'Automatic discounts and savings with your plan',
    sections: [
      {
        heading: 'Discount and price transparency',
        body: 'We show you what your costs will be next to the pharmacy near you, so you can compare before you fill.',
      },
      {
        heading: 'Negotiated discounts',
        body: 'We work with your pharmacy network to lock in lower rates. Discounts are applied before you see your price, so nothing extra is required from you.',
      },
    ],
    callout: {
      heading: 'Why am I seeing this?',
      body: 'Because these savings are already built into your plan, they show up in the price you see rather than as a separate credit.',
      linkLabel: 'See discounts',
    },
  },
  {
    id: 'pharmacist',
    title: 'Access to 24/7 pharmacist',
    lede: 'Call our team at any time to talk to one of our licensed pharmacists. They can answer questions about your prescriptions, side effects, or how to best stay on track with your medication.',
    sections: [],
    button: 'Call pharmacist',
  },
  {
    id: 'resources',
    title: 'Helpful resources',
    lede: 'Have questions? We are here to help with tools, answers, and resources.',
    bullets: [
      'Find answers to our most frequently asked questions (FAQs)',
      'Get clear definitions for common benefit terms',
      'Chat with our in-app ideas for real-time responses',
      'Watch short videos about pharmacy benefits and costs',
    ],
    linkLabel: 'Visit resource center',
  },
];
