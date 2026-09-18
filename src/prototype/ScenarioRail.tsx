import { scenarios, type ScenarioId } from '../adaptive/scenarios';

type ScenarioRailProps = {
  activeId: ScenarioId;
  onChange: (id: ScenarioId) => void;
  annotate: boolean;
  onAnnotateChange: (value: boolean) => void;
};

/** Prototype controls. These live outside the device frame on purpose. */
export function ScenarioRail({
  activeId,
  onChange,
  annotate,
  onAnnotateChange,
}: ScenarioRailProps) {
  return (
    <div className="panel">
      <h2 className="panel__title">Member context</h2>
      <p className="panel__hint">
        Pick a situation. The heading stays put and everything below it is re-ordered and re-written
        for that member.
      </p>

      <fieldset className="scenario-list">
        <legend className="visually-hidden">Member scenario</legend>
        {scenarios.map((scenario) => (
          <label
            key={scenario.id}
            className={`scenario${scenario.id === activeId ? ' scenario--active' : ''}`}
          >
            <input
              type="radio"
              name="scenario"
              value={scenario.id}
              checked={scenario.id === activeId}
              onChange={() => onChange(scenario.id)}
            />
            <span>
              <span className="scenario__name">{scenario.name}</span>
              <span className="scenario__summary">{scenario.summary}</span>
            </span>
          </label>
        ))}
      </fieldset>

      <label className="toggle">
        <input
          type="checkbox"
          checked={annotate}
          onChange={(event) => onAnnotateChange(event.target.checked)}
        />
        Label what moved
      </label>
      <p className="toggle__hint">
        Adds review badges on top of each section. Turn it off to see the screen as a member would.
      </p>
    </div>
  );
}
