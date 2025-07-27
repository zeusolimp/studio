import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
            <span className="font-headline text-lg font-bold">Dynamic Landing</span>
            <span className="text-sm text-muted-foreground ml-2">Backoffice</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
                <Link href="/">
                    <Eye className="mr-2 h-4 w-4" />
                    View Live Site
                </Link>
            </Button>
        </div>
      </header>
      <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
    </div>
  );
}
