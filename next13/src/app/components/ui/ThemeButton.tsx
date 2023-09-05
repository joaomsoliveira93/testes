"use client"
import { useTheme } from 'next-themes'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useEffect, useState } from 'react';

export const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(()=>setMounted(true),[])
  if (!mounted) return null;
  return (
    <button onClick= {() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
      { resolvedTheme=== 'dark' ? <WbSunnyIcon /> : <DarkModeIcon />}
    </button>
  )
}
