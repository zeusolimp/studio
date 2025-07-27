"use client";

import { Link } from '@/navigation';
import { DynamicIcon } from '@/components/DynamicIcon';

interface NavTranslations {
    home: string;
    services: string;
    about: string;
    blog: string;
    contact: string;
    dashboard: string;
    navigation: string;
}

interface FooterNavProps {
    translations: NavTranslations;
}

export default function FooterNav({ translations }: FooterNavProps) {
    return (
        <div>
            <h3 className="font-headline text-lg font-semibold mb-4">{translations.navigation}</h3>
            <nav className="flex flex-col gap-2 text-muted-foreground">
                <Link href="/" className="hover:text-accent transition-colors">{translations.home}</Link>
                <Link href="/servicios" className="hover:text-accent transition-colors">{translations.services}</Link>
                <Link href="/sobre-nosotros" className="hover:text-accent transition-colors">{translations.about}</Link>
                <Link href="/blog" className="hover:text-accent transition-colors">{translations.blog}</Link>
                <Link href="/contacto" className="hover:text-accent transition-colors">{translations.contact}</Link>
                <Link href="/backoffice" className="flex items-center gap-2 hover:text-accent transition-colors">
                    <DynamicIcon name="LayoutDashboard" className="h-4 w-4" />
                    {translations.dashboard}
                </Link>
            </nav>
        </div>
    );
}
