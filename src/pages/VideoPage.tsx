
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";
import VideoGrid from "@/components/VideoGrid";
import { Calendar, Clock, Eye, User } from "lucide-react";
import { getVideoById, getVideos } from "@/services/videoService";
import { Skeleton } from "@/components/ui/skeleton";

const VideoPage = () => {
  const { id } = useParams();
  
  const { data: video, isLoading: isVideoLoading, error: videoError } = useQuery({
    queryKey: ['video', id],
    queryFn: () => getVideoById(id as string),
    enabled: !!id,
  });
  
  const { data: relatedVideos, isLoading: isRelatedLoading } = useQuery({
    queryKey: ['relatedVideos', video?.category_id],
    queryFn: () => getVideos(),
    select: (data) => {
      // Filtrer pour obtenir des vidéos similaires (même catégorie, mais pas la même vidéo)
      return data
        .filter(v => v.category_id === video?.category_id && v.id !== video?.id)
        .slice(0, 3); // Limiter à 3 vidéos similaires
    },
    enabled: !!video,
  });

  if (isVideoLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-16 bg-theme-dark min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <Skeleton className="w-full aspect-video mb-6" />
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/3 mb-6" />
            <Skeleton className="h-40 w-full" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (videoError || !video) {
    return (
      <>
        <Navbar />
        <main className="pt-16 bg-theme-dark min-h-screen">
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl text-white mb-4">Vidéo non trouvée</h1>
            <Link to="/videos" className="text-primary hover:underline">
              Retour à toutes les vidéos
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Formatage de la date
  const formattedDate = new Date(video.upload_date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <>
      <Navbar />
      
      <main className="pt-16 bg-theme-dark">
        <div className="container mx-auto px-4 py-8">
          {/* Video Player Section */}
          <div className="w-full aspect-video mb-6">
            <VideoPlayer 
              src={video.video_url} 
              poster={video.thumbnail_url || undefined}
              title={video.title}
              className="w-full h-full rounded-lg overflow-hidden shadow-lg"
            />
          </div>
          
          {/* Video Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">{video.title}</h1>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6 text-sm text-white/60">
                {video.duration && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{video.duration}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{video.views} vues</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formattedDate}</span>
                </div>
                {video.client && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>Client: {video.client}</span>
                  </div>
                )}
                {video.video_categories && (
                  <Link 
                    to={`/categories/${video.video_categories.slug}`}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-theme-violet-light/20 text-theme-violet-light hover:bg-theme-violet-light/30 transition-colors"
                  >
                    {video.video_categories.name}
                  </Link>
                )}
              </div>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-white/80 leading-relaxed">{video.description}</p>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Vous souhaitez un projet similaire ?</h3>
              <p className="text-white/70 mb-6">
                Nous pouvons créer des vidéos personnalisées adaptées aux besoins spécifiques de votre entreprise.
              </p>
              <Link 
                to="/contact"
                className="block w-full py-3 px-4 text-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors"
              >
                Demander un devis
              </Link>
            </div>
          </div>
          
          {/* Related Videos */}
          {relatedVideos && relatedVideos.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6">Vidéos similaires</h2>
              {isRelatedLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-64 w-full rounded-lg" />
                  ))}
                </div>
              ) : (
                <VideoGrid 
                  videos={relatedVideos.map(v => ({
                    id: v.id,
                    title: v.title,
                    thumbnail: v.thumbnail_url || "",
                    category: v.video_categories?.name || "",
                    duration: v.duration || ""
                  }))} 
                  columns={3}
                />
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default VideoPage;
