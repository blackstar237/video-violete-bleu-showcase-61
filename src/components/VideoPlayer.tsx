
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
}

type PlaybackQuality = '720p' | '480p' | '360p' | 'auto';

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  title,
  className,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [buffered, setBuffered] = useState<TimeRanges | null>(null);
  const [loading, setLoading] = useState(false);
  const [playbackQuality, setPlaybackQuality] = useState<PlaybackQuality>('auto');
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Play/Pause
    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Playback started successfully
        }).catch(error => {
          console.error("Error playing video:", error);
          setIsPlaying(false);
          toast.error("Erreur de lecture vidéo");
        });
      }
    } else {
      video.pause();
    }
    
    // Volume
    video.volume = isMuted ? 0 : volume;
    
    // Playback quality handling (this would be expanded with actual quality selection if using HLS/DASH)
    if (playbackQuality !== 'auto') {
      // This is where we would actually change quality in an adaptive streaming setup
      console.log(`Quality set to ${playbackQuality}`);
    }
  }, [isPlaying, volume, isMuted, playbackQuality]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleProgress = () => {
      setBuffered(video.buffered);
    };

    const handleWaiting = () => {
      setLoading(true);
    };

    const handleCanPlay = () => {
      setLoading(false);
    };

    const handlePlaying = () => {
      setLoading(false);
    };

    // Add event listeners
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handlePlaying);

    // Optimize video loading
    video.preload = "auto";
    
    // Clean up
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('playing', handlePlaying);
    };
  }, []);

  useEffect(() => {
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
    }

    if (isPlaying && !isHovering) {
      controlsTimerRef.current = setTimeout(() => {
        setIsControlsVisible(false);
      }, 3000);
    } else {
      setIsControlsVisible(true);
    }

    return () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, [isPlaying, isHovering]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!playerRef.current) return;

    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const skipForward = () => {
    if (videoRef.current) {
      const newTime = Math.min(videoRef.current.currentTime + 10, duration);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      const newTime = Math.max(videoRef.current.currentTime - 10, 0);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const changeQuality = (quality: PlaybackQuality) => {
    setPlaybackQuality(quality);
    toast.success(`Qualité vidéo réglée sur ${quality}`);
  };

  // Calculate buffered progress
  const getBufferedTime = () => {
    if (!buffered || buffered.length === 0) return 0;
    
    for (let i = 0; i < buffered.length; i++) {
      if (currentTime >= buffered.start(i) && currentTime <= buffered.end(i)) {
        return buffered.end(i);
      }
    }
    return 0;
  };

  const bufferPercentage = duration ? (getBufferedTime() / duration) * 100 : 0;

  return (
    <div 
      ref={playerRef}
      className={cn(
        'relative group overflow-hidden rounded-lg bg-black',
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={() => {
        setIsControlsVisible(true);
        if (controlsTimerRef.current) {
          clearTimeout(controlsTimerRef.current);
        }
        if (isPlaying) {
          controlsTimerRef.current = setTimeout(() => {
            setIsControlsVisible(false);
          }, 3000);
        }
      }}
    >
      <video 
        ref={videoRef} 
        src={src} 
        poster={poster} 
        className="w-full h-full object-contain"
        onClick={togglePlay}
        preload="auto"
        playsInline
      />

      {/* Loading indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Video Title */}
      {title && (
        <div 
          className={cn(
            'absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300',
            isControlsVisible ? 'opacity-100' : 'opacity-0'
          )}
        >
          <h3 className="text-white text-lg font-medium">{title}</h3>
        </div>
      )}

      {/* Play/Pause Overlay Button (center) */}
      <div 
        className={cn(
          'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
          isPlaying && !isHovering ? 'opacity-0' : 'opacity-100'
        )}
      >
        <button 
          className="h-16 w-16 flex items-center justify-center rounded-full bg-primary/80 text-white hover:bg-primary transition-colors"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" fill="white" />}
        </button>
      </div>

      {/* Controls */}
      <div 
        className={cn(
          'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 py-2 transition-opacity duration-300',
          isControlsVisible ? 'opacity-100' : 'opacity-0'
        )}
      >
        {/* Progress bar container */}
        <div className="relative mb-2 h-2">
          {/* Buffer indicator */}
          <div 
            className="absolute top-0 left-0 h-2 bg-white/20 rounded-full"
            style={{ width: `${bufferPercentage}%` }}
          ></div>
          
          {/* Progress slider */}
          <Slider
            value={[currentTime]} 
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              className="text-white hover:text-primary transition-colors"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            
            <button 
              className="text-white hover:text-primary transition-colors"
              onClick={skipBackward}
            >
              <SkipBack className="h-5 w-5" />
            </button>
            
            <button 
              className="text-white hover:text-primary transition-colors"
              onClick={skipForward}
            >
              <SkipForward className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-2 ml-2">
              <button 
                className="text-white hover:text-primary transition-colors"
                onClick={toggleMute}
              >
                {isMuted || volume === 0 ? 
                  <VolumeX className="h-5 w-5" /> : 
                  <Volume2 className="h-5 w-5" />
                }
              </button>
              
              <div className="w-20 hidden sm:block">
                <Slider
                  value={[isMuted ? 0 : volume]} 
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>
            
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-primary transition-colors">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => changeQuality('auto')} className={playbackQuality === 'auto' ? 'bg-accent' : ''}>
                  Auto
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeQuality('720p')} className={playbackQuality === '720p' ? 'bg-accent' : ''}>
                  720p
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeQuality('480p')} className={playbackQuality === '480p' ? 'bg-accent' : ''}>
                  480p
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeQuality('360p')} className={playbackQuality === '360p' ? 'bg-accent' : ''}>
                  360p
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button 
              className="text-white hover:text-primary transition-colors"
              onClick={toggleFullscreen}
            >
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
