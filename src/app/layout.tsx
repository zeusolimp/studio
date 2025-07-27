import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/ThemeProvider';
import { getSettings } from '@/lib/settings';

export const metadata: Metadata = {
  title: 'Soluciones Digitales | Desarrollo Web y Soporte',
  description: 'Creamos aplicaciones web, sitios y sistemas a medida. Ofrecemos soporte técnico especializado.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const { light, dark } = settings.theme;

  const themeStyle = `
    :root {
      --light-background: ${light.background};
      --light-foreground: ${light.foreground};
      --light-accent: ${light.accent};
      --dark-background: ${dark.background};
      --dark-foreground: ${dark.foreground};
      --dark-accent: ${dark.accent};
    }
  `;

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeStyle }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
