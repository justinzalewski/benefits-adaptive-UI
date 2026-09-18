import { AlertTriangle } from 'lucide-react';
import { Reveal } from '../components/primitives';
import type { BlockProps } from './types';

/** Leads the page when something has a deadline only the member can act on. */
export function ActionNeeded({ ctx, navigate }: BlockProps) {
  const priorAuth = ctx.priorAuth;
  if (!priorAuth) return null;

  return (
    <div className="alert-card">
      <p className="alert-card__eyebrow">
        <AlertTriangle size={15} aria-hidden="true" />
        Needs your attention
      </p>
      <h2 className="alert-card__title">Your {priorAuth.drug} request was denied</h2>
      <p className="alert-card__body">
        Your prescriber needs to send proof you tried a faster therapy. You can appeal through{' '}
        {priorAuth.decisionBy}.
      </p>
      <div className="alert-card__actions">
        <button type="button" className="btn btn--primary btn--sm">
          Start an appeal
        </button>
        <button type="button" className="link-inline" onClick={() => navigate('activity')}>
          See the details
        </button>
      </div>
      <Reveal label="Why am I seeing this?" openLabel="Hide this">
        <p className="alert-card__why">
          This medication needs prior authorization before your plan covers it. Nothing moves
          forward until the missing records arrive, and we review again within 72 hours of getting
          them. You can also ask your prescriber about a covered alternative.
        </p>
      </Reveal>
    </div>
  );
}
