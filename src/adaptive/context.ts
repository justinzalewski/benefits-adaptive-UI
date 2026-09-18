/** The member signals the adaptive layout reads. All values are fictional. */

export type PriorAuthStatus = 'in-review' | 'needs-action';

export type Balance = {
  applied: number;
  limit: number;
};

export type MemberContext = {
  firstName: string;
  /** Days since coverage started; drives the first-time experience. */
  tenureDays: number;
  /** Claims processed in the last 90 days. */
  recentClaimCount: number;
  /** Ids from `activityItems` the member can see, most recent first. */
  visibleActivityIds: string[];
  priorAuth: {
    id: string;
    drug: string;
    status: PriorAuthStatus;
    submittedOn: string;
    decisionBy: string;
  } | null;
  hasFilledPrescription: boolean;
  savedProgramIds: string[];
  individual: { deductible: Balance; outOfPocket: Balance };
  family: { deductible: Balance; outOfPocket: Balance };
};

export const remaining = (balance: Balance) => Math.max(0, balance.limit - balance.applied);

export const percentApplied = (balance: Balance) =>
  balance.limit === 0 ? 0 : Math.min(100, (balance.applied / balance.limit) * 100);

/** A member is "close" once 80% of the individual deductible has been applied. */
export const isNearDeductible = (ctx: MemberContext) =>
  percentApplied(ctx.individual.deductible) >= 80 && remaining(ctx.individual.deductible) > 0;

export const hasMetDeductible = (ctx: MemberContext) =>
  remaining(ctx.individual.deductible) === 0;

export const isNewMember = (ctx: MemberContext) => ctx.tenureDays <= 30 && !ctx.hasFilledPrescription;

export const formatCurrency = (value: number) =>
  value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

/** "$1,260" with no cents, for headline copy. */
export const formatWhole = (value: number) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
