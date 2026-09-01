export type LoveLetter = {
  id: number;
  title: string;
  category: 'First Encounters' | 'Missed Connections' | 'Coffee & Books' | 'Unspoken Longing' | 'Travel Sparks';
  location: string;
  excerpt: string;
  story: string;
  stamps: number;
  date: string;
  seekingReconnection: boolean;
  mood: 'tender' | 'electric' | 'nostalgic' | 'mysterious';
  comments: string[];
};

export const letters: LoveLetter[] = [
  { id: 101, title: 'The Violinist at Platform Nine', category: 'First Encounters', location: 'Vienna, Westbahnhof', excerpt: 'A dropped ticket, a borrowed scarf, and a melody that followed me into the snow.', story: 'My ticket slipped from my glove and skated across the wet platform. Before I could panic, a young violinist carrying a cello case knelt down, dried it with his scarf, and smiled like winter had briefly learned mercy.', stamps: 428, date: 'Feb 14, 2026', seekingReconnection: false, mood: 'nostalgic', comments: ['Vienna night magic is real.', 'This felt like a film scene.'] },
  { id: 102, title: 'Espresso Beans & Page 142', category: 'Coffee & Books', location: 'Rome, Trastevere Cafe', excerpt: 'Someone marked my poetry book with a tiny cup of espresso and a dangerous compliment.', story: 'I left my bookmark in a poetry book on the counter. When I came back, someone had drawn a tiny espresso cup on page 142 with the note: You have exquisite taste in verse.', stamps: 312, date: 'Jan 19, 2026', seekingReconnection: true, mood: 'tender', comments: ['Poetry in real life.'] },
  { id: 103, title: 'The Lavender Stem Under Door 4B', category: 'Unspoken Longing', location: "Paris, Rue de L'Amour", excerpt: 'Every Sunday at 9 PM, a pressed lavender stem arrived beneath my apartment door.', story: 'For six months, every Sunday at 9 PM, an envelope slipped under my apartment door containing a single pressed lavender stem and a handwritten description of the sunset over Sacre-Coeur.', stamps: 519, date: 'Feb 01, 2026', seekingReconnection: false, mood: 'mysterious', comments: ['Sublime romantic mystery.'] },
  { id: 104, title: 'Raindrops on the Glass Studio', category: 'First Encounters', location: 'Kyoto, Gion District', excerpt: 'Forty minutes under narrow eaves, speaking only in sketches on a pocket notepad.', story: 'Caught in sudden rain, we both ducked under the narrow eaves of a matcha shop. Neither of us spoke fluently, so we communicated through sketched drawings until the storm softened.', stamps: 284, date: 'Dec 22, 2025', seekingReconnection: true, mood: 'electric', comments: ['Sketches speak louder than words.'] },
  { id: 105, title: 'The Blue Umbrella on Fifth', category: 'Missed Connections', location: 'New York, Fifth Avenue', excerpt: 'The rain was brutal, but your laugh made the city sound briefly kind.', story: 'Your blue umbrella turned inside out at the same time mine did. We laughed so hard the crosswalk changed twice. I should have asked your name before the crowd carried us apart.', stamps: 376, date: 'Mar 03, 2026', seekingReconnection: true, mood: 'electric', comments: ['I hope they find each other.'] },
  { id: 106, title: 'Paper Crane at the Tea Shop', category: 'Travel Sparks', location: 'Kyoto, Philosopher Path', excerpt: 'You folded a crane from my receipt and left before I could say thank you.', story: 'The tea shop was quiet except for rain tapping bamboo. You folded my receipt into a crane, placed it beside my cup, bowed once, and vanished into the garden path.', stamps: 241, date: 'Nov 09, 2025', seekingReconnection: false, mood: 'tender', comments: ['Small gestures stay forever.'] },
];

export const categories = ['All', 'First Encounters', 'Missed Connections', 'Coffee & Books', 'Unspoken Longing', 'Travel Sparks'] as const;

export const telegrams = [
  'Tokyo, 08:14 - To the stranger on Train 4 who offered their hot coffee...',
  'New York, 23:10 - The rain on 5th Ave was cold, but your laughter was not.',
  'Kyoto, 17:45 - I still keep the paper crane you folded in the tea shop.',
  'Paris, 19:30 - Page 142 of your book was marked. I hope you found your answer.',
  'Vienna, 00:05 - Your violin melody carried me home through the snowfall.',
];
