import { useState } from 'react';
import { Card, SectionHead } from '../components/primitives';
import { ActivityCard } from '../components/ActivityCard';
import { MemberSelect, SubPage } from '../components/SubPage';
import { activityItems, type ActivityItem } from '../data/plan';
import type { MemberContext } from '../adaptive/context';
import type { Route } from '../blocks/types';

type Filter = 'claim' | 'prior-auth';

export function RecentActivityPage({
  ctx,
  navigate,
}: {
  ctx: MemberContext;
  navigate: (route: Route) => void;
}) {
  const [filters, setFilters] = useState<Filter[]>(['claim', 'prior-auth']);

  const toggle = (filter: Filter) =>
    setFilters((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter],
    );

  const visible = ctx.visibleActivityIds
    .map((id) => activityItems.find((item) => item.id === id))
    .filter((item): item is ActivityItem => Boolean(item))
    .filter((item) => filters.includes(item.kind));

  const months = visible.reduce<Record<string, ActivityItem[]>>((groups, item) => {
    groups[item.month] = [...(groups[item.month] ?? []), item];
    return groups;
  }, {});

  return (
    <SubPage title="Manage recent activity" onBack={() => navigate('benefits')}>
      <div className="screen-section screen-section--tight">
        <MemberSelect firstName={ctx.firstName} />
      </div>

      <section className="screen-section screen-section--tight">
        <SectionHead title="Recent activity" />
        <div className="chip-row">
          <button
            type="button"
            className={`chip chip--outline${filters.includes('claim') ? ' chip--selected' : ''}`}
            aria-pressed={filters.includes('claim')}
            onClick={() => toggle('claim')}
          >
            <span className="status-dot" aria-hidden="true" />
            All claims
          </button>
          <button
            type="button"
            className={`chip chip--outline${
              filters.includes('prior-auth') ? ' chip--selected' : ''
            }`}
            aria-pressed={filters.includes('prior-auth')}
            onClick={() => toggle('prior-auth')}
          >
            <span className="status-dot status-dot--pending" aria-hidden="true" />
            All prior authorizations
          </button>
        </div>
      </section>

      {visible.length === 0 ? (
        <section className="screen-section screen-section--tight">
          <Card>
            <h3 className="card__title">Nothing here yet</h3>
            <p className="card__desc">
              {ctx.visibleActivityIds.length === 0
                ? 'Your claims will appear here within about three days of filling a prescription.'
                : 'No activity matches the filters you selected. Turn a filter back on to see more.'}
            </p>
          </Card>
        </section>
      ) : null}

      {Object.entries(months).map(([month, items]) => (
        <section key={month} className="screen-section screen-section--tight">
          <p className="eyebrow">{month}</p>
          <div className="stack">
            {items.map((item) => (
              <ActivityCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </SubPage>
  );
}
