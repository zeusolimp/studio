import type {Metadata} from 'next';
import '../globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/ThemeProvider';
import { getSettings } from '@/lib/settings';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Soluções Digitais | Desenvolvimento Web e Suporte',
  description: 'Criamos aplicações web, sites e sistemas à medida. Oferecemos suporte técnico especializado.',
};

export default async function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  const settings = await getSettings();
  const messages = await getMessages({locale});
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
    <html lang={locale} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeStyle }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            >
            {children}
            <Toaster />
            </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
