
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  duration: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  title,
  thumbnail,
  category,
  duration,
  className,
  size = 'medium'
}) => {
  return (
    <Link to={`/video/${id}`} className={cn(
      'group relative block overflow-hidden rounded-lg transition-all duration-300',
      size === 'small' ? 'h-48' : size === 'medium' ? 'h-64' : 'h-80',
      'hover:shadow-lg hover:shadow-primary/10',
      className
    )}>
      {/* Thumbnail */}
      <div className="absolute inset-0">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90"></div>
      </div>

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="rounded-full bg-primary/80 p-3 backdrop-blur-sm">
          <Play className="h-6 w-6 text-white" fill="white" />
        </div>
      </div>

      {/* Duration */}
      <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm flex items-center">
        <Clock className="h-3 w-3 mr-1" />
        {duration}
      </div>

      {/* Category */}
      <div className="absolute top-2 left-2">
        <span className="inline-block bg-theme-violet-light/70 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-md">
          {category}
        </span>
      </div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-medium line-clamp-2 text-sm md:text-base group-hover:text-theme-violet-light transition-colors">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default VideoCard;
