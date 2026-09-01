import { ChevronDown } from 'lucide-react';
import { Howl } from 'howler';
import { useRef, useState } from 'react';
import { Button } from '~/components/ui/button';

function createToneDataUri(frequency = 196, seconds = 1.2) {
  const sampleRate = 44100;
  const samples = Math.floor(sampleRate * seconds);
  const dataSize = samples * 2;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  function writeString(offset: number, value: string) {
    for (let index = 0; index < value.length; index += 1) {
      view.setUint8(offset + index, value.charCodeAt(index));
    }
  }

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  for (let index = 0; index < samples; index += 1) {
    const fadeIn = Math.min(1, index / (sampleRate * 0.12));
    const fadeOut = Math.min(1, (samples - index) / (sampleRate * 0.22));
    const envelope = Math.min(fadeIn, fadeOut) * 0.22;
    const overtone = Math.sin((2 * Math.PI * frequency * 1.5 * index) / sampleRate) * 0.22;
    const value = (Math.sin((2 * Math.PI * frequency * index) / sampleRate) + overtone) * envelope;
    view.setInt16(44 + index * 2, value * 32767, true);
  }

  let binary = '';
  const bytes = new Uint8Array(buffer);
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return 'data:audio/wav;base64,' + window.btoa(binary);
}

export function SoundscapeToggle() {
  const soundRef = useRef<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function toggleSoundscape() {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: [createToneDataUri()],
        loop: true,
        volume: 0.08,
        html5: false,
      });
    }

    if (isPlaying) {
      soundRef.current.fade(0.08, 0, 250);
      window.setTimeout(() => soundRef.current?.pause(), 260);
      setIsPlaying(false);
      return;
    }

    soundRef.current.volume(0);
    soundRef.current.play();
    soundRef.current.fade(0, 0.08, 350);
    setIsPlaying(true);
  }

  return (
    <Button
      type="button"
      variant="unstyled"
      size="unstyled"
      aria-label={isPlaying ? 'Mute soundscape' : 'Play soundscape'}
      onClick={toggleSoundscape}
      className="glass-panel flex h-10 w-10 items-center justify-center gap-0 rounded-full px-0 text-xs font-medium text-amour-rose transition hover:border-amour-gold/50 hover:text-foreground dark:hover:text-white md:w-auto md:gap-2 md:px-4 md:py-2">
      <span className="flex h-4 items-center gap-0.5 opacity-80">
        {[0, 0.2, 0.4].map((delay) => (
          <span
            key={delay}
            className={
              'w-0.5 rounded-full bg-amour-rose ' +
              (isPlaying ? 'sound-bar' : 'h-1')
            }
            style={{ animationDelay: String(delay) + 's' }}
          />
        ))}
      </span>
      <span className="hidden font-cormorant text-sm tracking-wide xl:inline">
        {isPlaying ? 'Soundscape: Tone' : 'Soundscape: Muted'}
      </span>
      <ChevronDown className="hidden h-3 w-3 text-amour-gold md:block" />
    </Button>
  );
}
