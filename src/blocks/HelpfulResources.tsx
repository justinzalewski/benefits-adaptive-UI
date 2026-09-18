import { HelpCircle, PlayCircle } from 'lucide-react';
import { SectionHead, useCarousel } from '../components/primitives';
import { helpfulResources } from '../data/plan';

const artwork = {
  videos: PlayCircle,
  faq: HelpCircle,
} as const;

export function HelpfulResources() {
  const { trackRef, nav } = useCarousel('helpful resources');

  return (
    <>
      <SectionHead title="Helpful resources" action={nav} />
      <div className="carousel" ref={trackRef}>
        {helpfulResources.map((resource) => {
          const Art = artwork[resource.id as keyof typeof artwork];
          return (
            <button
              key={resource.id}
              type="button"
              className="resource"
              style={{ background: resource.tint }}
            >
              <span className="resource__text">
                <span className="resource__title">{resource.title}</span>
                <span className="resource__desc">{resource.description}</span>
              </span>
              <Art size={54} className="resource__art" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </>
  );
}
