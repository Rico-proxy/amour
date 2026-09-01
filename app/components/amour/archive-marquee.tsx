import { Feather } from 'lucide-react';
import { Marquee } from '~/components/ui/marquee';
import { telegrams } from './data/letters';

export function ArchiveMarquee() {
  return (
    <div className="relative z-20 overflow-hidden border-y border-amour-gold/20 bg-amour-wine/40 py-3.5 backdrop-blur-md">
      <Marquee pauseOnHover repeat={2} className="[--duration:35s] [--gap:3rem] p-0 font-cormorant text-sm italic text-amour-champagne">
        {telegrams.map((item) => (
          <span key={item} className="flex items-center gap-2 whitespace-nowrap">
            <Feather className="h-3.5 w-3.5 shrink-0 text-amour-gold" />
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
