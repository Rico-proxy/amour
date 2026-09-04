import { Bookmark, Heart, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { useAmour } from './amour-context';
import { letterDialogContent } from './data/letter-dialog';

export function LetterDialog() {
  const {
    selectedLetter: letter,
    closeLetter,
    isSaved,
    toggleSave,
    isStamped,
    toggleStamp,
    displayStamps,
    addComment,
  } = useAmour();
  const [commentDraft, setCommentDraft] = useState('');

  function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!letter) {
      return;
    }

    const comment = commentDraft.trim();
    if (!comment) {
      return;
    }

    addComment(letter.id, comment);
    setCommentDraft('');
  }

  return (
    <Dialog open={Boolean(letter)} onOpenChange={(open) => !open && closeLetter()}>
      {letter ? (
        <DialogContent
          onOpenAutoFocus={(event) => event.preventDefault()}
          className="!bg-amour-velvet/95 text-foreground dark:!bg-amour-velvet/95 sm:max-w-4xl"
        >
          <div className="space-y-5 sm:space-y-6">
            <div className="space-y-3 pr-10">
              <span className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold">
                {letter.category}
              </span>
              <DialogTitle className="break-words text-3xl leading-tight sm:text-4xl lg:text-5xl">
                {letter.title}
              </DialogTitle>
              <DialogDescription className="flex flex-wrap items-center gap-2 font-cormorant text-base italic text-amour-rose">
                <MapPin className="h-4 w-4 text-amour-gold" />
                {letter.location} - {letter.date}
              </DialogDescription>
            </div>
            <p className="break-words font-cormorant text-xl italic leading-relaxed text-foreground/90 dark:text-amour-champagne/90 sm:text-2xl">
              "{letter.story}"
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {letter.comments.map((comment) => (
                <div
                  key={comment}
                  className="rounded-2xl border border-amour-gold/25 bg-amour-wine/20 p-4 font-cormorant text-sm italic text-foreground/75 dark:text-amour-rose">
                  {comment}
                </div>
              ))}
            </div>
            <form className="flex gap-2 sm:gap-3" onSubmit={submitComment}>
              <Input
                value={commentDraft}
                onChange={(event) => setCommentDraft(event.target.value)}
                className="h-12 rounded-full border-amour-gold/25 bg-amour-deep/50 px-4 text-base shadow-sm md:text-sm"
                placeholder={letterDialogContent.commentPlaceholder}
              />
              <Button
                type="submit"
                size="icon"
                aria-label={letterDialogContent.addCommentLabel}
                className="h-12 w-12 shrink-0 rounded-full bg-amour-crimson text-white hover:bg-amour-crimson/90">
                <Send className="h-4 w-4 text-amour-gold" />
              </Button>
            </form>
            <div className="flex flex-col gap-3 border-t border-amour-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant="unstyled"
                size="unstyled"
                onClick={() => toggleStamp(letter.id)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-amour-gold/20 px-4 py-2 font-typewriter text-[11px] uppercase tracking-widest text-amour-gold transition hover:bg-amour-wine/30 sm:w-auto">
                <Heart
                  className={
                    'h-4 w-4 text-amour-crimson ' +
                    (isStamped(letter.id) ? 'fill-amour-crimson' : '')
                  }
                />
                {displayStamps(letter)} {letterDialogContent.stampsLabel}
              </Button>
              <Button
                type="button"
                onClick={() => toggleSave(letter.id)}
                className="w-full rounded-full bg-amour-crimson px-5 text-white hover:bg-amour-crimson/90 sm:w-auto">
                <Bookmark
                  className={isSaved(letter.id) ? 'fill-amour-gold text-amour-gold' : 'text-amour-gold'}
                />
                {isSaved(letter.id) ? letterDialogContent.savedLabel : letterDialogContent.saveLabel}
              </Button>
            </div>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
