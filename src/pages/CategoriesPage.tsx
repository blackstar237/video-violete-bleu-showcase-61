
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/videoService";
import { Skeleton } from "@/components/ui/skeleton";

const CategoriesPage = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  return (
    <>
      <Navbar />
      
      <main className="relative bg-theme-dark min-h-screen pt-24">
        {/* Gradient background overlay */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-black">
            {/* Red glow in top left corner */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-red-600/60 via-red-900/20 to-transparent"></div>
            {/* Blue glow in bottom right corner */}
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-500/60 via-blue-900/20 to-transparent"></div>
          </div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 py-12">
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
            {isLoading ? (
              // Affichage des skeletons pendant le chargement
              Array.from({ length: 6 }).map((_, index) => (
                <Skeleton 
                  key={index} 
                  className="rounded-lg h-80"
                />
              ))
            ) : (
              categories?.map((category) => (
                <Link 
                  to={`/categories/${category.slug}`}
                  key={category.id} 
                  className="group glass-card overflow-hidden rounded-lg transition-transform hover:scale-[1.02]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={category.banner_url || "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=800&h=600&crop=focalpoint"} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
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
              ))
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default CategoriesPage;
