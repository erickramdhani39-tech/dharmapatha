import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Pencil, Trash2, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface CareerGuide {
  id: number;
  title: string;
  description: string;
  category: string;
  target_audience: string;
  image_url: string | null;
  created_at: string;
}

const AdminCareerGuides = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [guides, setGuides] = useState<CareerGuide[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState<CareerGuide | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    target_audience: "",
    image_url: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      checkAdminRole();
    }
  }, [user]);

  const checkAdminRole = async () => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user!.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setIsAdmin(true);
        fetchGuides();
      } else {
        toast({
          title: "Akses Ditolak",
          description: "Anda tidak memiliki akses admin",
          variant: "destructive",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error checking admin role:", error);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchGuides = async () => {
    try {
      const { data, error } = await supabase
        .from("career_guides")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGuides(data || []);
    } catch (error) {
      console.error("Error fetching guides:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data artikel",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("career_guides")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("career_guides")
        .getPublicUrl(filePath);

      return filePath;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Gagal mengupload gambar",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imagePath = formData.image_url;

      if (imageFile) {
        const uploadedPath = await handleImageUpload(imageFile);
        if (uploadedPath) {
          imagePath = uploadedPath;
        }
      }

      if (editingGuide) {
        const { error } = await supabase
          .from("career_guides")
          .update({
            title: formData.title,
            description: formData.description,
            category: formData.category,
            target_audience: formData.target_audience,
            image_url: imagePath,
          })
          .eq("id", editingGuide.id);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "Artikel berhasil diperbarui",
        });
      } else {
        const { error } = await supabase
          .from("career_guides")
          .insert({
            title: formData.title,
            description: formData.description,
            category: formData.category,
            target_audience: formData.target_audience,
            image_url: imagePath,
            author_id: user!.id,
          });

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "Artikel berhasil ditambahkan",
        });
      }

      setDialogOpen(false);
      resetForm();
      fetchGuides();
    } catch (error) {
      console.error("Error saving guide:", error);
      toast({
        title: "Error",
        description: "Gagal menyimpan artikel",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return;

    try {
      const { error } = await supabase
        .from("career_guides")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Artikel berhasil dihapus",
      });

      fetchGuides();
    } catch (error) {
      console.error("Error deleting guide:", error);
      toast({
        title: "Error",
        description: "Gagal menghapus artikel",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (guide: CareerGuide) => {
    setEditingGuide(guide);
    setFormData({
      title: guide.title,
      description: guide.description,
      category: guide.category,
      target_audience: guide.target_audience,
      image_url: guide.image_url || "",
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingGuide(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      target_audience: "",
      image_url: "",
    });
    setImageFile(null);
  };

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Kelola Career Guides</h1>
          <p className="text-muted-foreground mt-2">
            Tambah, edit, dan hapus artikel panduan karir
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Artikel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingGuide ? "Edit Artikel" : "Tambah Artikel Baru"}
              </DialogTitle>
              <DialogDescription>
                Lengkapi form di bawah ini untuk {editingGuide ? "memperbarui" : "menambahkan"} artikel
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tips">Tips</SelectItem>
                    <SelectItem value="panduan">Panduan</SelectItem>
                    <SelectItem value="strategi">Strategi</SelectItem>
                    <SelectItem value="skill">Skill Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="target_audience">Target Audience</Label>
                <Select
                  value={formData.target_audience}
                  onValueChange={(value) => setFormData({ ...formData, target_audience: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresh_graduate">Fresh Graduate</SelectItem>
                    <SelectItem value="switch_career">Switch Career</SelectItem>
                    <SelectItem value="all">Semua</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="image">Upload Gambar</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
                {formData.image_url && !imageFile && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Gambar saat ini: {formData.image_url}
                  </p>
                )}
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingGuide ? "Perbarui" : "Simpan"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Card key={guide.id}>
            <CardHeader>
              {guide.image_url && (
                <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={supabase.storage.from("career_guides").getPublicUrl(guide.image_url).data.publicUrl}
                    alt={guide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardTitle className="line-clamp-2">{guide.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {guide.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {guide.category}
                </span>
                <span className="text-xs bg-secondary/10 text-secondary-foreground px-2 py-1 rounded">
                  {guide.target_audience}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(guide)}
                  className="flex-1"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(guide.id)}
                  className="flex-1"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {guides.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Belum ada artikel</p>
            <p className="text-muted-foreground mb-4">
              Mulai dengan menambahkan artikel pertama Anda
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminCareerGuides;
