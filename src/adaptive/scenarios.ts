import type { MemberContext } from './context';

export type ScenarioId =
  | 'steady'
  | 'first-time'
  | 'recent-claims'
  | 'prior-auth'
  | 'near-deductible';

export type Scenario = {
  id: ScenarioId;
  name: string;
  summary: string;
  /** Short signal chips shown in the "What changed and why" panel. */
  signals: string[];
  context: MemberContext;
};

const baseContext: MemberContext = {
  firstName: 'Jamie',
  tenureDays: 420,
  recentClaimCount: 1,
  visibleActivityIds: ['azelaic-apr'],
  priorAuth: null,
  hasFilledPrescription: true,
  savedProgramIds: ['headspace'],
  individual: {
    deductible: { applied: 500, limit: 1500 },
    outOfPocket: { applied: 287, limit: 3000 },
  },
  family: {
    deductible: { applied: 400, limit: 3000 },
    outOfPocket: { applied: 3500, limit: 7000 },
  },
};

export const scenarios: Scenario[] = [
  {
    id: 'steady',
    name: 'Steady state',
    summary:
      'Nothing needs attention. This is the Benefits page as it works today, for comparison.',
    signals: ['Nothing needs attention', '1 claim in 90 days', 'Deductible 33% applied'],
    context: baseContext,
  },
  {
    id: 'first-time',
    name: 'First-time member',
    summary: 'Coverage started 6 days ago. No claims, no ID card viewed, no prescriptions filled.',
    signals: ['Coverage 6 days old', 'No claims yet', 'Has not filled a prescription'],
    context: {
      ...baseContext,
      firstName: 'Jamie',
      tenureDays: 6,
      recentClaimCount: 0,
      visibleActivityIds: [],
      hasFilledPrescription: false,
      savedProgramIds: [],
      individual: {
        deductible: { applied: 0, limit: 1500 },
        outOfPocket: { applied: 0, limit: 3000 },
      },
      family: {
        deductible: { applied: 0, limit: 3000 },
        outOfPocket: { applied: 0, limit: 7000 },
      },
    },
  },
  {
    id: 'recent-claims',
    name: 'Has recent claims',
    summary: 'Four prescription claims processed in the last three weeks, all approved.',
    signals: ['4 claims in 90 days', 'Most recent 3 days ago', 'Deductible 33% applied'],
    context: {
      ...baseContext,
      recentClaimCount: 4,
      visibleActivityIds: [
        'azelaic-jun',
        'celexa-jun',
        'simvastatin-jun',
        'zafirlukast-may',
        'simvastatin-may',
        'cyltezo-apr',
        'azelaic-apr',
      ],
    },
  },
  {
    id: 'prior-auth',
    name: 'Prior auth needs attention',
    summary: 'A prior authorization for Ubrelvy 50 mg was denied and the appeal window is open.',
    signals: ['Prior auth denied', 'Appeal window open', '4 claims in 90 days'],
    context: {
      ...baseContext,
      recentClaimCount: 4,
      visibleActivityIds: [
        'ubrelvy-pa',
        'azelaic-jun',
        'celexa-jun',
        'simvastatin-jun',
        'zafirlukast-may',
        'cyltezo-apr',
      ],
      priorAuth: {
        id: 'ubrelvy-pa',
        drug: 'Ubrelvy 50 mg',
        status: 'needs-action',
        submittedOn: 'June 21, 2026',
        decisionBy: 'December 18, 2026',
      },
    },
  },
  {
    id: 'near-deductible',
    name: 'Almost met deductible',
    summary: '$240 left on the individual deductible after a steady run of fills this spring.',
    signals: ['Deductible 84% applied', '$240 remaining', '5 claims in 90 days'],
    context: {
      ...baseContext,
      recentClaimCount: 5,
      visibleActivityIds: [
        'azelaic-jun',
        'celexa-jun',
        'simvastatin-jun',
        'zafirlukast-may',
        'simvastatin-may',
        'cyltezo-apr',
      ],
      individual: {
        deductible: { applied: 1260, limit: 1500 },
        outOfPocket: { applied: 1412, limit: 3000 },
      },
      family: {
        deductible: { applied: 2180, limit: 3000 },
        outOfPocket: { applied: 4900, limit: 7000 },
      },
    },
  },
];

export const defaultScenarioId: ScenarioId = 'steady';

export const getScenario = (id: ScenarioId): Scenario =>
  scenarios.find((scenario) => scenario.id === id) ?? scenarios[0];
