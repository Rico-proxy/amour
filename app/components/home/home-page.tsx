import {
  ArrowDown,
  Feather,
  MapPin,
  PenLine,
  Send,
  Shuffle,
  Sparkles,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { AmbientCanvas } from '~/components/ui/ambient-canvas';
import { ArchiveMarquee } from '~/components/amour/archive-marquee';
import { FlipLetterCard } from '~/components/amour/flip-letter-card';
import { useAmour } from '~/components/amour/amour-context';
import {
  categories,
  letters,
  telegrams,
  type LoveLetter,
} from '~/components/amour/data/letters';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import { NumberTicker } from '~/components/ui/number-ticker';
import { Label } from '~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Textarea } from '~/components/ui/textarea';

const scribeCategories = categories.filter(
  (category): category is Exclude<(typeof categories)[number], 'All'> =>
    category !== 'All'
);

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function HomePage() {
  const { archiveLetters, addLetter, openLetter, displayStamps } = useAmour();
  const [rouletteLetter, setRouletteLetter] = useState(letters[0]);
  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const [scribeCategory, setScribeCategory] =
    useState<(typeof scribeCategories)[number]>('First Encounters');
  const [title, setTitle] = useState('Midnight Umbrella on Rue Cler');
  const [location, setLocation] = useState('Paris, 00:12');
  const [body, setBody] = useState(
    'Write the secret you never sent. Keep it anonymous, tender, and true enough to glow.'
  );
  const [seekingReconnection, setSeekingReconnection] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  const filteredLetters = useMemo(
    () =>
      category === 'All'
        ? archiveLetters
        : archiveLetters.filter((letter) => letter.category === category),
    [archiveLetters, category]
  );
  const featured = letters[2];
  const heroStats = [
    { value: 14892, label: 'Letters Archived' },
    { value: 98, label: 'Countries' },
    { value: 1204, label: 'Reconnections' },
  ];

  function spin(mood?: LoveLetter['mood']) {
    const pool = mood ? archiveLetters.filter((letter) => letter.mood === mood) : archiveLetters;
    setRouletteLetter(pool[Math.floor(Math.random() * pool.length)] ?? letters[0]);
  }

  function sealLetter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanTitle = title.trim();
    const cleanLocation = location.trim();
    const cleanBody = body.trim();

    if (!cleanTitle || !cleanLocation || !cleanBody) {
      setFormMessage('Please complete the title, location, and letter before sealing it.');
      return;
    }

    const newLetter: LoveLetter = {
      id: Date.now(),
      title: cleanTitle,
      category: scribeCategory,
      location: cleanLocation,
      excerpt: cleanBody.length > 115 ? cleanBody.slice(0, 115) + '...' : cleanBody,
      story: cleanBody,
      stamps: 1,
      date: 'Just Now',
      seekingReconnection,
      mood: seekingReconnection ? 'electric' : 'tender',
      comments: [],
    };

    addLetter(newLetter);
    setRouletteLetter(newLetter);
    openLetter(newLetter);
    setCategory('All');
    setTitle('');
    setLocation('');
    setBody('');
    setSeekingReconnection(false);
    setFormMessage('Your anonymous letter has been sealed into the archive.');
  }

  const skyButtonClass = (letter: LoveLetter) =>
    'h-3.5 w-3.5 rounded-full shadow-lg ' +
    (letter.seekingReconnection ? 'bg-amour-crimson' : 'bg-amour-gold');

  return (
    <>
      <AmbientCanvas />
      <section
        id="sec-hero"
        className="relative flex min-h-screen items-center overflow-hidden px-4 pb-14 pt-28 sm:px-6 lg:px-10">
        <div className="pointer-events-none absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-amour-crimson/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-amour-gold/10 blur-[120px]" />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <div className="glass-panel-light inline-flex items-center gap-3 rounded-full px-4 py-1.5 font-typewriter text-[10px] uppercase tracking-[0.25em] text-amour-gold">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-amour-crimson" />
              The Living Secret Archives
            </div>
            <h1 className="font-heading text-5xl leading-[0.95] tracking-tight text-foreground dark:text-white sm:text-7xl xl:text-8xl">
              Where Unspoken <br />
              <span className="bg-gradient-to-r from-amour-rose via-amour-champagne to-amour-gold bg-clip-text font-serif italic text-transparent">
                Sparks Become
              </span>
              <br />
              Eternal Letters.
            </h1>
            <p className="max-w-2xl font-cormorant text-xl italic leading-relaxed text-amour-rose/85 sm:text-2xl">
              Anonymously share the glance across a crowded cafe, the wet umbrella under the
              midnight tram, or the words you left behind.
            </p>
            <div className="grid max-w-lg grid-cols-3 gap-4 border-y border-amour-border py-4">
              {heroStats.map((stat, index) => (
                <div key={stat.label}>
                  <span className="block font-serif text-2xl font-bold leading-none text-foreground dark:text-white">
                    <NumberTicker value={stat.value} delay={index * 0.12} />
                  </span>
                  <span className="block pt-1 font-typewriter text-[9px] uppercase tracking-widest text-amour-gold">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                type="button"
                onClick={() => scrollToId('#sec-scribe')}
                className="rounded-full border border-amour-gold/40 bg-amour-crimson px-7 py-6 font-typewriter text-[10px] uppercase tracking-[0.2em] text-white shadow-glow hover:bg-amour-crimson/90">
                <PenLine className="h-4 w-4 text-amour-gold" />
                Scribe Your Encounter
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => scrollToId('#sec-anthology')}
                className="rounded-full border-amour-gold/20 bg-card/60 px-7 py-6 font-typewriter text-[10px] uppercase tracking-widest">
                <ArrowDown className="h-4 w-4 text-amour-gold" />
                Explore Anthology
              </Button>
            </div>
          </div>
          <div className="lg:col-span-4">
            <Card className="glow-hover space-y-6 rounded-[2rem] border-2 border-amour-gold/35 bg-amour-velvet/80 p-7 shadow-glass dark:bg-amour-velvet/90">
              <div className="flex items-center justify-between border-b border-amour-border pb-4">
                <span className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold">
                  Featured Spotlight
                </span>
                <span className="font-cormorant text-xs italic text-amour-rose">
                  {featured.location}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold leading-snug text-foreground dark:text-white">
                “{featured.title}”
              </h3>
              <p className="line-clamp-4 font-cormorant text-sm italic leading-relaxed text-amour-rose/90">
                {featured.story}
              </p>
              <div className="flex items-center justify-between border-t border-amour-border pt-4 text-xs">
                <Button
                  type="button"
                  variant="unstyled"
                  size="unstyled"
                  onClick={() => openLetter(featured)}
                  className="font-typewriter text-[11px] uppercase tracking-wider text-amour-gold hover:text-foreground dark:hover:text-white">
                  <Feather className="h-3.5 w-3.5" />
                  Unseal Letter
                </Button>
                <span className="text-muted-foreground">{displayStamps(featured)} Stamps</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <ArchiveMarquee />

      <section
        id="sec-roulette"
        className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <div className="space-y-4">
          <span className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-amour-gold">
            Roulette
          </span>
          <h2 className="font-heading text-5xl text-foreground dark:text-white">
            Find a Letter by Feeling.
          </h2>
          <p className="max-w-md font-cormorant text-xl italic text-amour-rose/85">
            Spin through anonymous encounters by mood, longing, or chance.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {(['tender', 'electric', 'nostalgic', 'mysterious'] as const).map((mood) => (
              <Button
                key={mood}
                type="button"
                variant="outline"
                onClick={() => spin(mood)}
                className="rounded-full capitalize">
                {mood}
              </Button>
            ))}
            <Button
              type="button"
              onClick={() => spin()}
              className="rounded-full bg-amour-crimson text-white hover:bg-amour-crimson/90">
              <Shuffle className="h-4 w-4" />
              Random
            </Button>
          </div>
        </div>
        <Card className="glow-hover relative overflow-hidden rounded-[2.5rem] border-2 border-amour-gold/25 bg-amour-velvet/80 p-8 shadow-glass dark:bg-amour-velvet/90">
          <Sparkles className="absolute right-8 top-8 h-20 w-20 text-amour-gold/10" />
          <div className="relative z-10 space-y-5">
            <span className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold">
              {rouletteLetter.category}
            </span>
            <h3 className="font-serif text-4xl font-bold text-foreground dark:text-white">
              “{rouletteLetter.title}”
            </h3>
            <p className="font-cormorant text-xl italic leading-relaxed text-amour-rose/90">
              {rouletteLetter.story}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-amour-border pt-5">
              <span className="font-cormorant italic text-muted-foreground">
                {rouletteLetter.location}
              </span>
              <Button
                type="button"
                onClick={() => openLetter(rouletteLetter)}
                className="rounded-full bg-amour-crimson text-white hover:bg-amour-crimson/90">
                Read Letter
              </Button>
            </div>
          </div>
        </Card>
      </section>

      <section id="sec-anthology" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
        <div className="mb-8">
          <span className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-amour-gold">
            Anthology Ribbon
          </span>
          <h2 className="mt-2 font-heading text-5xl text-foreground dark:text-white">
            Anonymous Letters, Velvet Bound.
          </h2>
        </div>
        <Tabs value={category} onValueChange={(value) => setCategory(value as typeof category)}>
          <TabsList>
            {categories.map((item) => (
              <TabsTrigger key={item} value={item}>
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={category}>
            <div className="flex gap-5 overflow-x-auto pb-5">
              {filteredLetters.map((letter) => (
                <FlipLetterCard key={letter.id} letter={letter} onOpen={openLetter} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <span className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-amour-gold">
              Telegrams
            </span>
            <h2 className="mt-2 font-heading text-5xl text-foreground dark:text-white">
              Short Signals From Everywhere.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {telegrams.slice(0, 4).map((telegram) => (
              <Card key={telegram} className="glow-hover border-2 border-amour-gold/20 bg-amour-velvet/75 p-5 shadow-glass dark:bg-amour-velvet/85">
                <Send className="mb-4 h-4 w-4 text-amour-gold" />
                <p className="font-cormorant text-lg italic text-amour-rose/90">“{telegram}”</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="sec-sky" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
        <div className="glass-panel relative overflow-hidden rounded-[2.5rem] border-2 border-amour-gold/25 p-6 shadow-glass sm:p-8">
          <div className="relative z-10 max-w-2xl">
            <span className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-amour-gold">
              Sky Map
            </span>
            <h2 className="mt-2 font-heading text-5xl text-foreground dark:text-white">
              A Constellation of Almosts.
            </h2>
            <p className="mt-4 font-cormorant text-xl italic text-amour-rose/85">
              Each point is an anonymous memory waiting to be opened.
            </p>
          </div>

          <div className="relative mt-10 min-h-[300px] overflow-visible rounded-[2rem] border border-amour-gold/10 bg-amour-deep/35 sm:min-h-[360px]">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full text-amour-gold/25"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true">
              <path d="M14 72 C28 42 43 34 58 53 S82 52 88 23" fill="none" stroke="currentColor" strokeWidth="0.28" strokeDasharray="1.3 1.4" />
              <path d="M22 22 C42 30 48 69 70 64 S89 68 83 86" fill="none" stroke="currentColor" strokeWidth="0.22" strokeDasharray="1.1 1.3" />
            </svg>
            {archiveLetters.map((letter, index) => {
              const positions = [
                { top: '72%', left: '14%' },
                { top: '22%', left: '22%' },
                { top: '40%', left: '45%' },
                { top: '70%', left: '55%' },
                { top: '24%', left: '82%' },
                { top: '78%', left: '86%' },
                { top: '52%', left: '70%' },
                { top: '62%', left: '32%' },
              ];
              const position = positions[index % positions.length];

              return (
                <Button
                  key={letter.id}
                  type="button"
                  variant="unstyled"
                  size="unstyled"
                  onClick={() => openLetter(letter)}
                  style={position}
                  className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amour-gold/25 bg-amour-gold/20 shadow-glow transition group-hover:scale-125">
                    <span className={skyButtonClass(letter)} />
                  </span>
                  <span className="pointer-events-none absolute left-1/2 top-12 z-30 hidden w-64 -translate-x-1/2 rounded-2xl border border-amour-gold/25 bg-amour-velvet/95 p-4 text-left shadow-glass group-hover:block">
                    <span className="font-typewriter text-[9px] uppercase tracking-widest text-amour-gold">
                      {letter.category}
                    </span>
                    <span className="mt-1 block break-words font-serif text-sm font-bold text-foreground dark:text-white">
                      {letter.title}
                    </span>
                    <span className="mt-1 flex items-center gap-1 text-[10px] text-amour-rose">
                      <MapPin className="h-3 w-3" />
                      {letter.location}
                    </span>
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="sec-scribe"
        className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-10">
        <div className="lg:col-span-2">
          <span className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-amour-gold">
            Scribe
          </span>
          <h2 className="mt-2 font-heading text-5xl text-foreground dark:text-white">
            Seal a New Anonymous Letter.
          </h2>
          <p className="mt-4 max-w-lg font-cormorant text-xl italic text-amour-rose/85">
            A quiet writing room for the encounter you still carry.
          </p>
        </div>
        <Card className="border-2 border-amour-gold/20 bg-amour-velvet/75 p-6 shadow-glass dark:bg-amour-velvet/85">
          <form className="grid gap-5" onSubmit={sealLetter}>
            <div className="grid gap-2">
              <Label htmlFor="letter-category" className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold">
                Archive shelf
              </Label>
              <Select value={scribeCategory} onValueChange={(value) => setScribeCategory(value as typeof scribeCategory)}>
                <SelectTrigger id="letter-category" className="h-12 w-full rounded-2xl border-amour-gold/25 bg-amour-deep/40 px-4 text-xs">
                  <SelectValue placeholder="Choose a category" />
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
              <Label htmlFor="letter-location" className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold">
                City and moment
              </Label>
              <Input
                id="letter-location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="h-12 rounded-2xl border-amour-gold/25 bg-amour-deep/40 px-4 text-xs"
                placeholder="e.g. Kyoto, Arashiyama at dusk"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="letter-title" className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold">
                Chronicle title
              </Label>
              <Input
                id="letter-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="h-14 rounded-2xl border-amour-gold/25 bg-transparent px-4 font-serif text-2xl font-bold"
                placeholder="Title of your chronicle"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="letter-body" className="font-typewriter text-[10px] uppercase tracking-widest text-amour-gold">
                The encounter
              </Label>
              <Textarea
                id="letter-body"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                rows={7}
                className="min-h-44 resize-none rounded-2xl border-amour-gold/25 bg-transparent px-4 py-3 font-cormorant text-lg italic"
                placeholder="Describe the moment, the eye contact, the raindrops, the unspoken truth..."
              />
            </div>
            <Label htmlFor="letter-seeking" className="flex cursor-pointer items-center gap-3 rounded-2xl border border-amour-gold/20 bg-amour-wine/20 p-4 font-cormorant text-sm italic text-amour-rose">
              <Checkbox
                id="letter-seeking"
                checked={seekingReconnection}
                onCheckedChange={(checked) => setSeekingReconnection(Boolean(checked))}
              />
              Seeking reconnection
            </Label>
            {formMessage ? <p className="font-cormorant text-sm italic text-amour-gold">{formMessage}</p> : null}
            <Button type="submit" className="rounded-full bg-amour-crimson py-6 text-white hover:bg-amour-crimson/90">
              <Send className="h-4 w-4 text-amour-gold" />
              Seal Letter
            </Button>
          </form>
        </Card>
        <Card className="border-2 border-amour-gold/20 bg-amour-velvet/75 p-7 shadow-glass dark:bg-amour-velvet/85">
          <span className="mb-4 flex items-center gap-2 font-typewriter text-[10px] uppercase tracking-widest text-amour-gold">
            <PenLine className="h-4 w-4" />
            Live Preview
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
            “{body || 'Your letter preview will appear here.'}”
          </p>
          {seekingReconnection ? (
            <span className="mt-5 inline-flex rounded-full bg-amour-gold/15 px-3 py-1 font-typewriter text-[9px] uppercase tracking-widest text-amour-gold">
              Seeking Signal
            </span>
          ) : null}
        </Card>
      </section>
    </>
  );
}
