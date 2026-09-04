import { PenLine, Send } from 'lucide-react';
import type { FormEvent } from 'react';
import { categories, type LoveLetter } from '~/components/amour/data/letters';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Textarea } from '~/components/ui/textarea';
import { scribeContent, scribeFields } from '../data/scribe';

type ScribeSectionProps = {
  body: string;
  formMessage: string;
  location: string;
  scribeCategories: Exclude<(typeof categories)[number], 'All'>[];
  scribeCategory: Exclude<(typeof categories)[number], 'All'>;
  seekingReconnection: boolean;
  title: string;
  onBodyChange: (body: string) => void;
  onCategoryChange: (category: Exclude<(typeof categories)[number], 'All'>) => void;
  onLocationChange: (location: string) => void;
  onSeekingReconnectionChange: (seeking: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onTitleChange: (title: string) => void;
};

export function ScribeSection({
  body,
  formMessage,
  location,
  scribeCategories,
  scribeCategory,
  seekingReconnection,
  title,
  onBodyChange,
  onCategoryChange,
  onLocationChange,
  onSeekingReconnectionChange,
  onSubmit,
  onTitleChange,
}: ScribeSectionProps) {
  return (
    <section
      id="sec-scribe"
      className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-10"
    >
      <div className="lg:col-span-2">
        <span className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-amour-gold">
          {scribeContent.eyebrow}
        </span>
        <h2 className="mt-2 font-heading text-5xl text-foreground dark:text-white">
          {scribeContent.title}
        </h2>
        <p className="mt-4 max-w-lg font-cormorant text-xl italic text-amour-rose/85">
          {scribeContent.description}
        </p>
      </div>
      <Card className="border-2 border-amour-gold/20 bg-amour-velvet/75 p-6 shadow-glass dark:bg-amour-velvet/85">
        <form className="grid gap-5" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <Label
              htmlFor="letter-category"
              className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold"
            >
              {scribeFields.category.label}
            </Label>
            <Select value={scribeCategory} onValueChange={(value) => onCategoryChange(value as LoveLetter['category'])}>
              <SelectTrigger
                id="letter-category"
                className="h-12 w-full rounded-2xl border-amour-gold/25 bg-amour-deep/40 px-4 text-xs"
              >
                <SelectValue placeholder={scribeFields.category.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {scribeCategories.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="letter-location"
              className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold"
            >
              {scribeFields.location.label}
            </Label>
            <Input
              id="letter-location"
              value={location}
              onChange={(event) => onLocationChange(event.target.value)}
              className="h-12 rounded-2xl border-amour-gold/25 bg-amour-deep/40 px-4 text-xs"
              placeholder={scribeFields.location.placeholder}
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="letter-title"
              className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold"
            >
              {scribeFields.title.label}
            </Label>
            <Input
              id="letter-title"
              value={title}
              onChange={(event) => onTitleChange(event.target.value)}
              className="h-14 rounded-2xl border-amour-gold/25 bg-transparent px-4 font-serif text-2xl font-bold"
              placeholder={scribeFields.title.placeholder}
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="letter-body"
              className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold"
            >
              {scribeFields.body.label}
            </Label>
            <Textarea
              id="letter-body"
              value={body}
              onChange={(event) => onBodyChange(event.target.value)}
              rows={7}
              className="min-h-44 resize-none rounded-2xl border-amour-gold/25 bg-transparent px-4 py-3 font-cormorant text-lg italic"
              placeholder={scribeFields.body.placeholder}
            />
          </div>
          <Label
            htmlFor="letter-seeking"
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-amour-gold/20 bg-amour-wine/20 p-4 font-cormorant text-sm italic text-amour-rose"
          >
            <Checkbox
              id="letter-seeking"
              checked={seekingReconnection}
              onCheckedChange={(checked) => onSeekingReconnectionChange(Boolean(checked))}
            />
            {scribeContent.seekingLabel}
          </Label>
          {formMessage ? (
            <p className="font-cormorant text-sm italic text-amour-gold">{formMessage}</p>
          ) : null}
          <Button
            type="submit"
            className="rounded-full bg-amour-crimson py-6 text-white hover:bg-amour-crimson/90"
          >
            <Send className="h-4 w-4 text-amour-gold" />
            {scribeContent.submitAction}
          </Button>
        </form>
      </Card>
      <Card className="border-2 border-amour-gold/20 bg-amour-velvet/75 p-7 shadow-glass dark:bg-amour-velvet/85">
        <span className="mb-4 flex items-center gap-2 font-typewriter text-[10px] uppercase tracking-widest text-amour-gold">
          <PenLine className="h-4 w-4" />
          {scribeContent.previewLabel}
        </span>
        <span className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold">
          {scribeCategory}
        </span>
        <h3 className="mt-2 font-serif text-3xl font-bold text-foreground dark:text-white">
          {title || 'Untitled Chronicle'}
        </h3>
        <p className="mt-2 font-cormorant italic text-amour-rose">
          {location || 'Somewhere, sometime'}
        </p>
        <p className="mt-5 font-cormorant text-xl italic leading-relaxed text-amour-champagne/90">
          "{body || 'Your letter preview will appear here.'}"
        </p>
        {seekingReconnection ? (
          <span className="mt-5 inline-flex rounded-full bg-amour-gold/15 px-3 py-1 font-typewriter text-[9px] uppercase tracking-widest text-amour-gold">
            {scribeContent.seekingPreviewLabel}
          </span>
        ) : null}
      </Card>
    </section>
  );
}
