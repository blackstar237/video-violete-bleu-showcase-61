
import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoHeroProps {
  id: string;
  title: string;
  description: string;
  backgroundUrl: string;
}

const VideoHero: React.FC<VideoHeroProps> = ({
  id,
  title,
  description,
  backgroundUrl,
}) => {
  // ID fixe pour la redirection vers la vidéo spécifique
  const targetVideoId = "1c2c399c-473e-45a8-9e2a-5ffe0720c584";
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background with red and blue gradient effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black">
          {/* Red glow in corner */}
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-red-600/70 via-red-900/30 to-transparent"></div>
          {/* Blue glow in corner */}
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-500/70 via-blue-900/30 to-transparent"></div>
          {/* Additional dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-theme-dark/60 via-theme-dark/80 to-theme-dark z-10"></div>
        </div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
          poster={backgroundUrl}
          preload="auto"
        >
          <source src={backgroundUrl} type="video/mp4" />
          <img src={backgroundUrl} alt={title} className="w-full h-full object-cover" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 flex h-full w-full items-center justify-center">
        <div className="container mx-auto px-4 pt-24 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link to={`/video/${targetVideoId}`}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-black">
                <Play className="mr-2 h-5 w-5" />
                Regarder la vidéo
              </Button>
            </Link>
            <Link to="/videos">
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                Voir toutes les vidéos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;
