import { Moon, Sun } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useTheme } from '~/components/theme-provider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const sunClassName = 'absolute h-4 w-4 transition-all ' + (isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100');
  const moonClassName = 'absolute h-4 w-4 transition-all ' + (isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0');

  return (
    <Button type="button" variant="unstyled" size="unstyled" aria-label="Toggle theme" onClick={toggleTheme} className="glass-panel relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full text-amour-gold transition hover:border-amour-gold/50">
      <Sun className={sunClassName} />
      <Moon className={moonClassName} />
    </Button>
  );
}
