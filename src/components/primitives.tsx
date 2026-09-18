import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

type CardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  label?: string;
};

export function Card({ children, className = '', onClick, label }: CardProps) {
  if (onClick) {
    return (
      <button
        type="button"
        className={`card card--tap ${className}`}
        onClick={onClick}
        aria-label={label}
      >
        {children}
      </button>
    );
  }
  return <div className={`card ${className}`}>{children}</div>;
}

export function SectionHead({
  title,
  note,
  action,
  id,
}: {
  title: string;
  note?: string;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div className="section-head">
      <div>
        <h2 className="section-head__title" id={id}>
          {title}
        </h2>
        {note ? <p className="section-head__note">{note}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function IconTile({ children, plain = false }: { children: ReactNode; plain?: boolean }) {
  return <span className={`icon-tile${plain ? ' icon-tile--plain' : ''}`}>{children}</span>;
}

export function Progress({ percent, label }: { percent: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div
      className="progress"
      role="img"
      aria-label={`${label}: ${Math.round(clamped)} percent used`}
    >
      <div className="progress__fill" style={{ width: `${clamped}%` }} />
    </div>
  );
}

export type StatusTone = 'approved' | 'pending' | 'denied' | 'muted';

export function StatusRow({ tone, children }: { tone: StatusTone; children: ReactNode }) {
  const toneClass = tone === 'approved' ? '' : ` status-dot--${tone}`;
  return (
    <p className="status-row">
      <span className={`status-dot${toneClass}`} aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

/**
 * Horizontally scrolling row paired with the arrow buttons that sit in the section
 * header on the Benefits page. Returns the track ref plus a ready-made nav control.
 */
export function useCarousel(label: string, step = 240) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const nav = (
    <div className="carousel-nav">
      <button
        type="button"
        className="carousel-nav__btn"
        onClick={() => scrollBy(-1)}
        aria-label={`Scroll ${label} backward`}
      >
        <ChevronLeft size={16} />
      </button>
      <button
        type="button"
        className="carousel-nav__btn"
        onClick={() => scrollBy(1)}
        aria-label={`Scroll ${label} forward`}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );

  return { trackRef, nav };
}

/**
 * Inline progressive disclosure. Keeps the detail a member may want one tap away
 * instead of pushing the rest of the page down for everyone.
 */
export function Reveal({
  label,
  children,
  openLabel,
}: {
  label: string;
  children: ReactNode;
  openLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="reveal">
      <button
        type="button"
        className="reveal__trigger"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? openLabel ?? label : label}
        <ChevronDown size={15} className={open ? 'rotated' : ''} aria-hidden="true" />
      </button>
      {open ? <div className="reveal__body">{children}</div> : null}
    </div>
  );
}

export type DonutSegment = { label: string; value: number; color: string };

/** Ring chart used on Track plan balances, with the remaining amount stacked in the middle. */
export function Donut({
  segments,
  centerAmount,
  centerLabel,
  size = 108,
}: {
  segments: DonutSegment[];
  centerAmount: string;
  centerLabel: string;
  size?: number;
}) {
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1;
  let offset = 0;

  return (
    <div className="donut" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="presentation">
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {segments.map((segment) => {
            const length = (segment.value / total) * circumference;
            const dash = `${length} ${circumference - length}`;
            const node = (
              <circle
                key={segment.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={stroke}
                strokeDasharray={dash}
                strokeDashoffset={-offset}
              />
            );
            offset += length;
            return node;
          })}
        </g>
      </svg>
      <span className="donut__center">
        <strong className="donut__amount">{centerAmount}</strong>
        <span className="donut__label">{centerLabel}</span>
      </span>
    </div>
  );
}

export function Legend({ items }: { items: DonutSegment[] }) {
  return (
    <ul className="legend">
      {items.map((item) => (
        <li key={item.label}>
          <span className="legend__dot" style={{ background: item.color }} aria-hidden="true" />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

/** Text stand-in for a partner logo; the prototype does not ship brand art. */
export function Wordmark({ brand }: { brand: { name: string; color: string; dot?: boolean } }) {
  return (
    <span className="wordmark" style={{ color: brand.color }}>
      {brand.dot ? (
        <span className="wordmark__dot" style={{ background: brand.color }} aria-hidden="true" />
      ) : null}
      {brand.name}
    </span>
  );
}
