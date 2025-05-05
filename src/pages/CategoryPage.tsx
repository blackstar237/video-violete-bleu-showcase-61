import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoGrid from "@/components/VideoGrid";
import { getCategoryBySlug, getVideosByCategory, Video } from "@/services/videoService";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: category, isLoading: isCategoryLoading, error: categoryError } = useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategoryBySlug(id as string),
    enabled: !!id,
  });
  
  const { data: videos, isLoading: isVideosLoading } = useQuery({
    queryKey: ['categoryVideos', id],
    queryFn: () => getVideosByCategory(id as string),
    enabled: !!id,
  });

  if (isCategoryLoading) {
    return (
      <>
        <Navbar />
        <div className="bg-theme-dark min-h-screen pt-24">
          <Skeleton className="h-80 w-full mb-8" />
          <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-64 mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} className="h-64 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (categoryError || !category) {
    return (
      <>
        <Navbar />
        <div className="bg-theme-dark min-h-screen pt-24">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold text-white">Catégorie non trouvée</h1>
            <Link to="/categories" className="text-primary hover:underline mt-4 inline-block">
              Voir toutes les catégories
            </Link>
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
              src={category.banner_url || "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=1920"} 
              alt={category.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-20 flex h-full w-full items-end">
            <div className="container mx-auto px-4 pb-10 pt-24">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Catégorie : <span className="text-gradient">{category.name}</span>
              </h1>
              <p className="text-white/70 max-w-2xl">
                {category.description}
              </p>
            </div>
          </div>
        </section>
        
        {/* Videos */}
        <section className="container mx-auto px-4 py-12">
          {isVideosLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} className="h-64 w-full rounded-lg" />
              ))}
            </div>
          ) : videos && videos.length > 0 ? (
            <VideoGrid videos={(videos as Video[]).map((video: Video) => ({
              id: video.id,
              title: video.title,
              thumbnail: video.thumbnail_url || "",
              category: video.video_categories?.name || category.name,
              duration: video.duration || ""
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
