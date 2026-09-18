import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { App } from './App';
import { scenarios } from './adaptive/scenarios';

const selectScenario = (name: string) => {
  fireEvent.click(screen.getByRole('radio', { name: new RegExp(name, 'i') }));
};

const leadingSection = () =>
  document.querySelector('.screen section')?.getAttribute('aria-label');

/** The rail repeats copy from the screen, so in-phone assertions are scoped to the device. */
const phone = () => within(document.querySelector('.phone') as HTMLElement);

describe('App', () => {
  it('renders every scenario without blowing up, keeping the heading in place', () => {
    scenarios.forEach((scenario) => {
      const { unmount } = render(<App />);
      selectScenario(scenario.name);
      expect(screen.getByRole('heading', { level: 1, name: 'Benefits' })).toBeDefined();
      unmount();
    });
  });

  it('keeps the scenario controls outside the phone frame', () => {
    render(<App />);
    const controls = screen.getByRole('complementary', { name: /prototype controls/i });
    expect(within(controls).getAllByRole('radio')).toHaveLength(scenarios.length);
    expect(controls.closest('.phone')).toBeNull();
  });

  it('swaps the leading section when the member context changes', () => {
    render(<App />);
    expect(leadingSection()).toBe('planBasics');

    selectScenario('Prior auth needs attention');
    expect(leadingSection()).toBe('actionNeeded');
    expect(phone().getByText(/request was denied/i)).toBeDefined();

    selectScenario('Almost met deductible');
    expect(leadingSection()).toBe('deductibleSpotlight');
    expect(phone().getByText(/before your plan starts sharing costs/i)).toBeDefined();

    selectScenario('First-time member');
    expect(leadingSection()).toBe('getStarted');
    expect(phone().getByText(/no claims yet/i)).toBeDefined();
  });

  it('opens a sub-page from a card and comes back', () => {
    render(<App />);
    fireEvent.click(phone().getByRole('button', { name: /how your plan works/i }));
    expect(phone().getByRole('heading', { level: 1, name: /how your plan works/i })).toBeDefined();

    fireEvent.click(phone().getByRole('button', { name: /^back$/i }));
    expect(phone().getByRole('heading', { level: 1, name: 'Benefits' })).toBeDefined();
  });

  it('previews claims as compact rows, leaving the per-claim detail on the sub-page', () => {
    render(<App />);
    selectScenario('Has recent claims');

    expect(document.querySelectorAll('.claims__row')).toHaveLength(3);
    expect(phone().queryByText(/applied to deductible/i)).toBeNull();
    expect(phone().getByRole('button', { name: /view all 4/i })).toBeDefined();
  });

  it('keeps the deductible detail behind a disclosure', () => {
    render(<App />);
    selectScenario('Almost met deductible');

    expect(phone().queryByText(/resets on January 1/i)).toBeNull();
    fireEvent.click(phone().getByRole('button', { name: /what changes when you meet it/i }));
    expect(phone().getByText(/resets on January 1/i)).toBeDefined();
  });

  it('shows helper text only on the next setup step for a first-time member', () => {
    render(<App />);
    selectScenario('First-time member');

    expect(phone().getByText(/your deductible, then copays/i)).toBeDefined();
    expect(phone().queryByText(/you will need it for your first fill/i)).toBeNull();

    expect(phone().queryByText(/skipping a step will not delay/i)).toBeNull();
    fireEvent.click(phone().getByRole('button', { name: /do i have to do this now/i }));
    expect(phone().getByText(/skipping a step will not delay/i)).toBeDefined();
  });

  it('shows in-screen review badges only when the annotation toggle is on', () => {
    render(<App />);
    selectScenario('Has recent claims');
    expect(phone().queryByText('Moved up')).toBeNull();

    fireEvent.click(screen.getByRole('checkbox', { name: /label what moved/i }));
    expect(phone().getAllByText('Moved up').length).toBeGreaterThan(0);
  });
});
