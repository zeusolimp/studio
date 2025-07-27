
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Eye, Home, Settings, Briefcase, Users, Phone, Grip, FileText } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';

const menuItems = [
    { href: '/backoffice/inicio', label: 'Início', icon: Home },
    { href: '/backoffice/servicos', label: 'Serviços', icon: Briefcase },
    { href: '/backoffice/sobre-nosotros', label: 'Quem Somos', icon: Users },
    { href: '/backoffice/blog', label: 'Blog', icon: FileText },
    { href: '/backoffice/contacto', label: 'Contacto', icon: Phone },
    { href: '/backoffice/footer', label: 'Rodapé', icon: Grip },
    { href: '/backoffice/configuracoes', label: 'Configurações', icon: Settings },
];

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                 <div className="flex items-center gap-2 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="font-headline text-lg font-bold">iddeia global</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                             <SidebarMenuButton
                                asChild
                                isActive={pathname === item.href}
                                className="gap-3"
                                >
                                <Link href={item.href}>
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
             <SidebarFooter>
                <div className="flex items-center justify-between p-2">
                    <ThemeToggle />
                     <Button asChild variant="outline" size="sm">
                        <Link href="/">
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Site
                        </Link>
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
             <main className="flex-1 p-4 sm:px-6 sm:py-8">{children}</main>
        </SidebarInset>
    </SidebarProvider>
  );
}
