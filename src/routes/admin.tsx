import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Upload, X, Loader2, LogOut, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { collections } from "@/data/collections";
import { formatPrice, type ProductColor, type ProductRow } from "@/data/products";
import { resolveProductImage } from "@/data/product-images";
import {
  adminStatusFn,
  adminLoginFn,
  adminLogoutFn,
  listProducts,
  createProductFn,
  updateProductFn,
  deleteProductFn,
  uploadImageFn,
} from "@/lib/products.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Jagannath Handloom" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const collectionCategory: Record<string, string> = {
  "handloom-sarees": "Saree",
  "gopi-dresses": "Gopi Dress",
  "devotional-wear": "Devotional Wear",
  "dhuti-collection": "Dhuti",
  "kurta-collection": "Kurta",
  "bagalbandhi-collection": "Bagalbandhi",
  "khadi-collection": "Khadi",
  "festival-collection": "Festival",
};

interface FormState {
  name: string;
  collection_slug: string;
  price: string;
  original_price: string;
  fabric: string;
  description: string;
  is_best_seller: boolean;
  colors: ProductColor[];
  images: string[];
}

function emptyForm(): FormState {
  return {
    name: "",
    collection_slug: collections[0]?.slug ?? "",
    price: "",
    original_price: "",
    fabric: "",
    description: "",
    is_best_seller: false,
    colors: [{ name: "Deep Maroon", hex: "#6D1F2F" }],
    images: [],
  };
}

function rowToForm(row: ProductRow): FormState {
  return {
    name: row.name,
    collection_slug: row.collection_slug,
    price: String(row.price),
    original_price: String(row.original_price),
    fabric: row.fabric,
    description: row.description,
    is_best_seller: row.is_best_seller,
    colors: (row.colors ?? []).length ? row.colors! : [{ name: "", hex: "#6D1F2F" }],
    images: (row.gallery ?? []).length ? row.gallery! : row.image ? [row.image] : [],
  };
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function AdminPage() {
  const statusFn = useServerFn(adminStatusFn);
  const status = useQuery({ queryKey: ["admin-status"], queryFn: () => statusFn() });

  if (status.isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-maroon" />
      </div>
    );
  }

  return status.data?.isAdmin ? <Dashboard /> : <LoginScreen />;
}

function LoginScreen() {
  const qc = useQueryClient();
  const loginFn = useServerFn(adminLoginFn);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginFn({ data: { password } });
      if (res.ok) {
        toast.success("Welcome back");
        await qc.invalidateQueries({ queryKey: ["admin-status"] });
      } else {
        toast.error("Incorrect password");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 pt-24">
      <p className="eyebrow">Store Management</p>
      <h1 className="mt-2 font-display text-4xl font-medium text-maroon">Admin Login</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Enter the admin password to manage products.
      </p>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="mt-1.5"
          />
        </div>
        <Button type="submit" disabled={loading || !password} className="w-full bg-maroon text-ivory hover:bg-maroon/90">
          {loading ? <Loader2 className="animate-spin" /> : "Sign in"}
        </Button>
      </form>
    </div>
  );
}

function Dashboard() {
  const qc = useQueryClient();
  const logoutFn = useServerFn(adminLogoutFn);
  const listFn = useServerFn(listProducts);
  const deleteFn = useServerFn(deleteProductFn);

  const products = useQuery({ queryKey: ["admin-products"], queryFn: () => listFn() });
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<ProductRow | "new" | null>(null);

  const filtered = useMemo(() => {
    const list = products.data ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q),
    );
  }, [products.data, search]);

  async function refresh() {
    await Promise.all([
      qc.invalidateQueries({ queryKey: ["admin-products"] }),
      qc.invalidateQueries({ queryKey: ["products"] }),
    ]);
  }

  async function handleDelete(row: ProductRow) {
    if (!confirm(`Delete "${row.name}"? This cannot be undone.`)) return;
    try {
      await deleteFn({ data: { id: row.id } });
      toast.success("Product deleted");
      await refresh();
    } catch {
      toast.error("Could not delete product");
    }
  }

  async function handleLogout() {
    await logoutFn();
    await qc.invalidateQueries({ queryKey: ["admin-status"] });
  }

  if (editing) {
    return (
      <ProductEditor
        row={editing === "new" ? null : editing}
        onClose={() => setEditing(null)}
        onSaved={async () => {
          setEditing(null);
          await refresh();
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-24 sm:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Store Management</p>
          <h1 className="mt-2 font-display text-4xl font-medium text-maroon">Products</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {products.data?.length ?? 0} products in the catalog
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setEditing("new")} className="bg-maroon text-ivory hover:bg-maroon/90">
            <Plus size={16} /> Add product
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut size={16} /> Sign out
          </Button>
        </div>
      </div>

      <div className="relative mt-8 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {products.isLoading ? (
        <div className="mt-16 flex justify-center">
          <Loader2 className="animate-spin text-maroon" />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((row) => (
            <div key={row.id} className="flex gap-4 rounded-sm border border-border bg-background p-3">
              <img
                src={resolveProductImage(row.image)}
                alt={row.name}
                className="h-24 w-20 shrink-0 rounded-sm object-cover"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <span className="truncate font-display text-base text-foreground">{row.name}</span>
                  {row.is_best_seller && <Star size={14} className="shrink-0 text-gold" fill="currentColor" />}
                </div>
                <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {row.category}
                </span>
                <span className="mt-1 text-sm text-maroon">{formatPrice(row.price)}</span>
                <div className="mt-auto flex gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => setEditing(row)}>
                    <Pencil size={14} /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(row)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
              No products found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function ProductEditor({
  row,
  onClose,
  onSaved,
}: {
  row: ProductRow | null;
  onClose: () => void;
  onSaved: () => void | Promise<void>;
}) {
  const createFn = useServerFn(createProductFn);
  const updateFn = useServerFn(updateProductFn);
  const uploadFn = useServerFn(uploadImageFn);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>(row ? rowToForm(row) : emptyForm());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setForm(row ? rowToForm(row) : emptyForm());
  }, [row]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleFiles(files: FileList | null) {
    if (!files || !files.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        if (file.size > 20 * 1024 * 1024) {
          toast.error(`${file.name} is larger than 20MB`);
          continue;
        }
        const base64 = await fileToBase64(file);
        const res = await uploadFn({
          data: { fileBase64: base64, fileName: file.name, contentType: file.type || "image/jpeg" },
        });
        setForm((f) => ({ ...f, images: [...f.images, res.url] }));
      }
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const price = Number(form.price);
    const originalPrice = Number(form.original_price);
    if (!form.name.trim()) return toast.error("Name is required");
    if (!Number.isFinite(price) || price < 0) return toast.error("Enter a valid price");
    if (!Number.isFinite(originalPrice) || originalPrice < 0)
      return toast.error("Enter a valid original price");
    if (!form.fabric.trim()) return toast.error("Fabric is required");
    if (!form.description.trim()) return toast.error("Description is required");
    const colors = form.colors.filter((c) => c.name.trim() && c.hex.trim());
    if (!colors.length) return toast.error("Add at least one colour");
    if (!form.images.length) return toast.error("Upload at least one image");

    const payload = {
      name: form.name.trim(),
      collection_slug: form.collection_slug,
      category: collectionCategory[form.collection_slug] ?? "Saree",
      price: Math.round(price),
      original_price: Math.round(originalPrice),
      fabric: form.fabric.trim(),
      colors,
      image: form.images[0],
      gallery: form.images,
      is_best_seller: form.is_best_seller,
      description: form.description.trim(),
    };

    setSaving(true);
    try {
      if (row) {
        await updateFn({ data: { id: row.id, ...payload } });
        toast.success("Product updated");
      } else {
        await createFn({ data: payload });
        toast.success("Product added");
      }
      await onSaved();
    } catch {
      toast.error("Could not save product");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-24 sm:px-10">
      <button
        onClick={onClose}
        className="text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-maroon"
      >
        ← Back to products
      </button>
      <h1 className="mt-4 font-display text-4xl font-medium text-maroon">
        {row ? "Edit product" : "Add product"}
      </h1>

      <form onSubmit={submit} className="mt-8 space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} className="mt-1.5" />
        </div>

        <div>
          <Label>Collection</Label>
          <Select value={form.collection_slug} onValueChange={(v) => set("collection_slug", v)}>
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {collections.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              type="number"
              min={0}
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="original">Original price (₹)</Label>
            <Input
              id="original"
              type="number"
              min={0}
              value={form.original_price}
              onChange={(e) => set("original_price", e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="fabric">Fabric</Label>
          <Input id="fabric" value={form.fabric} onChange={(e) => set("fabric", e.target.value)} className="mt-1.5" />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows={4}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            className="mt-1.5"
          />
        </div>

        {/* Colours */}
        <div>
          <Label>Colours</Label>
          <div className="mt-2 space-y-2">
            {form.colors.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="color"
                  value={c.hex.startsWith("#") ? c.hex : `#${c.hex}`}
                  onChange={(e) => {
                    const colors = [...form.colors];
                    colors[i] = { ...colors[i], hex: e.target.value };
                    set("colors", colors);
                  }}
                  className="h-9 w-12 shrink-0 cursor-pointer rounded border border-border bg-transparent"
                />
                <Input
                  placeholder="Colour name"
                  value={c.name}
                  onChange={(e) => {
                    const colors = [...form.colors];
                    colors[i] = { ...colors[i], name: e.target.value };
                    set("colors", colors);
                  }}
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => set("colors", form.colors.filter((_, idx) => idx !== i))}
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => set("colors", [...form.colors, { name: "", hex: "#C6A15B" }])}
          >
            <Plus size={14} /> Add colour
          </Button>
        </div>

        {/* Images */}
        <div>
          <Label>Images</Label>
          <p className="text-xs text-muted-foreground">The first image is the main photo.</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {form.images.map((img, i) => (
              <div key={img + i} className="relative">
                <img
                  src={resolveProductImage(img)}
                  alt=""
                  className={`h-28 w-24 rounded-sm object-cover ${i === 0 ? "ring-2 ring-gold" : "border border-border"}`}
                />
                {i === 0 && (
                  <span className="absolute left-1 top-1 rounded bg-maroon/90 px-1.5 py-0.5 text-[0.55rem] uppercase tracking-wide text-ivory">
                    Main
                  </span>
                )}
                <div className="absolute right-1 top-1 flex gap-1">
                  {i !== 0 && (
                    <button
                      type="button"
                      title="Set as main"
                      onClick={() =>
                        set("images", [form.images[i], ...form.images.filter((_, idx) => idx !== i)])
                      }
                      className="rounded bg-background/90 px-1 text-[0.55rem] text-foreground shadow"
                    >
                      ★
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => set("images", form.images.filter((_, idx) => idx !== i))}
                    className="rounded bg-background/90 p-0.5 text-foreground shadow"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex h-28 w-24 flex-col items-center justify-center gap-1 rounded-sm border border-dashed border-border text-muted-foreground transition-colors hover:border-maroon hover:text-maroon"
            >
              {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
              <span className="text-[0.6rem] uppercase tracking-wide">Upload</span>
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        <div className="flex items-center gap-3">
          <Switch checked={form.is_best_seller} onCheckedChange={(v) => set("is_best_seller", v)} id="best" />
          <Label htmlFor="best" className="cursor-pointer">Mark as best seller</Label>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={saving} className="bg-maroon text-ivory hover:bg-maroon/90">
            {saving ? <Loader2 className="animate-spin" /> : row ? "Save changes" : "Add product"}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
