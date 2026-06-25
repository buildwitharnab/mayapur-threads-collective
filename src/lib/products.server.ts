// Server-only product logic. The .server.ts suffix keeps this out of client bundles.
import { createClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { ProductRow } from "@/data/products";

const TABLE = "products";
const BUCKET = "product-images";
// 10 years — effectively permanent for a catalog image.
const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 10;

// The email that is automatically promoted to admin on first sign-in.
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL ?? "admin@jagannathhandloom.com").toLowerCase();

export interface ProductInput {
  name: string;
  collection_slug: string;
  category: string;
  price: number;
  original_price: number;
  fabric: string;
  colors: { name: string; hex: string }[];
  image: string;
  gallery: string[];
  is_best_seller: boolean;
  description: string;
}

// --- Public read (publishable key, anon SELECT policy) ---
function publicClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export async function dbListProducts(): Promise<ProductRow[]> {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select(
      "id,name,collection_slug,category,price,original_price,fabric,colors,image,gallery,is_best_seller,description",
    )
    .order("id", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as ProductRow[];
}

// --- Roles ---
// Idempotently assigns the correct role to a signed-in user based on their email,
// then reports whether they are an admin. Runs with the service role.
export async function ensureUserRole(
  userId: string,
  email?: string,
): Promise<{ isAdmin: boolean }> {
  const isAdmin = !!email && email.toLowerCase() === ADMIN_EMAIL;
  const role = isAdmin ? "admin" : "user";
  const { error } = await supabaseAdmin
    .from("user_roles")
    .upsert({ user_id: userId, role }, { onConflict: "user_id,role" });
  if (error) throw new Error(error.message);
  return { isAdmin };
}

async function assertAdminRole(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Unauthorized");
}

function newId() {
  return `JH-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")}`;
}

// --- Admin writes (service role, RLS bypassed; caller verified as admin) ---
export async function dbCreateProduct(userId: string, input: ProductInput): Promise<ProductRow> {
  await assertAdminRole(userId);
  const row = { id: newId(), ...input };
  const { data, error } = await supabaseAdmin.from(TABLE).insert(row).select().single();
  if (error) throw new Error(error.message);
  return data as ProductRow;
}

export async function dbUpdateProduct(
  userId: string,
  id: string,
  input: ProductInput,
): Promise<ProductRow> {
  await assertAdminRole(userId);
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as ProductRow;
}

export async function dbDeleteProduct(userId: string, id: string): Promise<{ ok: boolean }> {
  await assertAdminRole(userId);
  const { error } = await supabaseAdmin.from(TABLE).delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { ok: true };
}

export async function uploadImage(
  userId: string,
  fileBase64: string,
  fileName: string,
  contentType: string,
): Promise<{ url: string }> {
  await assertAdminRole(userId);
  const ext = (fileName.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `products/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buffer = Buffer.from(fileBase64, "base64");
  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType, upsert: false });
  if (error) throw new Error(error.message);
  const { data, error: signError } = await supabaseAdmin.storage
    .from(BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL);
  if (signError || !data?.signedUrl) throw new Error(signError?.message || "Could not sign URL");
  return { url: data.signedUrl };
}
