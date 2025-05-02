
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoGrid from "@/components/VideoGrid";
import CategoryFilter from "@/components/CategoryFilter";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Données fictives pour la démonstration
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
  {
    id: "video-10",
    title: "Documentaire - Processus de fabrication",
    thumbnail: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&crop=focalpoint",
    category: "documentary",
    categoryName: "Documentaire",
    duration: "12:45",
  },
  {
    id: "video-11",
    title: "Présentation produit - Série écologique",
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&crop=focalpoint",
    category: "products",
    categoryName: "Produits",
    duration: "2:50",
  },
  {
    id: "video-12",
    title: "Témoignage - Transformation digitale",
    thumbnail: "https://images.unsplash.com/photo-1573164574511-73c773193279?w=800&h=600&crop=focalpoint",
    category: "testimonials",
    categoryName: "Témoignages",
    duration: "4:15",
  },
];

const categories = [
  { id: "corporate", name: "Corporate" },
  { id: "events", name: "Événements" },
  { id: "products", name: "Produits" },
  { id: "social", name: "Réseaux sociaux" },
  { id: "animation", name: "Animation" },
  { id: "testimonials", name: "Témoignages" },
  { id: "educational", name: "Formation" },
  { id: "advertising", name: "Publicité" },
  { id: "documentary", name: "Documentaire" },
];

const VideosPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVideos, setFilteredVideos] = useState(allVideos);

  useEffect(() => {
    let filtered = allVideos;
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        video => 
          video.title.toLowerCase().includes(query) || 
          video.categoryName.toLowerCase().includes(query)
      );
    }
    
    setFilteredVideos(filtered);
  }, [selectedCategory, searchQuery]);

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
            
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
              className="justify-center"
            />
          </div>
          
          {/* Video Grid */}
          {filteredVideos.length > 0 ? (
            <VideoGrid videos={filteredVideos.map(video => ({
              id: video.id,
              title: video.title,
              thumbnail: video.thumbnail,
              category: video.categoryName,
              duration: video.duration
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
