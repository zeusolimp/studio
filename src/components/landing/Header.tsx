
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-accent">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
          <span className="font-headline text-xl font-bold">iddeia global</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                Inicio
            </Link>
            <Link href="/servicios" className="text-muted-foreground transition-colors hover:text-foreground">
                Servicios
            </Link>
            <Link href="/sobre-nosotros" className="text-muted-foreground transition-colors hover:text-foreground">
                Quiénes somos
            </Link>
            <Link href="/contacto" className="text-muted-foreground transition-colors hover:text-foreground">
                Contacto
            </Link>
        </nav>
        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/backoffice">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Panel de Control
            </Link>
          </Button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
