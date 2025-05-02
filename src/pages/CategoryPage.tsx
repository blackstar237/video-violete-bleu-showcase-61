
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoGrid from "@/components/VideoGrid";

// Données fictives pour la démonstration
const categoryData = {
  corporate: {
    title: "Corporate",
    description: "Vidéos professionnelles mettant en valeur votre entreprise, votre culture et vos messages clés.",
    banner: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=1920"
  },
  events: {
    title: "Événements",
    description: "Captations professionnelles de vos événements d'entreprise, conférences et lancements.",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920"
  },
  products: {
    title: "Produits",
    description: "Présentations visuelles attrayantes pour mettre en valeur les caractéristiques de vos produits.",
    banner: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=1920"
  },
  social: {
    title: "Réseaux sociaux",
    description: "Contenus courts et impactants optimisés pour toutes les plateformes sociales.",
    banner: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1920"
  }
};

const allVideos = [
  {
    id: "video-1",
    title: "Présentation produit - XYZ Technologies",
    thumbnail: "https://images.unsplash.com/photo-1626908013351-800ddd734b8a?w=800&h=600&crop=focalpoint",
    category: "products",
    categoryName: "Produits",
    duration: "2:15",
  },
  {
    id: "video-2",
    title: "Témoignage client - Success Corp",
    thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&crop=focalpoint",
    category: "testimonials",
    categoryName: "Témoignages",
    duration: "3:42",
  },
  {
    id: "video-3",
    title: "Événement d'entreprise - Lancement 2023",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&crop=focalpoint",
    category: "events",
    categoryName: "Événements",
    duration: "4:30",
  },
  {
    id: "video-4",
    title: "Série sociale - Conseils d'experts",
    thumbnail: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=600&crop=focalpoint",
    category: "social",
    categoryName: "Réseaux sociaux",
    duration: "1:45",
  },
  {
    id: "video-5",
    title: "Behind the scenes - Studio Tour 2023",
    thumbnail: "https://images.unsplash.com/photo-1571331246630-de4d4b8a0ddf?w=800&h=600&crop=focalpoint",
    category: "corporate",
    categoryName: "Corporate",
    duration: "5:12",
  },
  {
    id: "video-6",
    title: "Animation 3D - Vision du futur",
    thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&h=600&crop=focalpoint",
    category: "animation",
    categoryName: "Animation",
    duration: "2:30",
  },
  {
    id: "video-7",
    title: "Formation - Nouvelles technologies",
    thumbnail: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=800&h=600&crop=focalpoint",
    category: "educational",
    categoryName: "Formation",
    duration: "8:45",
  },
  {
    id: "video-8",
    title: "Publicité TV - Campagne été 2023",
    thumbnail: "https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=800&h=600&crop=focalpoint",
    category: "advertising",
    categoryName: "Publicité",
    duration: "0:30",
  },
  {
    id: "video-9",
    title: "Interview - CEO Vision 2024",
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&crop=focalpoint",
    category: "corporate",
    categoryName: "Corporate",
    duration: "6:20",
  },
];

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [categoryInfo, setCategoryInfo] = useState<{
    title: string;
    description: string;
    banner: string;
  } | null>(null);
  
  const [categoryVideos, setCategoryVideos] = useState<any[]>([]);
  
  useEffect(() => {
    // En production, vous feriez une requête API ici
    if (id && categoryData[id as keyof typeof categoryData]) {
      setCategoryInfo(categoryData[id as keyof typeof categoryData]);
      
      // Filtrer les vidéos par catégorie
      const filtered = allVideos.filter(video => video.category === id);
      setCategoryVideos(filtered);
    }
  }, [id]);
  
  if (!categoryInfo) {
    return (
      <>
        <Navbar />
        <div className="bg-theme-dark min-h-screen pt-24">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold text-white">Catégorie non trouvée</h1>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      
      <main className="bg-theme-dark min-h-screen">
        {/* Category Hero */}
        <section className="relative h-80 lg:h-96 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-theme-dark/60 via-theme-dark/80 to-theme-dark z-10"></div>
            <img 
              src={categoryInfo.banner} 
              alt={categoryInfo.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-20 flex h-full w-full items-end">
            <div className="container mx-auto px-4 pb-10 pt-24">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Catégorie : <span className="text-gradient">{categoryInfo.title}</span>
              </h1>
              <p className="text-white/70 max-w-2xl">
                {categoryInfo.description}
              </p>
            </div>
          </div>
        </section>
        
        {/* Videos */}
        <section className="container mx-auto px-4 py-12">
          {categoryVideos.length > 0 ? (
            <VideoGrid videos={categoryVideos.map(video => ({
              id: video.id,
              title: video.title,
              thumbnail: video.thumbnail,
              category: video.categoryName,
              duration: video.duration
            }))} columns={3} />
          ) : (
            <div className="text-center py-16">
              <p className="text-white/70 text-lg">
                Aucune vidéo n'est disponible dans cette catégorie pour le moment.
              </p>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default CategoryPage;
