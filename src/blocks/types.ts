import type { MemberContext } from '../adaptive/context';
import type { BlockVariant } from '../adaptive/rules';

export type Route = 'benefits' | 'plan' | 'balances' | 'activity' | 'programs';

export type BlockProps = {
  ctx: MemberContext;
  variant: BlockVariant;
  navigate: (route: Route) => void;
};
