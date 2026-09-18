import { BarChart3, ChevronRight, Laptop } from 'lucide-react';
import { Card, IconTile, SectionHead, useCarousel } from '../components/primitives';
import { formatCurrency } from '../adaptive/context';
import { planStages } from '../data/plan';
import type { BlockProps } from './types';

export function PlanBasics({ ctx, variant, navigate }: BlockProps) {
  const { trackRef, nav } = useCarousel('plan basics');

  if (variant === 'explainer') {
    return (
      <>
        <SectionHead title="How your plan works" note="A quick read before your first fill" />
        <Card className="explainer">
          <ol className="explainer__stages">
            {planStages.map((stage) => (
              <li
                key={stage.id}
                className={`explainer__stage${stage.current ? ' explainer__stage--current' : ''}`}
              >
                <span className="explainer__marker" aria-hidden="true" />
                <span className="explainer__stage-label">{stage.stage}</span>
                <span className="explainer__stage-title">{stage.title}</span>
                {stage.current ? <span className="chip">You are here</span> : null}
              </li>
            ))}
          </ol>
          <p className="explainer__body">
            You pay the full discounted price for covered prescriptions until you reach your{' '}
            {formatCurrency(ctx.individual.deductible.limit)} deductible. Nothing has been applied
            yet.
          </p>
          <button
            type="button"
            className="btn btn--outline btn--block"
            onClick={() => navigate('plan')}
          >
            See the full breakdown
          </button>
        </Card>
        <Card className="plan-card plan-card--wide" onClick={() => navigate('balances')}>
          <div className="card--row">
            <IconTile>
              <BarChart3 size={20} aria-hidden="true" />
            </IconTile>
            <div>
              <h3 className="card__title">Track plan balances</h3>
              <p className="card__desc">All amounts start at zero until your first claim</p>
            </div>
            <ChevronRight size={18} className="card__chevron" aria-hidden="true" />
          </div>
        </Card>
      </>
    );
  }

  return (
    <>
      <SectionHead title="Plan basics" action={nav} />
      <div className="carousel" ref={trackRef}>
        <Card className="plan-card" onClick={() => navigate('plan')}>
          <IconTile>
            <Laptop size={20} aria-hidden="true" />
          </IconTile>
          <h3 className="card__title plan-card__title">How your plan works</h3>
          <p className="card__desc">Learn what is included and what to expect</p>
          <ChevronRight size={18} className="plan-card__chevron" aria-hidden="true" />
        </Card>
        <Card className="plan-card" onClick={() => navigate('balances')}>
          <IconTile>
            <BarChart3 size={20} aria-hidden="true" />
          </IconTile>
          <h3 className="card__title plan-card__title">Track plan balances</h3>
          <p className="card__desc">View progress towards plan limits</p>
          <ChevronRight size={18} className="plan-card__chevron" aria-hidden="true" />
        </Card>
      </div>
    </>
  );
}
