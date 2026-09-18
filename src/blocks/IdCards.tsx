import { ChevronRight } from 'lucide-react';
import { Card, SectionHead, Wordmark } from '../components/primitives';
import { idCard } from '../data/plan';
import type { BlockProps } from './types';

export function IdCards({ variant }: BlockProps) {
  const firstUse = variant === 'first-use';

  return (
    <>
      <SectionHead
        title="ID cards"
        note={firstUse ? 'Show this at the pharmacy counter for your first fill' : undefined}
      />
      <Card className="id-card" onClick={() => undefined} label="Open pharmacy ID card">
        <div className="id-card__top">
          <div>
            <h3 className="id-card__type">{idCard.type}</h3>
            <p className="id-card__admin">{idCard.administrator}</p>
          </div>
          <Wordmark brand={idCard.brand} />
        </div>
        <div className="id-card__bottom">
          <div>
            <p className="detail-line">ID number: {idCard.memberId}</p>
            <p className="detail-line">RxBIN: {idCard.rxBin}</p>
          </div>
          <ChevronRight size={18} className="card__chevron" aria-hidden="true" />
        </div>
      </Card>
      {firstUse ? (
        <button type="button" className="btn btn--outline btn--block id-card__wallet">
          Add card to your phone wallet
        </button>
      ) : null}
    </>
  );
}
