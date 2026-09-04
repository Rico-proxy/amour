import { MapPin } from 'lucide-react';
import { type LoveLetter } from '~/components/amour/data/letters';
import { Button } from '~/components/ui/button';
import { skyMapContent, skyMapPositions } from '../data/sky-map';

type SkyMapSectionProps = {
  letters: LoveLetter[];
  onOpenLetter: (letter: LoveLetter) => void;
};

const skyButtonClass = (letter: LoveLetter) =>
  'h-3.5 w-3.5 rounded-full shadow-lg ' +
  (letter.seekingReconnection ? 'bg-amour-crimson' : 'bg-amour-gold');

export function SkyMapSection({ letters, onOpenLetter }: SkyMapSectionProps) {
  return (
    <section id="sec-sky" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
      <div className="glass-panel relative overflow-hidden rounded-[2.5rem] border-2 border-amour-gold/25 p-6 shadow-glass sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <span className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-amour-gold">
            {skyMapContent.eyebrow}
          </span>
          <h2 className="mt-2 font-heading text-5xl text-foreground dark:text-white">
            {skyMapContent.title}
          </h2>
          <p className="mt-4 font-cormorant text-xl italic text-amour-rose/85">
            {skyMapContent.description}
          </p>
        </div>

        <div className="relative mt-10 min-h-[300px] overflow-visible rounded-[2rem] border border-amour-gold/10 bg-amour-deep/35 sm:min-h-[360px]">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full text-amour-gold/25"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M14 72 C28 42 43 34 58 53 S82 52 88 23"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.28"
              strokeDasharray="1.3 1.4"
            />
            <path
              d="M22 22 C42 30 48 69 70 64 S89 68 83 86"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.22"
              strokeDasharray="1.1 1.3"
            />
          </svg>
          {letters.map((letter, index) => (
            <Button
              key={letter.id}
              type="button"
              variant="unstyled"
              size="unstyled"
              onClick={() => onOpenLetter(letter)}
              style={skyMapPositions[index % skyMapPositions.length]}
              className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amour-gold/25 bg-amour-gold/20 shadow-glow transition group-hover:scale-125">
                <span className={skyButtonClass(letter)} />
              </span>
              <span className="pointer-events-none absolute left-1/2 top-12 z-30 hidden w-64 -translate-x-1/2 rounded-2xl border border-amour-gold/25 bg-amour-velvet/95 p-4 text-left shadow-glass group-hover:block">
                <span className="font-typewriter text-[9px] uppercase tracking-widest text-amour-gold">
                  {letter.category}
                </span>
                <span className="mt-1 block break-words font-serif text-sm font-bold text-foreground dark:text-white">
                  {letter.title}
                </span>
                <span className="mt-1 flex items-center gap-1 text-[10px] text-amour-rose">
                  <MapPin className="h-3 w-3" />
                  {letter.location}
                </span>
              </span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
