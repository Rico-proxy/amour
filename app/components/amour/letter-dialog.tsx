import { Bookmark, Heart, MapPin } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '~/components/ui/dialog';
import { useAmour } from './amour-context';

export function LetterDialog() {
  const {
    selectedLetter: letter,
    closeLetter,
    isSaved,
    toggleSave,
    isStamped,
    toggleStamp,
    displayStamps,
  } = useAmour();

  return (
    <Dialog open={Boolean(letter)} onOpenChange={(open) => !open && closeLetter()}>
      {letter ? (
        <DialogContent>
          <div className="space-y-6">
            <div className="space-y-3 pr-10">
              <span className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold">
                {letter.category}
              </span>
              <DialogTitle className="break-words text-4xl">{letter.title}</DialogTitle>
              <DialogDescription className="flex flex-wrap items-center gap-2 font-cormorant text-base italic text-amour-rose">
                <MapPin className="h-4 w-4 text-amour-gold" />
                {letter.location} - {letter.date}
              </DialogDescription>
            </div>
            <p className="break-words font-cormorant text-xl italic leading-relaxed text-amour-champagne/90">
              “{letter.story}”
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {letter.comments.map((comment) => (
                <div
                  key={comment}
                  className="rounded-2xl border border-amour-gold/15 bg-amour-wine/20 p-4 font-cormorant text-sm italic text-muted-foreground">
                  {comment}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-amour-border pt-5">
              <Button
                type="button"
                variant="unstyled"
                size="unstyled"
                onClick={() => toggleStamp(letter.id)}
                className="flex items-center gap-2 rounded-full border border-amour-gold/20 px-4 py-2 font-typewriter text-[11px] uppercase tracking-widest text-amour-gold transition hover:bg-amour-wine/30">
                <Heart
                  className={
                    'h-4 w-4 text-amour-crimson ' +
                    (isStamped(letter.id) ? 'fill-amour-crimson' : '')
                  }
                />
                {displayStamps(letter)} Stamps
              </Button>
              <Button
                type="button"
                onClick={() => toggleSave(letter.id)}
                className="rounded-full bg-amour-crimson px-5 text-white hover:bg-amour-crimson/90">
                <Bookmark
                  className={isSaved(letter.id) ? 'fill-amour-gold text-amour-gold' : 'text-amour-gold'}
                />
                {isSaved(letter.id) ? 'Saved in Sanctuary' : 'Save to Sanctuary'}
              </Button>
            </div>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
