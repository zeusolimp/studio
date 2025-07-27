
"use client";

import { useTranslations } from 'next-intl';
import { Link } from '../../navigation';
import { DynamicIcon } from '@/components/DynamicIcon';

export default function FooterNav() {
    const tFooter = useTranslations('Footer');
    const tHeader = useTranslations('Header');

    return (
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
    );
}
