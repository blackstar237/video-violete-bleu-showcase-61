
import React from 'react';
import VideoCard from './VideoCard';
import { cn } from '@/lib/utils';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  duration: string;
}

interface VideoGridProps {
  videos: Video[];
  className?: string;
  columns?: number;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, className, columns = 3 }) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn(
      'grid gap-4 md:gap-6',
      gridCols[columns as keyof typeof gridCols],
      className
    )}>
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          id={video.id}
          title={video.title}
          thumbnail={video.thumbnail}
          category={video.category}
          duration={video.duration}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
