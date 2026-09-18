import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import { House, Link2, Plus, Shield } from 'lucide-react';

function StatusBar() {
  return (
    <div className="phone__status" aria-hidden="true">
      <span className="phone__time">9:41</span>
      <span className="phone__indicators">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor">
          <path d="M1 3.6a10 10 0 0 1 14 0" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M3.6 6.3a6.4 6.4 0 0 1 8.8 0" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="8" cy="9.4" r="1.3" fill="currentColor" stroke="none" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect
            x="0.6"
            y="0.6"
            width="21"
            height="10.8"
            rx="3"
            stroke="currentColor"
            strokeOpacity="0.5"
          />
          <rect x="2.2" y="2.2" width="17.8" height="7.6" rx="2" fill="currentColor" />
          <path
            d="M23 4.2v3.6a2 2 0 0 0 0-3.6Z"
            fill="currentColor"
            fillOpacity="0.5"
          />
        </svg>
      </span>
    </div>
  );
}

const tabs = [
  { id: 'home', label: 'Home', Icon: House },
  { id: 'benefits', label: 'Benefits', Icon: Shield },
  { id: 'find-care', label: 'Find care', Icon: Plus },
  { id: 'medications', label: 'Medications', Icon: Link2 },
];

function TabBar() {
  return (
    <nav className="phone__tabs" aria-label="App sections (not interactive in this prototype)">
      {tabs.map(({ id, label, Icon }) => {
        const active = id === 'benefits';
        return (
          <span key={id} className={`phone__tab${active ? ' phone__tab--active' : ''}`}>
            <Icon size={21} strokeWidth={active ? 2.4 : 1.8} />
            {label}
          </span>
        );
      })}
    </nav>
  );
}

type PhoneFrameProps = {
  children: ReactNode;
  scrollKey: string;
};

/** 390pt device frame; all screen scrolling is contained inside the frame. */
export const PhoneFrame = forwardRef<HTMLDivElement, PhoneFrameProps>(function PhoneFrame(
  { children, scrollKey },
  ref,
) {
  return (
    <div className="phone">
      <div className="phone__screen">
        <StatusBar />
        <div className="phone__scroll" ref={ref} key={scrollKey} tabIndex={-1}>
          {children}
        </div>
        <TabBar />
      </div>
    </div>
  );
});
