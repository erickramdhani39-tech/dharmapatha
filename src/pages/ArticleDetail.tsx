import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  image_url: string;
  created_at: string;
  author_id: string;
  category: string;
  target_audience: string;
}

interface Author {
  full_name: string;
  avatar_url: string;
}

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Fetch article
        const { data: articleData, error: articleError } = await supabase
          .from("career_guides")
          .select("*")
          .eq("id", parseInt(id || "0"))
          .single();

        if (articleError) throw articleError;

        setArticle(articleData);

        // Process image URL
        if (articleData.image_url) {
          const processedUrl = articleData.image_url.startsWith("http")
            ? articleData.image_url
            : supabase.storage
                .from("career_guides")
                .getPublicUrl(articleData.image_url).data.publicUrl;
          setImageUrl(processedUrl);
        }

        // Fetch author profile
        if (articleData.author_id) {
          const { data: authorData, error: authorError } = await supabase
            .from("profiles")
            .select("full_name, avatar_url")
            .eq("user_id", articleData.author_id)
            .single();

          if (!authorError && authorData) {
            setAuthor(authorData);
          }
        }
      } catch (error: any) {
        console.error("Error fetching article:", error);
        toast.error("Gagal memuat artikel");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Skeleton className="h-8 w-24 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Artikel tidak ditemukan</h2>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {article.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {article.description}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(article.created_at).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            {author && (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={author.avatar_url} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span>{author.full_name || "Admin"}</span>
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {imageUrl && (
          <div className="mb-12 rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt={article.title}
              className="w-full h-auto object-cover max-h-[600px]"
            />
          </div>
        )}

        {/* Article Content */}
        <Card className="p-8 mb-12">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown>{article.content || article.description}</ReactMarkdown>
          </div>
        </Card>

        {/* Author Card */}
        {author && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tentang Penulis</h3>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={author.avatar_url} />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg">{author.full_name || "Admin"}</p>
                <p className="text-sm text-muted-foreground">Career Consultant</p>
              </div>
            </div>
          </Card>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Card className="p-8 bg-primary/5">
            <h3 className="text-2xl font-bold mb-4">Butuh Konsultasi Karier?</h3>
            <p className="text-muted-foreground mb-6">
              Diskusikan rencana karier Anda dengan konsultan profesional kami
            </p>
            <Link to="/konsultasi">
              <Button size="lg">Jadwalkan Konsultasi Gratis</Button>
            </Link>
          </Card>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
