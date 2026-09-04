import { ArrowDown, Feather, PenLine } from 'lucide-react';
import { letters, type LoveLetter } from '~/components/amour/data/letters';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { NumberTicker } from '~/components/ui/number-ticker';
import { heroContent, heroStats } from '../data/hero';

type HeroSectionProps = {
  displayStamps: (letter: LoveLetter) => number;
  onOpenLetter: (letter: LoveLetter) => void;
  onScrollTo: (id: string) => void;
};

export function HeroSection({ displayStamps, onOpenLetter, onScrollTo }: HeroSectionProps) {
  const featured = letters[2];

  return (
    <section
      id="sec-hero"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-14 pt-28 sm:px-6 lg:px-10"
    >
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-amour-crimson/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-amour-gold/10 blur-[120px]" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <div className="glass-panel-light inline-flex items-center gap-3 rounded-full px-4 py-1.5 font-typewriter text-[10px] uppercase tracking-[0.25em] text-amour-gold">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-amour-crimson" />
            {heroContent.eyebrow}
          </div>
          <h1 className="font-heading text-5xl leading-[0.95] tracking-tight text-foreground dark:text-white sm:text-7xl xl:text-8xl">
            {heroContent.headingStart} <br />
            <span className="bg-gradient-to-r from-amour-rose via-amour-champagne to-amour-gold bg-clip-text font-serif italic text-transparent">
              {heroContent.headingAccent}
            </span>
            <br />
            {heroContent.headingEnd}
          </h1>
          <p className="max-w-2xl font-cormorant text-xl italic leading-relaxed text-amour-rose/85 sm:text-2xl">
            {heroContent.description}
          </p>
          <div className="grid max-w-lg grid-cols-3 gap-4 border-y border-amour-border py-4">
            {heroStats.map((stat, index) => (
              <div key={stat.label}>
                <span className="block font-serif text-2xl font-bold leading-none text-foreground dark:text-white">
                  <NumberTicker value={stat.value} delay={index * 0.12} />
                </span>
                <span className="block pt-1 font-typewriter text-[9px] uppercase tracking-widest text-amour-gold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              type="button"
              onClick={() => onScrollTo('#sec-scribe')}
              className="rounded-full border border-amour-gold/40 bg-amour-crimson px-7 py-6 font-typewriter text-[10px] uppercase tracking-[0.2em] text-white shadow-glow hover:bg-amour-crimson/90"
            >
              <PenLine className="h-4 w-4 text-amour-gold" />
              {heroContent.primaryAction}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onScrollTo('#sec-anthology')}
              className="rounded-full border-amour-gold/20 bg-card/60 px-7 py-6 font-typewriter text-[10px] uppercase tracking-widest"
            >
              <ArrowDown className="h-4 w-4 text-amour-gold" />
              {heroContent.secondaryAction}
            </Button>
          </div>
        </div>
        <div className="lg:col-span-4">
          <Card className="glow-hover space-y-6 rounded-[2rem] border-2 border-amour-gold/35 bg-amour-velvet/80 p-7 shadow-glass dark:bg-amour-velvet/90">
            <div className="flex items-center justify-between border-b border-amour-border pb-4">
              <span className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold">
                {heroContent.featuredLabel}
              </span>
              <span className="font-cormorant text-xs italic text-amour-rose">
                {featured.location}
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold leading-snug text-foreground dark:text-white">
              "{featured.title}"
            </h3>
            <p className="line-clamp-4 font-cormorant text-sm italic leading-relaxed text-amour-rose/90">
              {featured.story}
            </p>
            <div className="flex items-center justify-between border-t border-amour-border pt-4 text-xs">
              <Button
                type="button"
                variant="unstyled"
                size="unstyled"
                onClick={() => onOpenLetter(featured)}
                className="font-typewriter text-[11px] uppercase tracking-wider text-amour-gold hover:text-foreground dark:hover:text-white"
              >
                <Feather className="h-3.5 w-3.5" />
                Unseal Letter
              </Button>
              <span className="text-muted-foreground">{displayStamps(featured)} Stamps</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
