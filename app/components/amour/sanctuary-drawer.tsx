import { Bookmark } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '~/components/ui/sheet';
import { useAmour } from './amour-context';

export function SanctuaryDrawer() {
  const { drawerOpen, setDrawerOpen, savedLetters, toggleSave, openLetter } = useAmour();

  return (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent>
        <div className="space-y-1 pr-10">
          <SheetTitle>Velvet Sanctuary</SheetTitle>
          <SheetDescription>Letters you saved for later reading.</SheetDescription>
        </div>
        <div className="mt-8 flex-1 space-y-4 overflow-y-auto">
          {savedLetters.length ? (
            savedLetters.map((letter) => (
              <article key={letter.id} className="glass-panel space-y-3 rounded-3xl border-2 border-amour-gold/20 p-5">
                <button
                  type="button"
                  onClick={() => openLetter(letter)}
                  className="block w-full cursor-pointer space-y-2 text-left">
                  <span className="font-typewriter text-[9px] uppercase tracking-widest text-amour-gold">
                    {letter.category}
                  </span>
                  <h3 className="break-words font-serif text-xl font-bold text-foreground transition hover:text-amour-rose dark:text-white">
                    {letter.title}
                  </h3>
                  <p className="line-clamp-3 font-cormorant text-sm italic text-muted-foreground">
                    {letter.excerpt}
                  </p>
                </button>
                <Button
                  type="button"
                  variant="unstyled"
                  size="unstyled"
                  onClick={() => toggleSave(letter.id)}
                  className="text-xs font-bold text-amour-rose hover:text-amour-gold">
                  <Bookmark className="h-3.5 w-3.5 fill-amour-gold text-amour-gold" />
                  Remove
                </Button>
              </article>
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-amour-gold/25 p-8 text-center">
              <p className="font-cormorant italic text-muted-foreground">Your sanctuary is empty.</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
