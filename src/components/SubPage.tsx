import type { ReactNode } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';

export function MemberSelect({ firstName }: { firstName: string }) {
  return (
    <span className="select">
      Member: {firstName}
      <ChevronDown size={15} aria-hidden="true" />
    </span>
  );
}

export function SubPage({
  title,
  onBack,
  children,
}: {
  title: string;
  onBack: () => void;
  children: ReactNode;
}) {
  return (
    <div className="screen screen--subpage">
      <div className="subpage__head">
        <button type="button" className="subpage__back" onClick={onBack} aria-label="Back">
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <h1 className="subpage__title">{title}</h1>
      </div>
      {children}
    </div>
  );
}
