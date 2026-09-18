import { ChevronRight } from 'lucide-react';
import { Card, Donut, Progress, Reveal, SectionHead } from '../components/primitives';
import {
  formatCurrency,
  formatWhole,
  percentApplied,
  remaining,
  type MemberContext,
} from '../adaptive/context';
import type { BlockProps } from './types';

const segments = (ctx: MemberContext) => {
  const { applied, limit } = ctx.individual.deductible;
  return [
    { label: 'Prescriptions', value: applied, color: 'var(--teal)' },
    { label: 'Remaining', value: Math.max(0, limit - applied), color: '#d5d8d5' },
  ];
};

/** Promoted out of Track plan balances when the member is close to a threshold. */
export function DeductibleSpotlight({ ctx, variant, navigate }: BlockProps) {
  const individual = ctx.individual.deductible;
  const family = ctx.family.deductible;
  const left = remaining(individual);
  const applied = percentApplied(individual);

  if (variant === 'compact') {
    return (
      <>
        <SectionHead
          title="What your fills counted toward"
          action={
            <button type="button" className="link-inline" onClick={() => navigate('balances')}>
              View all
            </button>
          }
        />
        <Card>
          <div className="balance-line">
            <span className="balance-line__label">Individual deductible</span>
            <span className="balance-line__value">{formatCurrency(left)} left</span>
          </div>
          <Progress percent={applied} label="Individual deductible" />
          <p className="detail-line">
            {formatCurrency(individual.applied)} applied to {formatCurrency(individual.limit)}
          </p>
          <div className="balance-line balance-line--spaced">
            <span className="balance-line__label">Out-of-pocket maximum</span>
            <span className="balance-line__value">
              {formatCurrency(remaining(ctx.individual.outOfPocket))} left
            </span>
          </div>
          <Progress
            percent={percentApplied(ctx.individual.outOfPocket)}
            label="Out-of-pocket maximum"
          />
          <p className="detail-line">
            {formatCurrency(ctx.individual.outOfPocket.applied)} applied to{' '}
            {formatCurrency(ctx.individual.outOfPocket.limit)}
          </p>
        </Card>
      </>
    );
  }

  return (
    <>
      <SectionHead title="Your deductible" note="Updated after your most recent claim" />
      <Card className="spotlight">
        <div className="spotlight__top">
          <Donut
            segments={segments(ctx)}
            centerAmount={formatWhole(left)}
            centerLabel="to go"
            size={84}
          />
          <div>
            <h3 className="spotlight__headline">
              {formatWhole(left)} left before your plan starts sharing costs
            </h3>
            <p className="spotlight__sub">
              {formatCurrency(individual.applied)} of {formatCurrency(individual.limit)} applied
            </p>
          </div>
        </div>

        <Reveal label="What changes when you meet it" openLabel="Hide what changes">
          <ul className="spotlight__list">
            <li>You pay a copay for covered prescriptions instead of the full discounted price.</li>
            <li>
              Your family deductible has {formatCurrency(remaining(family))} left, and it is met
              separately from yours.
            </li>
            <li>Your deductible resets on January 1, so this year&apos;s amounts do not carry over.</li>
          </ul>
        </Reveal>

        <button
          type="button"
          className="link-inline spotlight__link"
          onClick={() => navigate('balances')}
        >
          See all plan balances
          <ChevronRight size={15} aria-hidden="true" />
        </button>
      </Card>
    </>
  );
}
