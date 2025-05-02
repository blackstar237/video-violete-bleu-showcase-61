
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-theme-dark/90 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full overflow-hidden border border-primary/20 bg-theme-dark">
              <Film className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
            </div>
            <span className="text-xl font-semibold text-gradient">VideoFolio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium text-white/90 hover:text-white hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link to="/videos" className="text-sm font-medium text-white/90 hover:text-white hover:text-primary transition-colors">
              Vidéos
            </Link>
            <Link to="/categories" className="text-sm font-medium text-white/90 hover:text-white hover:text-primary transition-colors">
              Catégories
            </Link>
            <Link to="/about" className="text-sm font-medium text-white/90 hover:text-white hover:text-primary transition-colors">
              À propos
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-accent hover:border-primary text-white">
                Contact
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-white/5 hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-theme-dark/95 backdrop-blur-lg border-t border-white/5 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-sm font-medium text-white/90 hover:text-primary py-2 px-4 rounded-md hover:bg-white/5"
                onClick={toggleMenu}
              >
                Accueil
              </Link>
              <Link 
                to="/videos" 
                className="text-sm font-medium text-white/90 hover:text-primary py-2 px-4 rounded-md hover:bg-white/5"
                onClick={toggleMenu}
              >
                Vidéos
              </Link>
              <Link 
                to="/categories" 
                className="text-sm font-medium text-white/90 hover:text-primary py-2 px-4 rounded-md hover:bg-white/5"
                onClick={toggleMenu}
              >
                Catégories
              </Link>
              <Link 
                to="/about" 
                className="text-sm font-medium text-white/90 hover:text-primary py-2 px-4 rounded-md hover:bg-white/5"
                onClick={toggleMenu}
              >
                À propos
              </Link>
              <Link 
                to="/contact" 
                className="text-sm font-medium text-white/90 hover:text-primary py-2 px-4 rounded-md hover:bg-white/5"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
