import { Mail, MessageSquare } from 'lucide-react';
import { blockComponents } from '../blocks/registry';
import { badgeLabels } from '../prototype/badges';
import type { MemberContext } from '../adaptive/context';
import type { Placement } from '../adaptive/rules';
import type { Route } from '../blocks/types';

type BenefitsPageProps = {
  ctx: MemberContext;
  placements: Placement[];
  navigate: (route: Route) => void;
  annotate: boolean;
};

/** The heading stays fixed; everything below it is composed from the layout plan. */
export function BenefitsPage({ ctx, placements, navigate, annotate }: BenefitsPageProps) {
  return (
    <div className="screen">
      <div className="benefits-top">
        <span className="benefits-top__mail">
          <Mail size={20} aria-hidden="true" />
          <span className="benefits-top__badge">1</span>
        </span>
        <span className="benefits-top__right">
          <MessageSquare size={20} aria-hidden="true" />
          <span className="benefits-top__avatar">FL</span>
        </span>
      </div>

      <header className="benefits-head">
        <h1 className="benefits-head__title">Benefits</h1>
        <p className="benefits-head__sub">
          Everything you need to manage your health plan, all in one place
        </p>
      </header>

      {placements.map((placement, index) => {
        const Block = blockComponents[placement.blockId];
        const banded = index % 2 === 1;
        return (
          <section
            key={placement.blockId}
            className={`screen-section${banded ? ' screen-section--band' : ''}${
              annotate ? ' annotate' : ''
            }`}
            aria-label={placement.blockId}
          >
            {annotate && placement.badge ? (
              <span className={`badge badge--${placement.badge} annotate__badge`}>
                {badgeLabels[placement.badge]}
              </span>
            ) : null}
            <Block ctx={ctx} variant={placement.variant} navigate={navigate} />
          </section>
        );
      })}
    </div>
  );
}
