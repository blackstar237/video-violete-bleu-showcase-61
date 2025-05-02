
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  { 
    id: "corporate", 
    name: "Corporate", 
    description: "Vidéos de présentation d'entreprise et communication interne.",
    count: 12,
    thumbnail: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&h=600&crop=focalpoint" 
  },
  { 
    id: "events", 
    name: "Événements", 
    description: "Couverture de vos événements professionnels et cérémonies.",
    count: 8,
    thumbnail: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&crop=focalpoint" 
  },
  { 
    id: "products", 
    name: "Produits", 
    description: "Mettez en valeur vos produits avec des vidéos de qualité.",
    count: 15,
    thumbnail: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=800&h=600&crop=focalpoint" 
  },
  { 
    id: "social", 
    name: "Réseaux sociaux", 
    description: "Contenu optimisé pour toutes les plateformes sociales.",
    count: 24,
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&crop=focalpoint" 
  },
  { 
    id: "animation", 
    name: "Animation", 
    description: "Animations 2D/3D et motion design créatif.",
    count: 7,
    thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&h=600&crop=focalpoint" 
  },
  { 
    id: "testimonials", 
    name: "Témoignages", 
    description: "Témoignages clients et success stories.",
    count: 9,
    thumbnail: "https://images.unsplash.com/photo-1573164574511-73c773193279?w=800&h=600&crop=focalpoint" 
  },
  { 
    id: "educational", 
    name: "Formation", 
    description: "Vidéos éducatives et tutoriels.",
    count: 6,
    thumbnail: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=800&h=600&crop=focalpoint" 
  },
  { 
    id: "advertising", 
    name: "Publicité", 
    description: "Spots publicitaires pour TV et web.",
    count: 11,
    thumbnail: "https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=800&h=600&crop=focalpoint" 
  },
  { 
    id: "documentary", 
    name: "Documentaire", 
    description: "Formats longs et storytelling approfondi.",
    count: 5,
    thumbnail: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&crop=focalpoint" 
  },
];

const CategoriesPage = () => {
  return (
    <>
      <Navbar />
      
      <main className="bg-theme-dark min-h-screen pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Page Title */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Explorez nos <span className="text-gradient">catégories</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Découvrez notre portfolio de vidéos classé par catégories et trouvez l'inspiration pour votre prochain projet.
            </p>
          </div>
          
          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link 
                to={`/categories/${category.id}`}
                key={category.id} 
                className="group glass-card overflow-hidden rounded-lg transition-transform hover:scale-[1.02]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.thumbnail} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block px-3 py-1 bg-theme-violet-light/80 text-white text-sm rounded-full">
                      {category.count} vidéos
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-white/70 mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center text-primary">
                    <span className="text-sm font-medium">Voir les vidéos</span>
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default CategoriesPage;
