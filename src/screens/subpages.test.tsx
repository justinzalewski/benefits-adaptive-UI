import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { App } from './../App';

const phone = () => within(document.querySelector('.phone') as HTMLElement);

const openFromCard = (cardName: RegExp) => {
  fireEvent.click(phone().getByRole('button', { name: cardName }));
};

const selectScenario = (name: RegExp) => {
  fireEvent.click(screen.getByRole('radio', { name }));
};

describe('sub-pages', () => {
  it('shows the plan stages and the included-with-benefits panels', () => {
    render(<App />);
    openFromCard(/how your plan works/i);

    expect(phone().getByText('Deductible')).toBeDefined();
    expect(phone().getByText('Out-of-pocket maximum')).toBeDefined();
    expect(phone().getByText(/in progress/i)).toBeDefined();
    expect(phone().getByRole('button', { name: /access to 24\/7 pharmacist/i })).toBeDefined();
  });

  it('shows plan balances that follow the selected member context', () => {
    render(<App />);
    selectScenario(/almost met deductible/i);
    openFromCard(/see all plan balances/i);

    expect(phone().getByText('$240.00 remaining')).toBeDefined();
    expect(phone().getByText(/\$1,260\.00 applied to \$1,500\.00/)).toBeDefined();
    expect(phone().getAllByRole('button', { name: /show me the math/i }).length).toBeGreaterThan(0);
  });

  it('groups recent activity by month and filters by type', () => {
    render(<App />);
    selectScenario(/prior auth needs attention/i);
    openFromCard(/manage recent activity/i);

    expect(phone().getByText('JUNE 2026')).toBeDefined();
    expect(phone().getByText('Ubrelvy 50 mg')).toBeDefined();

    fireEvent.click(phone().getByRole('button', { name: /all prior authorizations/i }));
    expect(phone().queryByText('Ubrelvy 50 mg')).toBeNull();
    expect(phone().getByText('Celexa 20 mg')).toBeDefined();
  });

  it('shows an empty activity page for a member with no claims', () => {
    render(<App />);
    selectScenario(/first-time member/i);
    openFromCard(/no claims yet/i);

    expect(phone().getByText(/nothing here yet/i)).toBeDefined();
    expect(phone().getByText(/within about three days/i)).toBeDefined();
  });

  it('filters benefit programs by category', () => {
    render(<App />);
    openFromCard(/view all benefit programs/i);

    expect(phone().getByText('Foodsmart')).toBeDefined();
    fireEvent.click(phone().getByRole('button', { name: /^Money$/ }));
    expect(phone().queryByText('Foodsmart')).toBeNull();
    expect(phone().getByText('Empower')).toBeDefined();
  });
});
