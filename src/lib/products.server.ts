// Server-only product logic. The .server.ts suffix keeps this out of client bundles.
import { createClient } from "@supabase/supabase-js";
import {
  useSession,
  type useSession as useSessionType,
} from "@tanstack/react-start/server";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { ProductRow } from "@/data/products";

const TABLE = "products";
const BUCKET = "product-images";
// 10 years — effectively permanent for a catalog image.
const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 10;

type SessionData = { admin?: boolean };

function getSessionConfig() {
  const password = process.env.SESSION_SECRET;
  if (!password) throw new Error("SESSION_SECRET is not configured");
  return { password, name: "jh_admin", maxAge: 60 * 60 * 12 };
}

async function getSession(): Promise<Awaited<ReturnType<typeof useSessionType<SessionData>>>> {
  return useSession<SessionData>(getSessionConfig());
}

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

// --- Admin auth (single shared password) ---
export async function adminLogin(password: string): Promise<{ ok: boolean }> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD is not configured");
  if (password !== expected) return { ok: false };
  const session = await getSession();
  await session.update({ admin: true });
  return { ok: true };
}

export async function adminLogout(): Promise<{ ok: boolean }> {
  const session = await getSession();
  await session.clear();
  return { ok: true };
}

export async function adminStatus(): Promise<{ isAdmin: boolean }> {
  const session = await getSession();
  return { isAdmin: session.data?.admin === true };
}

async function assertAdmin() {
  const { isAdmin } = await adminStatus();
  if (!isAdmin) throw new Error("Unauthorized");
}

function newId() {
  return `JH-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")}`;
}

// --- Admin writes (service role, RLS bypassed) ---
export async function dbCreateProduct(input: ProductInput): Promise<ProductRow> {
  await assertAdmin();
  const row = { id: newId(), ...input };
  const { data, error } = await supabaseAdmin.from(TABLE).insert(row).select().single();
  if (error) throw new Error(error.message);
  return data as ProductRow;
}

export async function dbUpdateProduct(id: string, input: ProductInput): Promise<ProductRow> {
  await assertAdmin();
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as ProductRow;
}

export async function dbDeleteProduct(id: string): Promise<{ ok: boolean }> {
  await assertAdmin();
  const { error } = await supabaseAdmin.from(TABLE).delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { ok: true };
}

export async function uploadImage(
  fileBase64: string,
  fileName: string,
  contentType: string,
): Promise<{ url: string }> {
  await assertAdmin();
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
