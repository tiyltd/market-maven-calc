import React from 'react';
import { Moon, Sun, TrendingUp, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../../hooks/use-theme';

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg text-primary-foreground">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-primary">
              TIY LTD <span className="text-foreground">Forex Calculator</span>
            </h1>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest hidden sm:block">
              Premium Trading Suite
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1 px-3 py-1 bg-muted/50 rounded-full border border-border">
            <Globe className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium">Market: Open</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" />
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </nav>
      </div>
    </header>
  );
}