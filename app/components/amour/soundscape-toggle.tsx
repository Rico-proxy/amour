import { Volume2, VolumeX } from 'lucide-react';
import { Howl } from 'howler';
import { useEffect, useRef, useState } from 'react';
import { Button } from '~/components/ui/button';

const SOUNDTRACK_VOLUME = 0.32;
const FADE_OUT_MS = 250;
const FADE_IN_MS = 350;

export function SoundscapeToggle() {
  const soundRef = useRef<Howl | null>(null);
  const pauseTimerRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) {
        window.clearTimeout(pauseTimerRef.current);
      }

      soundRef.current?.unload();
    };
  }, []);

  function clearPauseTimer() {
    if (!pauseTimerRef.current) {
      return;
    }

    window.clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = null;
  }

  function toggleSoundscape() {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: ['/loveto.mp3'],
        loop: true,
        volume: SOUNDTRACK_VOLUME,
        html5: true,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onstop: () => setIsPlaying(false),
        onplayerror: () => setIsPlaying(false),
      });
    }

    const sound = soundRef.current;

    if (sound.playing() || isPlaying) {
      clearPauseTimer();
      sound.fade(sound.volume(), 0, FADE_OUT_MS);
      pauseTimerRef.current = window.setTimeout(() => {
        sound.pause();
        sound.volume(SOUNDTRACK_VOLUME);
        pauseTimerRef.current = null;
      }, FADE_OUT_MS + 20);
      setIsPlaying(false);
      return;
    }

    clearPauseTimer();
    sound.volume(0);
    const soundId = sound.play();
    sound.fade(0, SOUNDTRACK_VOLUME, FADE_IN_MS, soundId);
  }

  return (
    <Button
      type="button"
      variant="unstyled"
      size="unstyled"
      aria-label={isPlaying ? 'Mute soundscape' : 'Play soundscape'}
      onClick={toggleSoundscape}
      className="glass-panel flex h-10 w-10 items-center justify-center gap-0 rounded-full px-0 text-xs font-medium text-amour-rose transition hover:border-amour-gold/50 hover:text-foreground dark:hover:text-white md:w-auto md:gap-2 md:px-4 md:py-2">
      <span className="flex h-4 items-center gap-0.5 opacity-85">
        {[0, 0.12, 0.24, 0.36, 0.48].map((delay, index) => (
          <span
            key={delay}
            className={
              'w-0.5 rounded-full bg-amour-rose transition-[height] ' +
              (isPlaying ? 'sound-bar' : index % 2 === 0 ? 'h-1.5' : 'h-2.5')
            }
            style={{
              animationDelay: String(delay) + 's',
              animationDuration: String(1 + index * 0.08) + 's',
            }}
          />
        ))}
      </span>
      <span className="hidden font-cormorant text-sm tracking-wide xl:inline">
        {isPlaying ? 'Soundscape: Love To' : 'Soundscape: Muted'}
      </span>
      {isPlaying ? (
        <Volume2 className="hidden h-3.5 w-3.5 text-amour-gold md:block" />
      ) : (
        <VolumeX className="hidden h-3.5 w-3.5 text-amour-gold md:block" />
      )}
    </Button>
  );
}
