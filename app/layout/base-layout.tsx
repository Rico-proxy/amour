import { Outlet } from 'react-router';
import { AmourProvider } from '~/components/amour/amour-context';
import { LetterDialog } from '~/components/amour/letter-dialog';
import { SanctuaryDrawer } from '~/components/amour/sanctuary-drawer';
import { Footer } from './footer';
import { Navbar } from './navbar';

export default function BaseLayout() {
  return (
    <AmourProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <main className="relative z-10 flex-1"><Outlet /></main>
        <Footer />
        <SanctuaryDrawer />
        <LetterDialog />
      </div>
    </AmourProvider>
  );
}
