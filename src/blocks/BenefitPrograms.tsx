import { Brain, ChevronRight, LayoutGrid, Sun, Video, Wallet } from 'lucide-react';
import { Card, SectionHead } from '../components/primitives';
import { programCategories } from '../data/plan';
import type { BlockProps } from './types';

const icons = {
  sun: Sun,
  brain: Brain,
  wallet: Wallet,
  video: Video,
} as const;

export function BenefitPrograms({ navigate }: BlockProps) {
  return (
    <>
      <SectionHead title="Benefit programs" />
      <div className="program-grid">
        {programCategories.map((category) => {
          const Icon = icons[category.icon as keyof typeof icons];
          return (
            <Card
              key={category.id}
              className="program-tile"
              onClick={() => navigate('programs')}
              label={`${category.id} programs`}
            >
              <Icon size={22} className="program-tile__icon" aria-hidden="true" />
              <h3 className="card__title">{category.id}</h3>
              <p className="card__desc">{category.blurb}</p>
            </Card>
          );
        })}
      </div>
      <Card className="row-card" onClick={() => navigate('programs')}>
        <div className="card--row">
          <LayoutGrid size={20} aria-hidden="true" className="row-card__icon" />
          <h3 className="card__title">View all benefit programs</h3>
          <ChevronRight size={18} className="card__chevron" aria-hidden="true" />
        </div>
      </Card>
    </>
  );
}
