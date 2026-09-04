import { Shuffle, Sparkles } from 'lucide-react';
import { type LoveLetter } from '~/components/amour/data/letters';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { rouletteContent, rouletteMoods } from '../data/roulette';

type RouletteSectionProps = {
  letter: LoveLetter;
  onOpenLetter: (letter: LoveLetter) => void;
  onSpin: (mood?: LoveLetter['mood']) => void;
};

export function RouletteSection({ letter, onOpenLetter, onSpin }: RouletteSectionProps) {
  return (
    <section
      id="sec-roulette"
      className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10"
    >
      <div className="space-y-4">
        <span className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-amour-gold">
          {rouletteContent.eyebrow}
        </span>
        <h2 className="font-heading text-5xl text-foreground dark:text-white">
          {rouletteContent.title}
        </h2>
        <p className="max-w-md font-cormorant text-xl italic text-amour-rose/85">
          {rouletteContent.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {rouletteMoods.map((mood) => (
            <Button
              key={mood}
              type="button"
              variant="outline"
              onClick={() => onSpin(mood)}
              className="rounded-full capitalize"
            >
              {mood}
            </Button>
          ))}
          <Button
            type="button"
            onClick={() => onSpin()}
            className="rounded-full bg-amour-crimson text-white hover:bg-amour-crimson/90"
          >
            <Shuffle className="h-4 w-4" />
            {rouletteContent.randomAction}
          </Button>
        </div>
      </div>
      <Card className="glow-hover relative overflow-hidden rounded-[2.5rem] border-2 border-amour-gold/25 bg-amour-velvet/80 p-8 shadow-glass dark:bg-amour-velvet/90">
        <Sparkles className="absolute right-8 top-8 h-20 w-20 text-amour-gold/10" />
        <div className="relative z-10 space-y-5">
          <span className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold">
            {letter.category}
          </span>
          <h3 className="font-serif text-4xl font-bold text-foreground dark:text-white">
            "{letter.title}"
          </h3>
          <p className="font-cormorant text-xl italic leading-relaxed text-amour-rose/90">
            {letter.story}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-amour-border pt-5">
            <span className="font-cormorant italic text-muted-foreground">{letter.location}</span>
            <Button
              type="button"
              onClick={() => onOpenLetter(letter)}
              className="rounded-full bg-amour-crimson text-white hover:bg-amour-crimson/90"
            >
              {rouletteContent.readAction}
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
