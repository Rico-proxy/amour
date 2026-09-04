import { Send } from 'lucide-react';
import { Card } from '~/components/ui/card';
import { telegrams, telegramsContent } from '../data/telegrams';

export function TelegramsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <span className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-amour-gold">
            {telegramsContent.eyebrow}
          </span>
          <h2 className="mt-2 font-heading text-5xl text-foreground dark:text-white">
            {telegramsContent.title}
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {telegrams.slice(0, 4).map((telegram) => (
            <Card
              key={telegram}
              className="glow-hover border-2 border-amour-gold/20 bg-amour-velvet/75 p-5 shadow-glass dark:bg-amour-velvet/85"
            >
              <Send className="mb-4 h-4 w-4 text-amour-gold" />
              <p className="font-cormorant text-lg italic text-amour-rose/90">"{telegram}"</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
