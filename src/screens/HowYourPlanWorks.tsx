import { useState } from 'react';
import { Check, ChevronDown, ChevronRight, Store, Truck } from 'lucide-react';
import { Card, SectionHead } from '../components/primitives';
import { MemberSelect, SubPage } from '../components/SubPage';
import { includedWithBenefits, pharmacyOptions, planPrograms, planStages } from '../data/plan';
import type { MemberContext } from '../adaptive/context';
import type { Route } from '../blocks/types';

export function HowYourPlanWorks({
  ctx,
  navigate,
}: {
  ctx: MemberContext;
  navigate: (route: Route) => void;
}) {
  const [openPanel, setOpenPanel] = useState<string | null>(includedWithBenefits[0].id);

  return (
    <SubPage title="How your plan works" onBack={() => navigate('benefits')}>
      <div className="screen-section screen-section--tight">
        <MemberSelect firstName={ctx.firstName} />
      </div>

      <section className="screen-section screen-section--tight">
        <SectionHead title="Plan overview" />
        <Card className="stages">
          <ol className="stages__list">
            {planStages.map((stage) => (
              <li
                key={stage.id}
                className={`stages__item${stage.current ? ' stages__item--current' : ''}`}
              >
                <span className="stages__marker" aria-hidden="true" />
                <div className="stages__body">
                  <div className="stages__row">
                    <span className="stages__eyebrow">{stage.stage}</span>
                    {stage.current ? <span className="chip chip--progress">In progress</span> : null}
                  </div>
                  <h3 className="stages__title">{stage.title}</h3>
                  <p className="card__desc">{stage.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
        <button
          type="button"
          className="btn btn--outline btn--block"
          onClick={() => navigate('balances')}
        >
          View plan balances
        </button>
      </section>

      <section className="screen-section screen-section--tight">
        <SectionHead
          title="Plan requirements"
          note="Rules your plan applies to help keep your medications covered."
        />
        <div className="stack">
          {planPrograms.map((program) => (
            <Card key={program.id}>
              <h3 className="card__title">{program.title}</h3>
              <p className="card__desc">{program.description}</p>
              {program.bullets.length ? (
                <ul className="checklist">
                  {program.bullets.map((bullet) => (
                    <li key={bullet}>
                      <Check size={15} aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
              <button type="button" className="link-inline">
                {program.linkLabel}
                <ChevronRight size={15} aria-hidden="true" />
              </button>
            </Card>
          ))}
        </div>
      </section>

      <section className="screen-section screen-section--tight">
        <SectionHead
          title="Pharmacy options"
          note="Learn all the pharmacy options available and when to use them."
        />
        <div className="program-grid">
          {pharmacyOptions.map((option) => (
            <Card key={option.id} className="program-tile" onClick={() => undefined}>
              {option.id === 'home-delivery' ? (
                <Truck size={20} className="program-tile__icon" aria-hidden="true" />
              ) : (
                <Store size={20} className="program-tile__icon" aria-hidden="true" />
              )}
              <h3 className="card__title">{option.title}</h3>
              <p className="card__desc">{option.description}</p>
              {option.recommended ? <span className="chip chip--recommend">Recommended</span> : null}
            </Card>
          ))}
        </div>
        <button type="button" className="btn btn--outline btn--block">
          Compare prices and coverage
        </button>
      </section>

      <section className="screen-section screen-section--band">
        <SectionHead
          title="Included with your benefits"
          note="Discover programs, support and savings available through your plan."
        />
        <div className="stack">
          {includedWithBenefits.map((panel) => {
            const open = openPanel === panel.id;
            return (
              <Card key={panel.id} className="disclosure">
                <button
                  type="button"
                  className="disclosure__trigger"
                  aria-expanded={open}
                  onClick={() => setOpenPanel(open ? null : panel.id)}
                >
                  {panel.title}
                  <ChevronDown size={18} className={open ? 'rotated' : ''} aria-hidden="true" />
                </button>
                {open ? (
                  <div className="disclosure__body">
                    <p className="card__desc">{panel.lede}</p>
                    {panel.sections?.map((section) => (
                      <div key={section.heading}>
                        <h4 className="disclosure__heading">{section.heading}</h4>
                        <p className="card__desc">{section.body}</p>
                      </div>
                    ))}
                    {panel.bullets ? (
                      <ul className="checklist">
                        {panel.bullets.map((bullet) => (
                          <li key={bullet}>
                            <Check size={15} aria-hidden="true" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {panel.callout ? (
                      <div className="callout">
                        <h4 className="disclosure__heading">{panel.callout.heading}</h4>
                        <p className="card__desc">{panel.callout.body}</p>
                        <button type="button" className="btn btn--primary btn--sm">
                          {panel.callout.linkLabel}
                        </button>
                      </div>
                    ) : null}
                    {panel.button ? (
                      <button type="button" className="btn btn--primary btn--block">
                        {panel.button}
                      </button>
                    ) : null}
                    {panel.linkLabel ? (
                      <button type="button" className="link-inline">
                        {panel.linkLabel}
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>
      </section>
    </SubPage>
  );
}
