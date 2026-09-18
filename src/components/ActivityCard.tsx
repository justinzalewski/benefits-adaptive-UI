import { ChevronRight, Pill } from 'lucide-react';
import { StatusRow } from './primitives';
import type { ActivityItem } from '../data/plan';

/** The claim / prior-authorization card used on Recent activity and on the Benefits page. */
export function ActivityCard({
  item,
  showAction = true,
}: {
  item: ActivityItem;
  showAction?: boolean;
}) {
  return (
    <article className="activity">
      <span className="activity__edge" style={{ background: item.edge }} aria-hidden="true" />
      <div className="activity__head">
        <span className="activity__thumb" style={{ background: item.tint }} aria-hidden="true">
          <Pill size={18} />
        </span>
        <div className="activity__id">
          <h3 className="card__title">{item.name}</h3>
          <p className="activity__meta">
            {item.date} | {item.person}
          </p>
        </div>
        <ChevronRight size={18} className="card__chevron" aria-hidden="true" />
      </div>

      <div className="activity__statuses">
        {item.statuses.map((status) => (
          <StatusRow key={status.label} tone={status.tone}>
            {status.label}
          </StatusRow>
        ))}
      </div>

      {item.note ? <p className="activity__note">{item.note}</p> : null}

      {item.appliedToDeductible ? (
        <div className="activity__applied">
          <p className="detail-line">Applied to deductible: {item.appliedToDeductible}</p>
          <p className="detail-line">Applied to out-of-pocket: {item.appliedToOop}</p>
        </div>
      ) : null}

      <footer className="activity__foot">
        <span className="chip">{item.kind === 'claim' ? 'Claim' : 'Prior authorization'}</span>
        {item.paid ? (
          <span className="activity__paid">
            You paid: <strong>{item.paid}</strong>
          </span>
        ) : null}
        {showAction && item.action ? (
          <button type="button" className="link-inline">
            {item.action.label}
          </button>
        ) : null}
      </footer>
    </article>
  );
}
