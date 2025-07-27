
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { DynamicIcon } from '@/components/DynamicIcon';
import type { FooterSectionData, SiteSettings, Locale, LandingContent } from '@/types';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { useLocale } from 'next-intl';

const Footer = () => {
    const [content, setContent] = useState<LandingContent | null>(null);
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const locale = useLocale() as Locale;
    
    useEffect(() => {
        async function fetchData() {
            const contentRes = await fetch('/api/content');
            const contentData = await contentRes.json();
            setContent(contentData);

            const settingsRes = await fetch('/api/settings');
            const settingsData = await settingsRes.json();
            setSettings(settingsData);
        }
        fetchData();
    }, []);

    const tHeader = useTranslations('Header');
    const tFooter = useTranslations('Footer');

    if (!content || !settings) {
        return <footer className="border-t border-border/50 bg-secondary/20 text-foreground h-96 animate-pulse"></footer>;
    }

    const data = content.sections.find((s: any) => s.type === 'footer') as FooterSectionData | undefined;

    if (!data) {
        return <footer className="border-t border-border/50 bg-secondary/20 text-foreground py-12 text-center">Footer content not found.</footer>;
    }
    
    const { brand_description, social_links, legal_links, copyright_text } = data;
    const { contact } = settings;
    const currentYear = new Date().getFullYear();
    const processedCopyright = (copyright_text[locale] || copyright_text.pt).replace('{year}', currentYear.toString());

    return (
        <footer className="border-t border-border/50 bg-secondary/20 text-foreground">
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            
            <div className="flex flex-col items-start">
                <Link href="/" className="flex items-center gap-2 mb-4">
                     {settings.logo_url ? (
                        <Image src={settings.logo_url} alt="iddeia global logo" width={32} height={32} className="h-8 w-8" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-accent">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                            <path d="M2 17l10 5 10-5"></path>
                            <path d="M2 12l10 5 10-5"></path>
                        </svg>
                    )}
                    <span className="font-headline text-xl font-bold">iddeia global</span>
                </Link>
                <p className="text-muted-foreground text-sm">
                    {brand_description[locale] || brand_description.pt}
                </p>
            </div>

            <div>
                <h3 className="font-headline text-lg font-semibold mb-4">{tFooter('navigation')}</h3>
                <nav className="flex flex-col gap-2 text-muted-foreground">
                    <Link href="/" className="hover:text-accent transition-colors">{tHeader('home')}</Link>
                    <Link href="/servicios" className="hover:text-accent transition-colors">{tHeader('services')}</Link>
                    <Link href="/sobre-nosotros" className="hover:text-accent transition-colors">{tHeader('about')}</Link>
                    <Link href="/blog" className="hover:text-accent transition-colors">{tHeader('blog')}</Link>
                    <Link href="/contacto" className="hover:text-accent transition-colors">{tHeader('contact')}</Link>
                    <Link href="/backoffice" className="flex items-center gap-2 hover:text-accent transition-colors">
                        <DynamicIcon name="LayoutDashboard" className="h-4 w-4" />
                        {tFooter('dashboard')}
                    </Link>
                </nav>
            </div>

            <div>
                <h3 className="font-headline text-lg font-semibold mb-4">{tFooter('contact')}</h3>
                <div className="flex flex-col gap-3 text-muted-foreground text-sm">
                <div className="flex items-center gap-3">
                    <DynamicIcon name="Mail" className="h-4 w-4 text-accent" />
                    <span>{contact.email}</span>
                </div>
                <div className="flex items-center gap-3">
                    <DynamicIcon name="Phone" className="h-4 w-4 text-accent" />
                    <span>{contact.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                    <DynamicIcon name="MapPin" className="h-4 w-4 text-accent mt-1" />
                    <span>{contact.address}</span>
                </div>
                </div>
            </div>

            <div>
                <h3 className="font-headline text-lg font-semibold mb-4">{tFooter('follow_us')}</h3>
                <div className="flex items-center gap-4">
                 {social_links.map(social => (
                     <a key={social.id} href={social.url} target='_blank' rel="noopener noreferrer" aria-label={social.platform} className="text-muted-foreground hover:text-accent transition-colors">
                        <DynamicIcon name={social.platform as any} className="h-6 w-6" />
                    </a>
                 ))}
                </div>
            </div>

            </div>

            <div className="mt-12 border-t border-border/50 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <p className="mb-4 md:mb-0">
                {processedCopyright}
            </p>
            <div className="flex gap-4">
                {legal_links.map(link => (
                    <Link key={link.id} href={link.url} className="hover:text-accent transition-colors">{link.text[locale] || link.text.pt}</Link>
                ))}
            </div>
            </div>

        </div>
        </footer>
    );
};

export default Footer;
