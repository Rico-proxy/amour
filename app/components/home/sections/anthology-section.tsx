import { categories, type LoveLetter } from '~/components/amour/data/letters';
import { FlipLetterCard } from '~/components/amour/flip-letter-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { anthologyContent } from '../data/anthology';

type AnthologySectionProps = {
  category: (typeof categories)[number];
  letters: LoveLetter[];
  onCategoryChange: (category: (typeof categories)[number]) => void;
  onOpenLetter: (letter: LoveLetter) => void;
};

export function AnthologySection({
  category,
  letters,
  onCategoryChange,
  onOpenLetter,
}: AnthologySectionProps) {
  return (
    <section id="sec-anthology" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
      <div className="mb-8">
        <span className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-amour-gold">
          {anthologyContent.eyebrow}
        </span>
        <h2 className="mt-2 font-heading text-5xl text-foreground dark:text-white">
          {anthologyContent.title}
        </h2>
      </div>
      <Tabs value={category} onValueChange={(value) => onCategoryChange(value as typeof category)}>
        <TabsList>
          {categories.map((item) => (
            <TabsTrigger key={item} value={item}>
              {item}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={category}>
          <div className="flex gap-5 overflow-x-auto pb-5">
            {letters.map((letter) => (
              <FlipLetterCard key={letter.id} letter={letter} onOpen={onOpenLetter} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
