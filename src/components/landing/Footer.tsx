const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/50 bg-secondary/20">
      <div className="container mx-auto flex items-center justify-between py-6 px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Soluciones Digitales. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
           <span className="font-headline text-sm font-bold text-muted-foreground">Soluciones Digitales</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
