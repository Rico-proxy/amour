import type { LoveLetter } from '~/components/amour/data/letters';

export const rouletteContent = {
  eyebrow: 'Roulette',
  title: 'Find a Letter by Feeling.',
  description: 'Spin through anonymous encounters by mood, longing, or chance.',
  randomAction: 'Random',
  readAction: 'Read Letter',
};

export const rouletteMoods = ['tender', 'electric', 'nostalgic', 'mysterious'] as const satisfies readonly LoveLetter['mood'][];
