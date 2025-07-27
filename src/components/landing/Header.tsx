
"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/navigation';
import { ThemeToggle } from '../ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useEffect, useState } from 'react';
import type { SiteSettings } from '@/types';

const Header = () => {
  const t = useTranslations('Header');
  
  const NavLinks = () => {
    return (
        <>
            <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                {t('home')}
            </Link>
            <Link href="/servicios" className="text-muted-foreground transition-colors hover:text-foreground">
                {t('services')}
            </Link>
            <Link href="/sobre-nosotros" className="text-muted-foreground transition-colors hover:text-foreground">
                {t('about')}
            </Link>
            <Link href="/blog" className="text-muted-foreground transition-colors hover:text-foreground">
                {t('blog')}
            </Link>
            <Link href="/contacto" className="text-muted-foreground transition-colors hover:text-foreground">
                {t('contact')}
            </Link>
        </>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-[1920px] items-center justify-between px-[15px]">
        <Link href="/" className="flex items-center gap-2">
          <HeaderLogo />
          <span className="font-headline text-xl font-bold">iddeia global</span>
        </Link>
        
        <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                <NavLinks />
            </nav>
            <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
            </div>
        </div>
      </div>
    </header>
  );
};

const HeaderLogo = () => {
    const [settings, setSettings] = useState<SiteSettings | null>(null);

    useEffect(() => {
        async function fetchSettings() {
            const res = await fetch('/api/settings');
            const data = await res.json();
            setSettings(data);
        }
        fetchSettings();
    }, []);

    if (!settings) {
        return (
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
        )
    }

    return (
        <>
            {settings.logo_url ? (
                <Image src={settings.logo_url} alt="iddeia global logo" width={32} height={32} className="h-8 w-8" />
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-accent">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                </svg>
            )}
        </>
    )
}


export default Header;
