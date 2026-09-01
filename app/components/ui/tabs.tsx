import * as React from 'react';
import { Tabs as TabsPrimitive } from 'radix-ui';
import { cn } from '~/lib/utils';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root className={cn('w-full', className)} {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        'glass-panel-light flex w-fit max-w-full flex-wrap gap-2 rounded-full border border-amour-gold/20 p-1.5 shadow-glass',
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'cursor-pointer rounded-full border border-transparent px-5 py-2.5 text-sm font-semibold text-amour-rose transition hover:border-amour-gold/25 hover:bg-amour-wine/30 hover:text-foreground dark:text-amour-champagne/75 dark:hover:text-white data-[state=active]:border-amour-gold/45 data-[state=active]:bg-amour-crimson data-[state=active]:text-white data-[state=active]:shadow-[0_0_24px_rgb(122_26_55_/_55%)] dark:data-[state=active]:bg-amour-crimson dark:data-[state=active]:text-amour-champagne',
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn('mt-8 outline-none', className)} {...props} />;
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
