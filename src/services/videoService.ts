
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

export interface VideoCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  banner_url: string | null;
}

export interface Video {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  video_url: string;
  duration: string | null;
  views: number | null;
  category_id: string | null;
  client: string | null;
  upload_date: string | null;
  video_categories?: VideoCategory;
}

type VideoResponse = Database['public']['Tables']['videos']['Row'] & {
  video_categories?: Database['public']['Tables']['video_categories']['Row'];
};

export async function getVideos(): Promise<Video[]> {
  try {
    const { data, error } = await supabase
      .from("videos")
      .select(`
        *,
        video_categories (
          *
        )
      `)
      .order('upload_date', { ascending: false });

    if (error) {
      console.error("Erreur lors du chargement des vidéos:", error);
      toast.error("Impossible de charger les vidéos");
      return [];
    }

    return (data as VideoResponse[]).map(video => ({
      ...video,
      video_categories: video.video_categories as VideoCategory
    }));
  } catch (err) {
    console.error("Erreur:", err);
    toast.error("Impossible de charger les vidéos");
    return [];
  }
}

export async function getVideoById(id: string): Promise<Video | null> {
  try {
    const { data, error } = await supabase
      .from("videos")
      .select(`
        *,
        video_categories (
          *
        )
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.error("Erreur lors du chargement de la vidéo:", error);
      toast.error("Impossible de charger la vidéo");
      return null;
    }

    // Incrémenter le compteur de vues
    await incrementViews(id);

    const videoResponse = data as VideoResponse;
    return {
      ...videoResponse,
      video_categories: videoResponse.video_categories as VideoCategory
    };
  } catch (err) {
    console.error("Erreur:", err);
    toast.error("Impossible de charger la vidéo");
    return null;
  }
}

export async function incrementViews(id: string) {
  try {
    const { error } = await supabase.rpc("increment_video_views", { video_id: id });

    if (error) {
      console.error("Erreur lors de l'incrémentation des vues:", error);
    }
  } catch (err) {
    console.error("Erreur:", err);
  }
}

export async function getVideosByCategory(categorySlug: string): Promise<Video[]> {
  try {
    const { data: category, error: categoryError } = await supabase
      .from("video_categories")
      .select("id")
      .eq("slug", categorySlug)
      .single();

    if (categoryError || !category) {
      console.error("Erreur lors du chargement de la catégorie:", categoryError);
      toast.error("Catégorie non trouvée");
      return [];
    }

    const { data, error } = await supabase
      .from("videos")
      .select(`
        *,
        video_categories (
          *
        )
      `)
      .eq("category_id", category.id)
      .order('upload_date', { ascending: false });

    if (error) {
      console.error("Erreur lors du chargement des vidéos par catégorie:", error);
      toast.error("Impossible de charger les vidéos");
      return [];
    }

    return (data as VideoResponse[]).map(video => ({
      ...video,
      video_categories: video.video_categories as VideoCategory
    }));
  } catch (err) {
    console.error("Erreur:", err);
    toast.error("Impossible de charger les vidéos");
    return [];
  }
}

export async function getCategories(): Promise<VideoCategory[]> {
  try {
    const { data, error } = await supabase
      .from("video_categories")
      .select("*")
      .order('name');

    if (error) {
      console.error("Erreur lors du chargement des catégories:", error);
      toast.error("Impossible de charger les catégories");
      return [];
    }

    return data as VideoCategory[];
  } catch (err) {
    console.error("Erreur:", err);
    toast.error("Impossible de charger les catégories");
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<VideoCategory | null> {
  try {
    const { data, error } = await supabase
      .from("video_categories")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Erreur lors du chargement de la catégorie:", error);
      toast.error("Impossible de trouver la catégorie");
      return null;
    }

    return data as VideoCategory;
  } catch (err) {
    console.error("Erreur:", err);
    toast.error("Impossible de charger la catégorie");
    return null;
  }
}
