import { Heart, MapPin } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { CardBody, CardContainer, CardItem } from '~/components/ui/3d-card';
import type { LoveLetter } from './data/letters';

export function FlipLetterCard({
  letter,
  onOpen,
}: {
  letter: LoveLetter;
  onOpen: (letter: LoveLetter) => void;
}) {
  return (
    <CardContainer containerClassName="shrink-0 py-0" className="cursor-pointer">
      <CardBody className="glass-panel glow-hover flex h-[340px] w-[310px] flex-col justify-between rounded-[2rem] p-7 sm:w-[360px]">
        <div className="space-y-4">
          <CardItem translateZ={28} className="flex w-full items-center justify-between border-b border-amour-border pb-3">
            <span className="font-typewriter text-[9px] uppercase tracking-widest text-amour-gold">
              {letter.category}
            </span>
            <span className="font-cormorant text-xs italic text-amour-rose">
              {letter.date}
            </span>
          </CardItem>
          {letter.seekingReconnection ? (
            <CardItem translateZ={42} className="inline-flex rounded-full bg-amour-gold/15 px-3 py-1 font-typewriter text-[9px] uppercase tracking-widest text-amour-gold">
              Seeking Signal
            </CardItem>
          ) : null}
          <CardItem translateZ={56} as="h3" className="font-serif text-2xl font-bold leading-tight text-foreground dark:text-white">
            {letter.title}
          </CardItem>
          <CardItem translateZ={38} as="p" className="line-clamp-4 font-cormorant text-sm italic leading-relaxed text-amour-rose/90">
            "{letter.excerpt}"
          </CardItem>
          <CardItem translateZ={26} as="p" className="flex items-center gap-2 font-cormorant text-sm italic text-muted-foreground">
            <MapPin className="h-4 w-4 text-amour-gold" />
            {letter.location}
          </CardItem>
        </div>
        <CardItem translateZ={44} className="flex w-full items-center justify-between border-t border-amour-border pt-4">
          <span className="flex items-center gap-1 font-typewriter text-[11px] text-amour-gold">
            <Heart className="h-3.5 w-3.5 fill-amour-crimson text-amour-crimson" />
            {letter.stamps}
          </span>
          <Button
            type="button"
            variant="unstyled"
            size="unstyled"
            onClick={() => onOpen(letter)}
            className="rounded-full bg-amour-crimson px-4 py-2 text-xs font-semibold text-white"
          >
            Unseal Letter
          </Button>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
