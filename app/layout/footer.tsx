import { Heart, PenLine } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-amour-border px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-amour-gold/45 bg-amour-crimson text-amour-gold shadow-glow ring-1 ring-white/45 dark:bg-amour-wine dark:ring-amour-gold/10"><PenLine className="h-4 w-4 stroke-[2.2]" /></span><h2 className="font-heading text-3xl tracking-widest">AMOUR</h2></div><p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">Anonymous love chronicles, missed connections, and midnight letters kept in a velvet archive.</p></div>
        <div><h3 className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold">Links</h3><div className="mt-3 grid gap-2 text-sm text-muted-foreground"><a href="#sec-roulette" className="hover:text-foreground dark:hover:text-white">Roulette</a><a href="#sec-anthology" className="hover:text-foreground dark:hover:text-white">Anthology</a><a href="#sec-scribe" className="hover:text-foreground dark:hover:text-white">Scribe</a></div></div>
        <div><h3 className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold">Contact</h3><div className="mt-3 space-y-2 text-sm text-muted-foreground"><p>letters@amour.archive</p><p>Midnight Desk, Paris</p><p className="flex items-center gap-1">Built by Rico <Heart className="animate-love-pulse h-4 w-4 fill-amour-crimson text-amour-crimson" /></p></div></div>
      </div>
    </footer>
  );
}
