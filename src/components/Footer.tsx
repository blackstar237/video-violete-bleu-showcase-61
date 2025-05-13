
import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Pour éviter d'utiliser les composants Link directement dans le Footer
  // si utilisé en dehors d'un contexte de routeur
  const isClientSide = typeof window !== 'undefined';

  // Composant d'enveloppe qui utilise soit Link, soit un a selon le contexte
  const SafeLink = ({ to, children, className }: { to: string, children: React.ReactNode, className?: string }) => {
    // Si nous sommes côté client et que l'URL correspond au pattern interne
    if (isClientSide && to.startsWith('/')) {
      return <Link to={to} className={className}>{children}</Link>;
    }
    // Sinon, utiliser un lien standard
    return <a href={to} className={className}>{children}</a>;
  };

  return (
    <footer className="bg-theme-blue-dark relative mt-16">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-theme-violet-light to-transparent opacity-30"></div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo & description */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <SafeLink to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden border border-primary/20 bg-theme-dark">
                <Film className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-semibold text-gradient">VideoFolio</span>
            </SafeLink>
            <p className="text-sm text-muted-foreground max-w-xs">
              Nous créons des vidéos professionnelles captivantes pour mettre en valeur votre entreprise et vos produits.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <SafeLink to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Accueil
                </SafeLink>
              </li>
              <li>
                <SafeLink to="/videos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Vidéos
                </SafeLink>
              </li>
              <li>
                <SafeLink to="/categories" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Catégories
                </SafeLink>
              </li>
              <li>
                <SafeLink to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  À propos
                </SafeLink>
              </li>
              <li>
                <SafeLink to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </SafeLink>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-foreground mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <SafeLink to="/categories/corporate" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Corporate
                </SafeLink>
              </li>
              <li>
                <SafeLink to="/categories/events" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Événements
                </SafeLink>
              </li>
              <li>
                <SafeLink to="/categories/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Produits
                </SafeLink>
              </li>
              <li>
                <SafeLink to="/categories/social" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Réseaux sociaux
                </SafeLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-foreground mb-4">Contact</h3>
            <address className="not-italic">
              <p className="text-sm text-muted-foreground mb-2">
                Bafoussam, Cameroun
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <a href="https://wa.me/237695666275" className="hover:text-primary transition-colors">
                  WhatsApp: +237 6 95 66 62 75
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                <a href="mailto:vidéos@digit-service.org" className="hover:text-primary transition-colors">
                  vidéos@digit-service.org
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {currentYear} VideoFolio. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
