-- Add image_url column to career_guides table
ALTER TABLE public.career_guides 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Create RLS policies for career_guides bucket
CREATE POLICY "Public can view career guide images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'career_guides');

CREATE POLICY "Authenticated users can upload career guide images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'career_guides' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update their career guide images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'career_guides' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete career guide images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'career_guides' 
  AND auth.role() = 'authenticated'
);