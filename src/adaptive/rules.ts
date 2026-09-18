import {
  formatWhole,
  isNearDeductible,
  isNewMember,
  percentApplied,
  remaining,
  type MemberContext,
} from './context';

export type BlockId =
  | 'actionNeeded'
  | 'getStarted'
  | 'deductibleSpotlight'
  | 'recentActivity'
  | 'planBasics'
  | 'idCards'
  | 'savingsOpportunity'
  | 'benefitPrograms'
  | 'helpfulResources';

export type BlockVariant =
  | 'default'
  | 'explainer'
  | 'first-use'
  | 'claims'
  | 'prior-auth'
  | 'empty'
  | 'spotlight'
  | 'compact'
  | 'suggested';

export type Badge = 'new' | 'up' | 'down' | 'changed';

export type Placement = {
  blockId: BlockId;
  variant: BlockVariant;
  /** Why this block sits where it does, shown in the "What changed and why" panel. */
  reason: string;
  badge?: Badge;
};

type Candidate = Placement & { priority: number };

export const blockTitles: Record<BlockId, string> = {
  actionNeeded: 'Needs your attention',
  getStarted: 'Get started',
  deductibleSpotlight: 'Deductible progress',
  recentActivity: 'Recent activity',
  planBasics: 'Plan basics',
  idCards: 'ID cards',
  savingsOpportunity: 'Ways to save',
  benefitPrograms: 'Benefit programs',
  helpfulResources: 'Helpful resources',
};

/** The Benefits page as it ships today. Also the baseline for move-up/move-down badges. */
const baselineCandidates: Candidate[] = [
  {
    blockId: 'planBasics',
    variant: 'default',
    priority: 50,
    reason: 'Default entry points into how the plan works and what has been spent.',
  },
  {
    blockId: 'idCards',
    variant: 'default',
    priority: 40,
    reason: 'Pharmacy ID card, kept available for the counter or a new prescriber.',
  },
  {
    blockId: 'benefitPrograms',
    variant: 'default',
    priority: 30,
    reason: 'The four program categories included with this plan.',
  },
  {
    blockId: 'helpfulResources',
    variant: 'default',
    priority: 20,
    reason: 'Evergreen videos and FAQs for anything not answered above.',
  },
];

export const baselineOrder: BlockId[] = baselineCandidates.map((candidate) => candidate.blockId);

const baselineVariants = Object.fromEntries(
  baselineCandidates.map((candidate) => [candidate.blockId, candidate.variant]),
) as Partial<Record<BlockId, BlockVariant>>;

function contextCandidates(ctx: MemberContext): Candidate[] {
  const candidates: Candidate[] = [];

  if (ctx.priorAuth?.status === 'needs-action') {
    candidates.push({
      blockId: 'actionNeeded',
      variant: 'prior-auth',
      priority: 200,
      reason: `The ${ctx.priorAuth.drug} prior authorization was denied and only the member can start the appeal, so it leads the page with the reason and the deadline stated plainly.`,
    });
    candidates.push({
      blockId: 'recentActivity',
      variant: 'prior-auth',
      priority: 150,
      reason: 'The request timeline sits directly under the alert so the member can see what has already happened without opening a sub-page.',
    });
  }

  if (isNearDeductible(ctx)) {
    const left = formatWhole(remaining(ctx.individual.deductible));
    candidates.push({
      blockId: 'deductibleSpotlight',
      variant: 'spotlight',
      priority: 160,
      reason: `${Math.round(percentApplied(ctx.individual.deductible))}% of the individual deductible is applied, so the ${left} still to go is promoted out of Track plan balances and paired with what changes once it is met.`,
    });
    candidates.push({
      blockId: 'savingsOpportunity',
      variant: 'default',
      priority: 130,
      reason: 'With the deductible close, the two actions that change the next fill cost are worth surfacing before the member goes looking for them.',
    });
  }

  if (isNewMember(ctx)) {
    candidates.push({
      blockId: 'getStarted',
      variant: 'default',
      priority: 180,
      reason: 'Coverage is days old, so the page leads with the three setup steps instead of balances that are all still at zero.',
    });
    candidates.push({
      blockId: 'planBasics',
      variant: 'explainer',
      priority: 120,
      reason: 'How your plan works is expanded into a plain-language explainer, since this member has no spending history to read yet.',
    });
    candidates.push({
      blockId: 'idCards',
      variant: 'first-use',
      priority: 110,
      reason: 'A first fill needs the ID card, so it moves up with the member ID and RxBIN ready to show at the pharmacy.',
    });
    candidates.push({
      blockId: 'recentActivity',
      variant: 'empty',
      priority: 15,
      reason: 'Activity stays on the page as a labelled empty state rather than disappearing, so the member learns where claims will appear.',
    });
  }

  if (ctx.recentClaimCount >= 2 && !isNewMember(ctx)) {
    candidates.push({
      blockId: 'recentActivity',
      variant: 'claims',
      priority: 140,
      reason: `${ctx.recentClaimCount} claims processed in the last 90 days, so the most recent three and what they cost lead the page.`,
    });
    candidates.push({
      blockId: 'deductibleSpotlight',
      variant: 'compact',
      priority: 100,
      reason: 'A compact balance line sits under recent activity, answering the usual next question about what those fills counted toward.',
    });
    candidates.push({
      blockId: 'idCards',
      variant: 'default',
      priority: 60,
      reason: 'A member who is already filling has the card handy, so it sits behind the activity and balance context but stays ahead of plan basics.',
    });
  }

  return candidates;
}

/** Resolve context signals into an ordered, de-duplicated page layout. */
export function buildLayout(ctx: MemberContext): Placement[] {
  const candidates = [...contextCandidates(ctx), ...baselineCandidates];

  const byBlock = new Map<BlockId, Candidate>();
  candidates.forEach((candidate) => {
    const existing = byBlock.get(candidate.blockId);
    if (!existing || candidate.priority > existing.priority) {
      byBlock.set(candidate.blockId, candidate);
    }
  });

  const ordered = [...byBlock.values()].sort((a, b) => b.priority - a.priority);

  // Up/down is judged against the other blocks that also exist today, so inserting a
  // brand new block at the top does not mark every remaining block as "moved down".
  const baselineBlocksInOrder = ordered
    .map((candidate) => candidate.blockId)
    .filter((blockId) => baselineOrder.includes(blockId));

  return ordered.map(({ priority: _priority, ...placement }) => {
    const baselineIndex = baselineOrder.indexOf(placement.blockId);
    let badge: Badge | undefined;

    if (baselineIndex === -1) {
      badge = 'new';
    } else if (placement.variant !== baselineVariants[placement.blockId]) {
      badge = 'changed';
    } else {
      const currentIndex = baselineBlocksInOrder.indexOf(placement.blockId);
      if (currentIndex < baselineIndex) badge = 'up';
      else if (currentIndex > baselineIndex) badge = 'down';
    }

    return { ...placement, badge };
  });
}

export const isBaselineLayout = (placements: Placement[]) =>
  placements.length === baselineOrder.length &&
  placements.every((placement, index) => placement.blockId === baselineOrder[index]);
