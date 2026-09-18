import { useMemo, useState } from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { ScenarioRail } from './prototype/ScenarioRail';
import { WhyPanel } from './prototype/WhyPanel';
import { BenefitsPage } from './screens/BenefitsPage';
import { BenefitProgramsPage } from './screens/BenefitProgramsPage';
import { HowYourPlanWorks } from './screens/HowYourPlanWorks';
import { RecentActivityPage } from './screens/RecentActivityPage';
import { TrackPlanBalances } from './screens/TrackPlanBalances';
import { buildLayout } from './adaptive/rules';
import { defaultScenarioId, getScenario, type ScenarioId } from './adaptive/scenarios';
import type { Route } from './blocks/types';

export function App() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>(defaultScenarioId);
  const [route, setRoute] = useState<Route>('benefits');
  const [annotate, setAnnotate] = useState(false);

  const scenario = getScenario(scenarioId);
  const ctx = scenario.context;
  const placements = useMemo(() => buildLayout(ctx), [ctx]);

  const changeScenario = (id: ScenarioId) => {
    setScenarioId(id);
    setRoute('benefits');
  };

  const screen = () => {
    switch (route) {
      case 'plan':
        return <HowYourPlanWorks ctx={ctx} navigate={setRoute} />;
      case 'balances':
        return <TrackPlanBalances ctx={ctx} navigate={setRoute} />;
      case 'activity':
        return <RecentActivityPage ctx={ctx} navigate={setRoute} />;
      case 'programs':
        return <BenefitProgramsPage ctx={ctx} navigate={setRoute} />;
      default:
        return (
          <BenefitsPage
            ctx={ctx}
            placements={placements}
            navigate={setRoute}
            annotate={annotate}
          />
        );
    }
  };

  return (
    <div className="proto">
      <div className="proto__body">
        <aside className="rail" aria-label="Prototype controls">
          <header className="proto__head">
            <p className="proto__kicker">Adaptive UI concept</p>
            <h1 className="proto__title">Benefits, ordered around the member</h1>
            <p className="proto__intro">
              The Benefits page today shows every member the same sections in the same order. This
              prototype keeps the heading and the visual language intact, then lets the member's
              current situation decide what leads the page, what gets reshaped, and what moves down.
            </p>
          </header>

          <ScenarioRail
            activeId={scenarioId}
            onChange={changeScenario}
            annotate={annotate}
            onAnnotateChange={setAnnotate}
          />
          <WhyPanel scenario={scenario} placements={placements} />
        </aside>

        <main className="proto__stage">
          <PhoneFrame scrollKey={`${scenarioId}-${route}`}>{screen()}</PhoneFrame>
        </main>
      </div>
    </div>
  );
}
