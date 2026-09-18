import { ChevronDown } from 'lucide-react';
import { Card, Donut, Legend, Progress, SectionHead } from '../components/primitives';
import { MemberSelect, SubPage } from '../components/SubPage';
import {
  formatCurrency,
  hasMetDeductible,
  percentApplied,
  remaining,
  type Balance,
  type MemberContext,
} from '../adaptive/context';
import type { Route } from '../blocks/types';

const ringFor = (balance: Balance) => [
  { label: 'Prescriptions', value: balance.applied, color: 'var(--teal)' },
  { label: 'Medical', value: 0, color: 'var(--green-deep)' },
  { label: 'Other', value: 0, color: '#8a8f8c' },
  { label: 'Remaining', value: remaining(balance), color: '#d5d8d5' },
];

function BalanceRow({
  scope,
  balance,
  name,
}: {
  scope: string;
  balance: Balance;
  name: string;
}) {
  return (
    <div className="balance">
      <p className="eyebrow">{scope}</p>
      <p className="balance__amount">{formatCurrency(remaining(balance))} remaining</p>
      <Progress percent={percentApplied(balance)} label={`${name} ${scope}`} />
      <p className="detail-line">
        {formatCurrency(balance.applied)} applied to {formatCurrency(balance.limit)}
      </p>
      <button type="button" className="link-inline balance__math">
        Show me the math
      </button>
    </div>
  );
}

export function TrackPlanBalances({
  ctx,
  navigate,
}: {
  ctx: MemberContext;
  navigate: (route: Route) => void;
}) {
  const stageCopy = hasMetDeductible(ctx)
    ? 'You have met your deductible, so your plan is sharing the cost of covered prescriptions.'
    : 'You pay the full discounted price for covered prescriptions until your deductible is met. Your family members each have their own deductible.';

  return (
    <SubPage title="Track plan balances" onBack={() => navigate('benefits')}>
      <div className="screen-section screen-section--tight">
        <MemberSelect firstName={ctx.firstName} />
        <h2 className="balances__lede">
          {hasMetDeductible(ctx) ? 'Your deductible is met' : 'You are in the deductible stage'}
        </h2>
        <p className="card__desc">{stageCopy}</p>
      </div>

      <section className="screen-section screen-section--tight">
        <Card className="ring-card">
          <h3 className="ring-card__title">Individual</h3>
          <div className="ring-card__row">
            <Donut
              segments={ringFor(ctx.individual.deductible)}
              centerAmount={formatCurrency(remaining(ctx.individual.deductible))}
              centerLabel="remaining"
              size={120}
            />
            <div className="ring-card__amounts">
              <p className="detail-line">Amount applied</p>
              <p className="ring-card__applied">
                {formatCurrency(ctx.individual.deductible.applied)}
              </p>
              <p className="detail-line">Plan limit</p>
              <p className="ring-card__applied">
                {formatCurrency(ctx.individual.deductible.limit)}
              </p>
            </div>
          </div>
          <Legend items={ringFor(ctx.individual.deductible).slice(0, 3)} />
        </Card>

        <Card className="ring-card">
          <h3 className="ring-card__title">Family</h3>
          <div className="ring-card__row">
            <Donut
              segments={ringFor(ctx.family.deductible)}
              centerAmount={formatCurrency(remaining(ctx.family.deductible))}
              centerLabel="remaining"
              size={120}
            />
            <div className="ring-card__amounts">
              <p className="detail-line">Amount applied</p>
              <p className="ring-card__applied">{formatCurrency(ctx.family.deductible.applied)}</p>
              <p className="detail-line">Plan limit</p>
              <p className="ring-card__applied">{formatCurrency(ctx.family.deductible.limit)}</p>
            </div>
          </div>
          <Legend items={ringFor(ctx.family.deductible).slice(0, 3)} />
        </Card>
      </section>

      <section className="screen-section screen-section--tight">
        <SectionHead title="Plan balances" />
        <div className="filter-row">
          <span className="select">
            Show: In-network
            <ChevronDown size={15} aria-hidden="true" />
          </span>
          <span className="select">
            Plan year: 2026
            <ChevronDown size={15} aria-hidden="true" />
          </span>
        </div>

        <div className="stack">
          <Card>
            <h3 className="balance-card__title">Deductible</h3>
            <p className="card__desc">
              Your deductible is the amount you pay for covered prescriptions before your plan
              starts sharing the cost.
            </p>
            <BalanceRow scope="Individual" balance={ctx.individual.deductible} name="Deductible" />
            <BalanceRow scope="Family" balance={ctx.family.deductible} name="Deductible" />
          </Card>

          <Card>
            <h3 className="balance-card__title">Out-of-pocket maximum</h3>
            <p className="card__desc">
              Your out-of-pocket maximum is the most you will pay for prescriptions during the plan
              year. Once you reach it, your plan pays 100% of covered costs.
            </p>
            <BalanceRow
              scope="Individual"
              balance={ctx.individual.outOfPocket}
              name="Out-of-pocket maximum"
            />
            <BalanceRow
              scope="Family"
              balance={ctx.family.outOfPocket}
              name="Out-of-pocket maximum"
            />
          </Card>

          <Card>
            <h3 className="balance-card__title">Drug specific cap</h3>
            <p className="card__desc">
              A drug specific cap limits how much you pay for certain medications. Once you reach
              the cap, your costs may be reduced or covered based on your plan.
            </p>
            <BalanceRow
              scope="Individual"
              balance={{ applied: 100, limit: 14000 }}
              name="Drug specific cap"
            />
          </Card>

          <Card>
            <h3 className="balance-card__title">Health reimbursement account (HRA)</h3>
            <p className="card__desc">
              An HRA is an account-based health plan where employers reimburse you for your medical
              or pharmaceutical expenses.
            </p>
            <BalanceRow scope="Individual" balance={{ applied: 120, limit: 120 }} name="HRA" />
          </Card>
        </div>
      </section>
    </SubPage>
  );
}
