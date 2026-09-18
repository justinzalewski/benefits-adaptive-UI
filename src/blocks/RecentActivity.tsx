import { ChevronRight, FileText, Pill } from 'lucide-react';
import { Card, SectionHead, StatusRow } from '../components/primitives';
import { activityItems } from '../data/plan';
import type { BlockProps } from './types';

export function RecentActivity({ ctx, variant, navigate }: BlockProps) {
  const visible = ctx.visibleActivityIds
    .map((id) => activityItems.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (variant === 'empty') {
    return (
      <>
        <SectionHead title="Recent activity" />
        <Card onClick={() => navigate('activity')}>
          <div className="empty">
            <span className="icon-tile">
              <FileText size={20} aria-hidden="true" />
            </span>
            <div>
              <h3 className="card__title">No claims yet</h3>
              <p className="card__desc">
                When you fill your first prescription, the claim shows up here within about three
                days, along with what you paid and what it counted toward.
              </p>
            </div>
            <ChevronRight size={18} className="card__chevron" aria-hidden="true" />
          </div>
        </Card>
      </>
    );
  }

  if (variant === 'prior-auth' && ctx.priorAuth) {
    const item = activityItems.find((activity) => activity.id === ctx.priorAuth?.id);
    return (
      <>
        <SectionHead
          title="Your request so far"
          note={`${ctx.priorAuth.drug}, submitted ${ctx.priorAuth.submittedOn}`}
        />
        <Card>
          <ol className="timeline">
            {item?.statuses.map((status, index) => (
              <li
                key={status.label}
                className={`timeline__step${
                  index === (item?.statuses.length ?? 0) - 1 ? ' timeline__step--last' : ''
                }`}
              >
                <StatusRow tone={status.tone}>{status.label}</StatusRow>
              </li>
            ))}
          </ol>
          <button type="button" className="link-inline" onClick={() => navigate('activity')}>
            Manage recent activity
            <ChevronRight size={15} aria-hidden="true" />
          </button>
        </Card>
      </>
    );
  }

  const preview = visible.filter((item) => item.kind === 'claim').slice(0, 3);
  const totalPaid = preview.reduce(
    (sum, item) => sum + Number((item.paid ?? '$0').replace(/[^0-9.]/g, '')),
    0,
  );

  return (
    <>
      <SectionHead
        title="Recent activity"
        note={`You paid $${totalPaid.toFixed(2)} across your last ${preview.length} fills`}
        action={
          <button type="button" className="link-inline" onClick={() => navigate('activity')}>
            View all {ctx.recentClaimCount}
          </button>
        }
      />
      <Card className="claims">
        {preview.map((item) => (
          <button
            key={item.id}
            type="button"
            className="claims__row"
            onClick={() => navigate('activity')}
          >
            <span className="claims__thumb" style={{ background: item.tint }} aria-hidden="true">
              <Pill size={15} />
            </span>
            <span className="claims__id">
              <span className="claims__name">{item.name}</span>
              <span className="claims__meta">
                {item.date} | {item.statuses[0].label}
              </span>
            </span>
            <span className="claims__paid">{item.paid}</span>
            <ChevronRight size={16} className="card__chevron" aria-hidden="true" />
          </button>
        ))}
      </Card>
    </>
  );
}
