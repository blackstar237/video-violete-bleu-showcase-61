
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";
import VideoGrid from "@/components/VideoGrid";
import { Link } from "react-router-dom";
import { Calendar, Clock, Eye, User } from "lucide-react";

// Données fictives pour la démonstration
const videoData = {
  id: "video-1",
  title: "Présentation produit - XYZ Technologies",
  description: "Découvrez les nouvelles fonctionnalités innovantes de la dernière gamme de produits XYZ Technologies. Cette présentation vidéo explore en détail les caractéristiques clés, les avantages pour les utilisateurs et les cas d'utilisation pratiques.",
  videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-a-new-project-1707-large.mp4",
  thumbnail: "https://images.unsplash.com/photo-1626908013351-800ddd734b8a?w=800&h=600&crop=focalpoint",
  category: "Produits",
  duration: "2:15",
  views: "1.2k",
  uploadDate: "15 Avr 2023",
  client: "XYZ Technologies"
};

const relatedVideos = [
  {
    id: "video-2",
    title: "Témoignage client - Success Corp",
    thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&crop=focalpoint",
    category: "Témoignages",
    duration: "3:42",
  },
  {
    id: "video-3",
    title: "Événement d'entreprise - Lancement 2023",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&crop=focalpoint",
    category: "Événements",
    duration: "4:30",
  },
  {
    id: "video-4",
    title: "Série sociale - Conseils d'experts",
    thumbnail: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=600&crop=focalpoint",
    category: "Réseaux sociaux",
    duration: "1:45",
  }
];

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(videoData);
  
  // En production, vous voudriez charger la vidéo en fonction de l'ID
  useEffect(() => {
    // Simulation d'une requête API
    console.log(`Loading video with id: ${id}`);
    // Dans une application réelle, vous feriez un fetch ici
  }, [id]);

  return (
    <>
      <Navbar />
      
      <main className="pt-16 bg-theme-dark">
        <div className="container mx-auto px-4 py-8">
          {/* Video Player Section */}
          <div className="w-full aspect-video mb-6">
            <VideoPlayer 
              src={video.videoSrc} 
              poster={video.thumbnail}
              title={video.title}
              className="w-full h-full rounded-lg overflow-hidden shadow-lg"
            />
          </div>
          
          {/* Video Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">{video.title}</h1>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6 text-sm text-white/60">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{video.duration}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{video.views} vues</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{video.uploadDate}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>Client: {video.client}</span>
                </div>
                <Link 
                  to={`/categories/${video.category.toLowerCase()}`}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-theme-violet-light/20 text-theme-violet-light hover:bg-theme-violet-light/30 transition-colors"
                >
                  {video.category}
                </Link>
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
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Vidéos similaires</h2>
            <VideoGrid videos={relatedVideos} columns={3} />
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default VideoPage;
