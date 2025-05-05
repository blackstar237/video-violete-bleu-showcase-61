
-- Fonction pour incrémenter le compteur de vues sur une vidéo
CREATE OR REPLACE FUNCTION increment_video_views(video_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE videos
  SET views = views + 1
  WHERE id = video_id;
END;
$$;
