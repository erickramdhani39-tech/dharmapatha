-- Allow users to view their own consultations based on email
CREATE POLICY "Users can view their own consultations"
ON public.consultation
FOR SELECT
USING (auth.jwt() ->> 'email' = email);