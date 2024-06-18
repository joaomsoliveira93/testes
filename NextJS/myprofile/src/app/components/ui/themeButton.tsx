'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }
  return (
    <button
      aria-label='Toogle Dark Mode'
      type='button'
      className='flex  rounded-lg p-2 '
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? <WbSunnyIcon /> : <DarkModeIcon />}
    </button>
  );
};
