-- Fix 1: Restrict profiles table access to own profile only
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Fix 2: Restrict storage bucket access to admins only
DROP POLICY IF EXISTS "Authenticated users can upload career guide images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update their career guide images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete career guide images" ON storage.objects;

CREATE POLICY "Admins can upload career guide images" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (
  bucket_id = 'career_guides' AND 
  public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update career guide images" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (
  bucket_id = 'career_guides' AND 
  public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete career guide images" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (
  bucket_id = 'career_guides' AND 
  public.has_role(auth.uid(), 'admin'::app_role)
);

-- Keep public read access for career guides bucket
CREATE POLICY "Anyone can view career guide images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'career_guides');