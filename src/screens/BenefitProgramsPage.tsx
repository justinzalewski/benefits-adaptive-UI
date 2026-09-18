import { useState } from 'react';
import { Check, ChevronRight, Heart } from 'lucide-react';
import { Card, SectionHead, Wordmark, useCarousel } from '../components/primitives';
import { MemberSelect, SubPage } from '../components/SubPage';
import { programCategories, programs, type ProgramCategory } from '../data/plan';
import type { MemberContext } from '../adaptive/context';
import type { Route } from '../blocks/types';

type Filter = 'All' | ProgramCategory;

export function BenefitProgramsPage({
  ctx,
  navigate,
}: {
  ctx: MemberContext;
  navigate: (route: Route) => void;
}) {
  const [filter, setFilter] = useState<Filter>('All');
  const { trackRef, nav } = useCarousel('recent programs', 200);

  const filters: Filter[] = ['All', ...programCategories.map((category) => category.id)];
  const results = programs.filter(
    (program) => filter === 'All' || program.category === filter,
  );
  const jumpBackIn = programs.filter((program) => program.usedRecently);

  return (
    <SubPage title="Benefits programs" onBack={() => navigate('benefits')}>
      <div className="screen-section screen-section--tight">
        <div className="chip-row">
          <MemberSelect firstName={ctx.firstName} />
          {filters.map((option) => (
            <button
              key={option}
              type="button"
              className={`chip chip--outline${filter === option ? ' chip--selected' : ''}`}
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
            >
              {filter === option ? <Check size={14} aria-hidden="true" /> : null}
              {option}
            </button>
          ))}
        </div>
      </div>

      {jumpBackIn.length ? (
        <section className="screen-section screen-section--tight">
          <SectionHead title="Jump back in" action={nav} />
          <div className="carousel" ref={trackRef}>
            {jumpBackIn.map((program) => (
              <Card key={program.id} className="mini-program" onClick={() => undefined}>
                <div className="mini-program__top">
                  <Wordmark brand={program.brand} />
                  <Heart
                    size={16}
                    className={
                      ctx.savedProgramIds.includes(program.id)
                        ? 'heart heart--saved'
                        : 'heart'
                    }
                    aria-hidden="true"
                  />
                </div>
                <div className="mini-program__row">
                  <h3 className="card__title">{program.name}</h3>
                  <ChevronRight size={16} className="card__chevron" aria-hidden="true" />
                </div>
                <span className="chip">{program.category}</span>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <section className="screen-section screen-section--tight">
        <SectionHead title="Results" />
        <div className="stack">
          {results.map((program) => (
            <Card key={program.id} className="program-row">
              <div className="program-row__top">
                <Wordmark brand={program.brand} />
                <Heart
                  size={16}
                  className={
                    ctx.savedProgramIds.includes(program.id) ? 'heart heart--saved' : 'heart'
                  }
                  aria-hidden="true"
                />
              </div>
              <div className="program-row__body">
                <div>
                  <h3 className="card__title">{program.name}</h3>
                  <p className="card__desc">{program.description}</p>
                </div>
                <ChevronRight size={18} className="card__chevron" aria-hidden="true" />
              </div>
              <span className="chip">{program.category}</span>
            </Card>
          ))}
        </div>
      </section>
    </SubPage>
  );
}
