-- Create assessments table to store assessment results
CREATE TABLE public.assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  assessment_type TEXT NOT NULL CHECK (assessment_type IN ('fresh_graduate', 'career_switcher')),
  answers JSONB NOT NULL,
  score NUMERIC NOT NULL,
  recommendations TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for unauthenticated users)
CREATE POLICY "Anyone can insert assessments"
ON public.assessments
FOR INSERT
WITH CHECK (true);

-- Users can view their own assessments (by user_id or email)
CREATE POLICY "Users can view their own assessments"
ON public.assessments
FOR SELECT
USING (
  auth.uid() = user_id OR 
  (auth.jwt() ->> 'email') = email
);

-- Admins can view all assessments
CREATE POLICY "Admins can view all assessments"
ON public.assessments
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_assessments_updated_at
BEFORE UPDATE ON public.assessments
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create index for faster queries
CREATE INDEX idx_assessments_user_id ON public.assessments(user_id);
CREATE INDEX idx_assessments_email ON public.assessments(email);
CREATE INDEX idx_assessments_type ON public.assessments(assessment_type);