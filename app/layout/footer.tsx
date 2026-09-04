import { Heart, PenLine } from 'lucide-react';
import { footerBrand, footerContact, footerLinkGroup } from './data/footer';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-amour-border px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amour-gold/45 bg-amour-crimson text-amour-gold shadow-glow ring-1 ring-white/45 dark:bg-amour-wine dark:ring-amour-gold/10">
              <PenLine className="h-4 w-4 stroke-[2.2]" />
            </span>
            <h2 className="font-heading text-3xl tracking-widest">{footerBrand.name}</h2>
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {footerBrand.description}
          </p>
        </div>
        <div>
          <h3 className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold">
            {footerLinkGroup.title}
          </h3>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            {footerLinkGroup.links.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-foreground dark:hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold">
            {footerContact.title}
          </h3>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            {footerContact.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="flex items-center gap-1">
              {footerContact.credit}
              <Heart className="animate-love-pulse h-4 w-4 fill-amour-crimson text-amour-crimson" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
