import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { AmbientCanvas } from '~/components/ui/ambient-canvas';
import { ArchiveMarquee } from '~/components/amour/archive-marquee';
import { useAmour } from '~/components/amour/amour-context';
import { categories, letters, type LoveLetter } from '~/components/amour/data/letters';
import { scribeContent, scribeDefaults } from './data/scribe';
import { AnthologySection } from './sections/anthology-section';
import { HeroSection } from './sections/hero-section';
import { RouletteSection } from './sections/roulette-section';
import { ScribeSection } from './sections/scribe-section';
import { SkyMapSection } from './sections/sky-map-section';
import { TelegramsSection } from './sections/telegrams-section';

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
  const [title, setTitle] = useState(scribeDefaults.title);
  const [location, setLocation] = useState(scribeDefaults.location);
  const [body, setBody] = useState(scribeDefaults.body);
  const [seekingReconnection, setSeekingReconnection] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  const filteredLetters = useMemo(
    () =>
      category === 'All'
        ? archiveLetters
        : archiveLetters.filter((letter) => letter.category === category),
    [archiveLetters, category]
  );
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
      setFormMessage(scribeContent.formError);
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
    setFormMessage(scribeContent.formSuccess);
  }

  return (
    <>
      <AmbientCanvas />
      <HeroSection
        displayStamps={displayStamps}
        onOpenLetter={openLetter}
        onScrollTo={scrollToId}
      />
      <ArchiveMarquee />
      <RouletteSection letter={rouletteLetter} onOpenLetter={openLetter} onSpin={spin} />
      <AnthologySection
        category={category}
        letters={filteredLetters}
        onCategoryChange={setCategory}
        onOpenLetter={openLetter}
      />
      <TelegramsSection />
      <SkyMapSection letters={archiveLetters} onOpenLetter={openLetter} />
      <ScribeSection
        body={body}
        formMessage={formMessage}
        location={location}
        scribeCategories={scribeCategories}
        scribeCategory={scribeCategory}
        seekingReconnection={seekingReconnection}
        title={title}
        onBodyChange={setBody}
        onCategoryChange={setScribeCategory}
        onLocationChange={setLocation}
        onSeekingReconnectionChange={setSeekingReconnection}
        onSubmit={sealLetter}
        onTitleChange={setTitle}
      />
    </>
  );
}
