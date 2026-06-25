import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { ProductRow } from "@/data/products";

const colorSchema = z.object({
  name: z.string().trim().min(1).max(60),
  hex: z.string().trim().regex(/^#?[0-9a-fA-F]{3,8}$/, "Invalid colour"),
});

const productInputSchema = z.object({
  name: z.string().trim().min(1).max(200),
  collection_slug: z.string().trim().min(1).max(100),
  category: z.string().trim().min(1).max(100),
  price: z.number().int().min(0).max(100000000),
  original_price: z.number().int().min(0).max(100000000),
  fabric: z.string().trim().min(1).max(200),
  colors: z.array(colorSchema).min(1).max(12),
  image: z.string().trim().min(1).max(2000),
  gallery: z.array(z.string().trim().min(1).max(2000)).min(1).max(8),
  is_best_seller: z.boolean(),
  description: z.string().trim().min(1).max(4000),
});

export type ProductInputData = z.infer<typeof productInputSchema>;

// --- Public: list all products (no auth) ---
export const listProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<ProductRow[]> => {
    const { dbListProducts } = await import("./products.server");
    return dbListProducts();
  },
);

// --- Roles: ensure the signed-in user has a role and report admin status ---
export const ensureRoleFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ isAdmin: boolean }> => {
    const { ensureUserRole } = await import("./products.server");
    const email = (context.claims as { email?: string })?.email;
    return ensureUserRole(context.userId, email);
  });

// --- Admin writes (require a signed-in admin) ---
export const createProductFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: ProductInputData) => productInputSchema.parse(data))
  .handler(async ({ data, context }): Promise<ProductRow> => {
    const { dbCreateProduct } = await import("./products.server");
    return dbCreateProduct(context.userId, data);
  });

export const updateProductFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string } & ProductInputData) =>
    z.object({ id: z.string().min(1).max(80) }).and(productInputSchema).parse(data),
  )
  .handler(async ({ data, context }): Promise<ProductRow> => {
    const { id, ...input } = data;
    const { dbUpdateProduct } = await import("./products.server");
    return dbUpdateProduct(context.userId, id, input);
  });

export const deleteProductFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) =>
    z.object({ id: z.string().min(1).max(80) }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const { dbDeleteProduct } = await import("./products.server");
    return dbDeleteProduct(context.userId, data.id);
  });

export const uploadImageFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { fileBase64: string; fileName: string; contentType: string }) =>
    z
      .object({
        fileBase64: z.string().min(1).max(28_000_000),
        fileName: z.string().min(1).max(300),
        contentType: z.string().min(1).max(120),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { uploadImage } = await import("./products.server");
    return uploadImage(context.userId, data.fileBase64, data.fileName, data.contentType);
  });
