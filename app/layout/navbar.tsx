import { Bookmark, PenLine } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useAmour } from '~/components/amour/amour-context';
import { navItems } from './data/nav';
import { SoundscapeToggle } from '~/components/amour/soundscape-toggle';
import { ThemeToggle } from './theme-toggle';

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Navbar() {
  const { savedIds, setDrawerOpen } = useAmour();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <button type="button" onClick={() => scrollToId('#sec-hero')} className="pointer-events-auto flex cursor-pointer items-center gap-3 text-left">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amour-gold/45 bg-amour-crimson text-amour-gold shadow-glow ring-1 ring-white/45 dark:bg-amour-wine dark:ring-amour-gold/10"><PenLine className="h-4.5 w-4.5 stroke-[2.2]" /></span>
          <span><span className="font-heading block text-2xl font-bold leading-none tracking-widest text-foreground dark:text-white">AMOUR</span><span className="mt-1 block font-typewriter text-[8px] uppercase tracking-[0.28em] text-amour-gold">Anonymous Chronicles</span></span>
        </button>
        <nav className="glass-panel-light pointer-events-auto hidden items-center gap-1 rounded-full p-1.5 lg:flex">
          {navItems.map((item) => <button key={item.to} type="button" onClick={() => scrollToId(item.to)} className="cursor-pointer rounded-full px-4 py-2 font-typewriter text-[10px] uppercase tracking-widest text-muted-foreground transition hover:bg-amour-crimson/20 hover:text-foreground dark:hover:text-white">{item.label}</button>)}
        </nav>
        <div className="pointer-events-auto flex items-center gap-3">
          <SoundscapeToggle />
          <ThemeToggle />
          <Button type="button" variant="unstyled" size="unstyled" onClick={() => setDrawerOpen(true)} className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-foreground transition hover:border-amour-gold/50 dark:text-white"><Bookmark className="h-4 w-4 text-amour-gold" /><span className="hidden sm:inline">Sanctuary</span><span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amour-crimson px-1 text-[10px] text-white">{savedIds.length}</span></Button>
          <Button type="button" variant="unstyled" size="unstyled" onClick={() => scrollToId('#sec-scribe')} className="hidden rounded-full border border-amour-gold/30 bg-amour-crimson px-5 py-2 font-typewriter text-[10px] uppercase tracking-widest text-white shadow-glow transition hover:brightness-125 sm:flex"><PenLine className="h-3.5 w-3.5 text-amour-gold" />Whisper Story</Button>
        </div>
      </div>
    </header>
  );
}
