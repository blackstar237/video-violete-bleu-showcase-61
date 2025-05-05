
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoHero from "@/components/VideoHero";
import VideoGrid from "@/components/VideoGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getCategories, getVideos } from "@/services/videoService";
import { Skeleton } from "@/components/ui/skeleton";

// Données fictives pour la présentation héro (à remplacer par des données réelles ultérieurement)
const featuredVideo = {
  id: "featured-1",
  title: "Production de qualité professionnelle pour votre entreprise",
  description: "Découvrez comment nos productions vidéo de haute qualité peuvent transformer votre marketing et aider votre entreprise à se démarquer.",
  backgroundUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1920",
};

const Index = () => {
  const { data: videos, isLoading: isVideosLoading } = useQuery({
    queryKey: ['recentVideos'],
    queryFn: getVideos,
    select: data => data?.slice(0, 6) // Prendre les 6 premières vidéos
  });

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['featuredCategories'],
    queryFn: getCategories,
    select: data => data?.slice(0, 4) // Prendre les 4 premières catégories
  });

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <VideoHero 
        id={featuredVideo.id}
        title={featuredVideo.title}
        description={featuredVideo.description}
        backgroundUrl={featuredVideo.backgroundUrl}
      />
      
      {/* Recent Videos */}
      <section className="py-16 bg-theme-dark">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gradient">Vidéos récentes</h2>
            <Link to="/videos">
              <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-white/5">
                Voir tout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {isVideosLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} className="h-64 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <VideoGrid videos={(videos || []).map(video => ({
              id: video.id,
              title: video.title,
              thumbnail: video.thumbnail_url || "",
              category: video.video_categories?.name || "",
              duration: video.duration || ""
            }))} />
          )}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-theme-blue-dark relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-theme-violet-light to-transparent opacity-30"></div>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-white">
            Explorez nos <span className="text-gradient">catégories</span>
          </h2>
          
          {isCategoriesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-64 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(categories || []).map((category) => (
                <Link 
                  to={`/categories/${category.slug}`} 
                  key={category.id}
                  className="group glass-card overflow-hidden rounded-lg p-6 transition-transform hover:transform hover:scale-[1.02]"
                >
                  <div className="mb-4 overflow-hidden rounded-md">
                    <img 
                      src={category.banner_url || `https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&h=600&crop=focalpoint`} 
                      alt={category.name}
                      className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description || `Découvrez notre sélection de vidéos ${category.name}.`}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-theme-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-theme-violet-dark/20 to-theme-blue-dark/20 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Prêt à transformer votre <span className="text-gradient">communication visuelle</span>?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Discutons de votre prochain projet et voyons comment nos services de production vidéo peuvent répondre à vos besoins.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Contactez-nous
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Index;
