import type { Route } from './+types/home';
import { HomePage } from '~/components/home/home-page';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'AMOUR | Anonymous Love Chronicles' },
    { name: 'description', content: 'Secret encounters, anonymous letters, midnight messages, and saved love chronicles.' },
  ];
}

export default function Home() {
  return <HomePage />;
}
