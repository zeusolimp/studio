import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/50 bg-secondary/20 text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Section */}
          <div className="flex flex-col items-start">
             <Link href="/" className="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-accent">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                </svg>
                <span className="font-headline text-xl font-bold">iddeia global</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Creamos soluciones digitales a medida para potenciar tu negocio con tecnología.
            </p>
          </div>

          {/* Navigation Section */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Navegación</h3>
            <nav className="flex flex-col gap-2 text-muted-foreground">
                <Link href="/" className="hover:text-accent transition-colors">Iniciar</Link>
                <Link href="/servicios" className="hover:text-accent transition-colors">Servicios</Link>
                <Link href="/sobre-nosotros" className="hover:text-accent transition-colors">Quiénes somos</Link>
                <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
                <Link href="/contacto" className="hover:text-accent transition-colors">Contacto</Link>
            </nav>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Contacto</h3>
            <div className="flex flex-col gap-3 text-muted-foreground text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                <span>contacto@iddeiaglobal.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent" />
                <span>+51 987 654 321</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-accent mt-1" />
                <span>Av. Principal 123, Oficina 404, Lima, Perú</span>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex items-center gap-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-accent transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-accent transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-border/50 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
           <p className="mb-4 md:mb-0">
            &copy; {currentYear} iddeia global. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="/politicas-privacidad" className="hover:text-accent transition-colors">Políticas de Privacidad</Link>
            <Link href="/libro-reclamaciones" className="hover:text-accent transition-colors">Libro de Reclamaciones</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
