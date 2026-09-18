import { CheckCircle2, ChevronRight, Circle } from 'lucide-react';
import { Reveal, SectionHead } from '../components/primitives';
import type { BlockProps, Route } from './types';

type Step = {
  id: string;
  title: string;
  helper: string;
  done: boolean;
  route?: Route;
};

/** Replaces balances-first content while a member has no history to read. */
export function GetStarted({ ctx, navigate }: BlockProps) {
  const steps: Step[] = [
    {
      id: 'card',
      title: 'Save your pharmacy ID card',
      helper: 'You will need it for your first fill',
      done: true,
    },
    {
      id: 'plan',
      title: 'See what you will pay',
      helper: 'Your deductible, then copays',
      done: false,
      route: 'plan',
    },
    {
      id: 'delivery',
      title: 'Choose retail or home delivery',
      helper: 'Home delivery takes 3 to 5 days',
      done: false,
      route: 'plan',
    },
  ];

  const nextStep = steps.find((step) => !step.done);
  const remainingSteps = steps.filter((step) => !step.done).length;

  return (
    <>
      <SectionHead
        title={`Welcome, ${ctx.firstName}`}
        note={`${remainingSteps} steps left to be ready for your first prescription`}
      />
      <ol className="steps">
        {steps.map((step) => (
          <li key={step.id}>
            <button
              type="button"
              className="steps__row"
              onClick={() => step.route && navigate(step.route)}
            >
              <span className={`steps__mark${step.done ? ' steps__mark--done' : ''}`}>
                {step.done ? (
                  <CheckCircle2 size={20} aria-hidden="true" />
                ) : (
                  <Circle size={20} aria-hidden="true" />
                )}
              </span>
              <span className="steps__text">
                <span className="steps__title">{step.title}</span>
                {step.id === nextStep?.id ? (
                  <span className="steps__helper">{step.helper}</span>
                ) : null}
              </span>
              <ChevronRight size={18} className="card__chevron" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ol>
      <Reveal label="Do I have to do this now?" openLabel="Got it">
        <p className="steps__foot">
          No. Your coverage is already active, and skipping a step will not delay it. The whole list
          takes about five minutes whenever you are ready.
        </p>
      </Reveal>
    </>
  );
}
