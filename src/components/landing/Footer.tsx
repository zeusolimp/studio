
import { Link } from 'next-intl';
import Image from 'next/image';
import { getContent } from '@/lib/content';
import { getSettings } from '@/lib/settings';
import { FooterSectionData, Locale } from '@/types';
import { DynamicIcon } from '@/components/DynamicIcon';
import { LayoutDashboard } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';


const Footer = async () => {
    const t = await getTranslations('Footer');
    const content = await getContent();
    const settings = await getSettings();
    const locale = await getLocale() as Locale;

    const data = content.sections.find(
        (section) => section.type === 'footer'
    ) as FooterSectionData | undefined;

    if (!data) return null;

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
                <h3 className="font-headline text-lg font-semibold mb-4">{t('navigation')}</h3>
                <nav className="flex flex-col gap-2 text-muted-foreground">
                    <Link href="/" className="hover:text-accent transition-colors">{t('home')}</Link>
                    <Link href="/servicios" className="hover:text-accent transition-colors">{t('services')}</Link>
                    <Link href="/sobre-nosotros" className="hover:text-accent transition-colors">{t('about')}</Link>
                    <Link href="/blog" className="hover:text-accent transition-colors">{t('blog')}</Link>
                    <Link href="/contacto" className="hover:text-accent transition-colors">{t('contact')}</Link>
                    <a href="/backoffice" className="flex items-center gap-2 hover:text-accent transition-colors">
                        <LayoutDashboard className="h-4 w-4" />
                        {t('dashboard')}
                    </a>
                </nav>
            </div>

            <div>
                <h3 className="font-headline text-lg font-semibold mb-4">{t('contact')}</h3>
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
                <h3 className="font-headline text-lg font-semibold mb-4">{t('follow_us')}</h3>
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
