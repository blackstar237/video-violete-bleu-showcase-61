
import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-theme-blue-dark relative mt-16">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-theme-violet-light to-transparent opacity-30"></div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo & description */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden border border-primary/20 bg-theme-dark">
                <Film className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-semibold text-gradient">VideoFolio</span>
            </Link>
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
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/videos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Vidéos
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Catégories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-foreground mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/corporate" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Corporate
                </Link>
              </li>
              <li>
                <Link to="/categories/events" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Événements
                </Link>
              </li>
              <li>
                <Link to="/categories/product" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <Link to="/categories/social" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Réseaux sociaux
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-foreground mb-4">Contact</h3>
            <address className="not-italic">
              <p className="text-sm text-muted-foreground mb-2">
                123 Rue de la Vidéo<br />
                75000 Paris, France
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <a href="tel:+33123456789" className="hover:text-primary transition-colors">
                  +33 1 23 45 67 89
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                <a href="mailto:contact@videofolio.fr" className="hover:text-primary transition-colors">
                  contact@videofolio.fr
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
