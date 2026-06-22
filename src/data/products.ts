import { resolveProductImage } from "./product-images";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  collectionSlug: string;
  category: string;
  price: number;
  originalPrice: number;
  fabric: string;
  colors: ProductColor[];
  image: string;
  gallery: string[];
  isBestSeller: boolean;
  description: string;
}

// Raw shape as stored in / returned from the database.
export interface ProductRow {
  id: string;
  name: string;
  collection_slug: string;
  category: string;
  price: number;
  original_price: number;
  fabric: string;
  colors: ProductColor[] | null;
  image: string;
  gallery: string[] | null;
  is_best_seller: boolean;
  description: string;
}

// Fixed list of categories (one per collection). Used for the catalog filter tabs.
export const categories = [
  "Saree",
  "Gopi Dress",
  "Devotional Wear",
  "Dhuti",
  "Kurta",
  "Bagalbandhi",
  "Khadi",
  "Festival",
];

/** Converts a database row into a UI-ready Product (with resolved image URLs). */
export function rowToProduct(row: ProductRow): Product {
  const gallery = (row.gallery ?? []).map(resolveProductImage);
  const image = resolveProductImage(row.image);
  return {
    id: row.id,
    name: row.name,
    collectionSlug: row.collection_slug,
    category: row.category,
    price: row.price,
    originalPrice: row.original_price,
    fabric: row.fabric,
    colors: row.colors ?? [],
    image,
    gallery: gallery.length ? gallery : [image],
    isBestSeller: row.is_best_seller,
    description: row.description,
  };
}

export const getProduct = (all: Product[], id: string) =>
  all.find((p) => p.id === id);

export const getProductsByCollection = (all: Product[], slug: string) =>
  all.filter((p) => p.collectionSlug === slug);

export const getRelatedProducts = (all: Product[], product: Product, n = 4) =>
  all
    .filter((p) => p.collectionSlug === product.collectionSlug && p.id !== product.id)
    .slice(0, n);

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
