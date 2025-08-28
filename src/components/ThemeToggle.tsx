'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import React from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <Button variant="outline" onClick={toggle} className="gap-2">
      <Sun className="h-4 w-4 dark:hidden" />
      <Moon className="h-4 w-4 hidden dark:block" />
      <span className="hidden sm:inline">Theme</span>
    </Button>
  );
}


