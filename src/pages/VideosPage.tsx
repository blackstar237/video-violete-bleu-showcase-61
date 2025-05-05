
import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoGrid from "@/components/VideoGrid";
import CategoryFilter from "@/components/CategoryFilter";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getCategories, getVideos } from "@/services/videoService";
import { Skeleton } from "@/components/ui/skeleton";

const VideosPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const { data: videos, isLoading: isVideosLoading } = useQuery({
    queryKey: ['videos'],
    queryFn: getVideos
  });

  const filteredVideos = useMemo(() => {
    if (!videos) return [];
    
    let filtered = videos;
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(video => 
        video.video_categories?.slug === selectedCategory
      );
    }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        video => 
          video.title.toLowerCase().includes(query) || 
          video.video_categories?.name.toLowerCase().includes(query) ||
          (video.description && video.description.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [videos, selectedCategory, searchQuery]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Navbar />
      
      <main className="bg-theme-dark min-h-screen pt-24">
        <div className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Notre collection de <span className="text-gradient">vidéos</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Explorez nos réalisations dans différentes catégories et découvrez comment nous pouvons vous aider à communiquer efficacement à travers la vidéo.
            </p>
          </div>
          
          {/* Search & Filters */}
          <div className="mb-10">
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
              <Input
                type="text"
                placeholder="Rechercher une vidéo..."
                className="pl-10 bg-white/5 border-white/10 placeholder:text-white/40 focus:border-primary w-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            {isCategoriesLoading ? (
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map(i => (
                  <Skeleton key={i} className="h-10 w-24 rounded-full" />
                ))}
              </div>
            ) : (
              <CategoryFilter
                categories={[
                  { id: "all", name: "Toutes" },
                  ...(categories?.map(cat => ({
                    id: cat.slug,
                    name: cat.name
                  })) || [])
                ]}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
                className="justify-center"
              />
            )}
          </div>
          
          {/* Video Grid */}
          {isVideosLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 8, 12].map(i => (
                <Skeleton key={i} className="h-64 w-full rounded-lg" />
              ))}
            </div>
          ) : filteredVideos.length > 0 ? (
            <VideoGrid videos={filteredVideos.map(video => ({
              id: video.id,
              title: video.title,
              thumbnail: video.thumbnail_url || "",
              category: video.video_categories?.name || "",
              duration: video.duration || ""
            }))} columns={4} />
          ) : (
            <div className="text-center py-16">
              <p className="text-white/70 text-lg">Aucune vidéo ne correspond à votre recherche.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default VideosPage;
