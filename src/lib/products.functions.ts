import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
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

// --- Admin auth ---
export const adminLoginFn = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) =>
    z.object({ password: z.string().min(1).max(200) }).parse(data),
  )
  .handler(async ({ data }) => {
    const { adminLogin } = await import("./products.server");
    return adminLogin(data.password);
  });

export const adminLogoutFn = createServerFn({ method: "POST" }).handler(async () => {
  const { adminLogout } = await import("./products.server");
  return adminLogout();
});

export const adminStatusFn = createServerFn({ method: "GET" }).handler(async () => {
  const { adminStatus } = await import("./products.server");
  return adminStatus();
});

// --- Admin writes ---
export const createProductFn = createServerFn({ method: "POST" })
  .inputValidator((data: ProductInputData) => productInputSchema.parse(data))
  .handler(async ({ data }): Promise<ProductRow> => {
    const { dbCreateProduct } = await import("./products.server");
    return dbCreateProduct(data);
  });

export const updateProductFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string } & ProductInputData) =>
    z.object({ id: z.string().min(1).max(80) }).and(productInputSchema).parse(data),
  )
  .handler(async ({ data }): Promise<ProductRow> => {
    const { id, ...input } = data;
    const { dbUpdateProduct } = await import("./products.server");
    return dbUpdateProduct(id, input);
  });

export const deleteProductFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) =>
    z.object({ id: z.string().min(1).max(80) }).parse(data),
  )
  .handler(async ({ data }) => {
    const { dbDeleteProduct } = await import("./products.server");
    return dbDeleteProduct(data.id);
  });

export const uploadImageFn = createServerFn({ method: "POST" })
  .inputValidator((data: { fileBase64: string; fileName: string; contentType: string }) =>
    z
      .object({
        fileBase64: z.string().min(1).max(28_000_000),
        fileName: z.string().min(1).max(300),
        contentType: z.string().min(1).max(120),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { uploadImage } = await import("./products.server");
    return uploadImage(data.fileBase64, data.fileName, data.contentType);
  });
