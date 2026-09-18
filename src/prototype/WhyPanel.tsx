import { blockTitles, isBaselineLayout, type Placement } from '../adaptive/rules';
import { badgeLabels } from './badges';
import type { Scenario } from '../adaptive/scenarios';

export function WhyPanel({
  scenario,
  placements,
}: {
  scenario: Scenario;
  placements: Placement[];
}) {
  return (
    <div className="panel">
      <h2 className="panel__title">What changed and why</h2>
      <p className="panel__hint">
        {isBaselineLayout(placements)
          ? 'Nothing is re-ordered for this member. This is the page as it works today, and it doubles as the comparison point for the other scenarios.'
          : 'Signals the layout read, then the order it produced.'}
      </p>

      <ul className="why__signals">
        {scenario.signals.map((signal) => (
          <li key={signal} className="why__signal">
            {signal}
          </li>
        ))}
      </ul>

      <ol className="why__list">
        {placements.map((placement, index) => (
          <li key={placement.blockId} className="why__item">
            <span className="why__rank">{index + 1}</span>
            <div>
              <p className="why__name">
                {blockTitles[placement.blockId]}
                {placement.badge ? (
                  <span className={`badge badge--${placement.badge}`}>
                    {badgeLabels[placement.badge]}
                  </span>
                ) : null}
              </p>
              <p className="why__reason">{placement.reason}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
