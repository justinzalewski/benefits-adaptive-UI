import { describe, expect, it } from 'vitest';
import { baselineOrder, buildLayout, isBaselineLayout } from './rules';
import { getScenario, scenarios } from './scenarios';

const layoutFor = (id: Parameters<typeof getScenario>[0]) =>
  buildLayout(getScenario(id).context).map((placement) => placement.blockId);

describe('buildLayout', () => {
  it('leaves the steady-state member on the layout that ships today', () => {
    const placements = buildLayout(getScenario('steady').context);
    expect(placements.map((placement) => placement.blockId)).toEqual(baselineOrder);
    expect(isBaselineLayout(placements)).toBe(true);
    expect(placements.every((placement) => placement.badge === undefined)).toBe(true);
  });

  it('leads with the appeal when a prior authorization needs attention', () => {
    const placements = buildLayout(getScenario('prior-auth').context);
    expect(placements[0].blockId).toBe('actionNeeded');
    expect(placements[1]).toMatchObject({ blockId: 'recentActivity', variant: 'prior-auth' });
    expect(isBaselineLayout(placements)).toBe(false);
  });

  it('leads a first-time member with setup steps and never shows a populated claim list', () => {
    const placements = buildLayout(getScenario('first-time').context);
    expect(placements[0].blockId).toBe('getStarted');
    expect(placements.find((placement) => placement.blockId === 'planBasics')?.variant).toBe(
      'explainer',
    );
    expect(placements.find((placement) => placement.blockId === 'idCards')?.variant).toBe(
      'first-use',
    );
    const activity = placements.find((placement) => placement.blockId === 'recentActivity');
    expect(activity?.variant).toBe('empty');
    expect(placements.some((placement) => placement.blockId === 'deductibleSpotlight')).toBe(false);
  });

  it('leads with claims and follows them with a compact balance for an active filler', () => {
    expect(layoutFor('recent-claims').slice(0, 3)).toEqual([
      'recentActivity',
      'deductibleSpotlight',
      'idCards',
    ]);
    const placements = buildLayout(getScenario('recent-claims').context);
    expect(placements[0].variant).toBe('claims');
    expect(placements[1].variant).toBe('compact');
  });

  it('leads with the deductible spotlight and ways to save when the deductible is nearly met', () => {
    const placements = buildLayout(getScenario('near-deductible').context);
    expect(placements[0]).toMatchObject({ blockId: 'deductibleSpotlight', variant: 'spotlight' });
    expect(placements.map((placement) => placement.blockId)).toContain('savingsOpportunity');
    expect(placements.findIndex((placement) => placement.blockId === 'savingsOpportunity')).toBeLessThan(
      placements.findIndex((placement) => placement.blockId === 'benefitPrograms'),
    );
  });

  it('never repeats a block and always keeps every block from the page that ships today', () => {
    scenarios.forEach((scenario) => {
      const blockIds = buildLayout(scenario.context).map((placement) => placement.blockId);
      expect(new Set(blockIds).size).toBe(blockIds.length);
      baselineOrder.forEach((blockId) => expect(blockIds).toContain(blockId));
    });
  });

  it('marks blocks that are new, reshaped or re-ordered against the page that ships today', () => {
    const placements = buildLayout(getScenario('near-deductible').context);
    const badgeFor = (blockId: string) =>
      placements.find((placement) => placement.blockId === blockId)?.badge;

    expect(badgeFor('deductibleSpotlight')).toBe('new');
    expect(badgeFor('idCards')).toBe('up');
    expect(badgeFor('planBasics')).toBe('down');
    expect(badgeFor('helpfulResources')).toBeUndefined();
  });
});
