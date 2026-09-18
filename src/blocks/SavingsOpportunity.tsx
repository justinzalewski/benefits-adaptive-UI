import { Store, Truck } from 'lucide-react';
import { Card, IconTile, Reveal, SectionHead } from '../components/primitives';
import type { BlockProps } from './types';

const options = [
  {
    id: 'home-delivery',
    title: 'Home delivery, 90-day supply',
    summary: 'One copay instead of three',
    detail:
      'Most maintenance medications ship in 3 to 5 days, and a 90-day supply costs one copay instead of three monthly ones. Recommended because all four of your current medications are eligible.',
    recommended: true,
    Icon: Truck,
  },
  {
    id: 'retail',
    title: 'Keep filling at retail',
    summary: 'Nothing changes if you do nothing',
    detail:
      'Pick up 30-day fills at your current pharmacy at the same price you pay today. You can still compare nearby pharmacies before each fill.',
    recommended: false,
    Icon: Store,
  },
];

/** Surfaced when the member is close to a threshold and the next fill cost is in play. */
export function SavingsOpportunity({ navigate }: BlockProps) {
  return (
    <>
      <SectionHead
        title="Ways to pay less on your next fill"
        note="Both options are covered, and you see the price before you confirm."
      />
      <div className="stack">
        {options.map(({ id, title, summary, detail, recommended, Icon }) => (
          <Card key={id} className={recommended ? 'option option--recommended' : 'option'}>
            <div className="card--row option__head">
              <IconTile>
                <Icon size={18} aria-hidden="true" />
              </IconTile>
              <span className="option__text">
                <span className="card__title">{title}</span>
                <span className="card__desc">{summary}</span>
              </span>
              {recommended ? <span className="chip chip--recommend">Recommended</span> : null}
            </div>
            <Reveal label="How this works" openLabel="Hide details">
              <p className="card__desc">{detail}</p>
            </Reveal>
          </Card>
        ))}
      </div>
      <button
        type="button"
        className="btn btn--outline btn--block option__compare"
        onClick={() => navigate('plan')}
      >
        Compare prices and coverage
      </button>
    </>
  );
}
