import p1 from "@/assets/products/p1.jpg";
import p2 from "@/assets/products/p2.jpg";
import p3 from "@/assets/products/p3.jpg";
import p4 from "@/assets/products/p4.jpg";
import p5 from "@/assets/products/p5.jpg";
import p6 from "@/assets/products/p6.jpg";
import p7 from "@/assets/products/p7.jpg";
import p8 from "@/assets/products/p8.jpg";
import p9 from "@/assets/products/p9.jpg";
import p10 from "@/assets/products/p10.jpg";
import p11 from "@/assets/products/p11.jpg";
import p12 from "@/assets/products/p12.jpg";

export interface Product {
  id: string;
  name: string;
  collectionSlug: string;
  category: string;
  price: number;
  originalPrice: number;
  fabric: string;
  colors: { name: string; hex: string }[];
  image: string;
  gallery: string[];
  isBestSeller: boolean;
  description: string;
}

const colorSwatches = {
  maroon: { name: "Deep Maroon", hex: "#6D1F2F" },
  gold: { name: "Antique Gold", hex: "#C6A15B" },
  ivory: { name: "Ivory", hex: "#FAF8F3" },
  green: { name: "Emerald", hex: "#1f6d4a" },
  blue: { name: "Royal Blue", hex: "#26418f" },
  pink: { name: "Rose", hex: "#d98a9a" },
  beige: { name: "Warm Beige", hex: "#E8DCCB" },
  charcoal: { name: "Charcoal", hex: "#222222" },
};

interface Recipe {
  collectionSlug: string;
  category: string;
  prefixes: string[];
  suffixes: string[];
  fabrics: string[];
  images: string[];
  colors: { name: string; hex: string }[];
  priceMin: number;
  priceMax: number;
}

const recipes: Recipe[] = [
  {
    collectionSlug: "handloom-sarees",
    category: "Saree",
    prefixes: ["Mayapur", "Tussar", "Kanjivaram", "Banarasi", "Sambalpuri", "Ikat", "Jamdani", "Chanderi", "Maheshwari", "Bomkai", "Berhampuri", "Gadwal"],
    suffixes: ["Handloom Saree", "Silk Saree", "Zari Saree", "Heritage Saree", "Pure Silk Drape"],
    fabrics: ["Pure Mulberry Silk", "Tussar Silk", "Handwoven Cotton", "Cotton Silk Blend", "Katan Silk"],
    images: [p1, p2, p3, p4],
    colors: [colorSwatches.maroon, colorSwatches.green, colorSwatches.blue, colorSwatches.pink, colorSwatches.gold],
    priceMin: 4200,
    priceMax: 22000,
  },
  {
    collectionSlug: "gopi-dresses",
    category: "Gopi Dress",
    prefixes: ["Radha", "Tulsi", "Vrinda", "Lalita", "Vishakha", "Yamuna", "Govardhan", "Madhuri", "Kishori", "Padma"],
    suffixes: ["Gopi Dress", "Cotton Gopi Set", "Handloom Gopi Dress", "Festive Gopi Set"],
    fabrics: ["Soft Handloom Cotton", "Cotton Mulmul", "Khadi Cotton", "Cotton Silk"],
    images: [p5, p6],
    colors: [colorSwatches.beige, colorSwatches.pink, colorSwatches.gold, colorSwatches.ivory],
    priceMin: 1800,
    priceMax: 6500,
  },
  {
    collectionSlug: "devotional-wear",
    category: "Devotional Wear",
    prefixes: ["Shanti", "Prasad", "Aradhana", "Seva", "Bhakti", "Nitya", "Sattvik", "Tilak", "Sandhya"],
    suffixes: ["Cotton Set", "Devotional Drape", "Pure Cotton Wear", "Daily Wear"],
    fabrics: ["Pure Cotton", "Handspun Cotton", "Cotton Voile", "Mulmul Cotton"],
    images: [p7, p11],
    colors: [colorSwatches.ivory, colorSwatches.beige, colorSwatches.gold],
    priceMin: 1400,
    priceMax: 4800,
  },
  {
    collectionSlug: "dhuti-collection",
    category: "Dhuti",
    prefixes: ["Gouranga", "Nimai", "Gadadhar", "Advaita", "Nityananda", "Srivas", "Haridas", "Vasudev"],
    suffixes: ["Handloom Dhuti", "Gold Border Dhuti", "Pure Cotton Dhuti", "Silk Dhuti"],
    fabrics: ["Handwoven Cotton", "Cotton Silk", "Pure Silk", "Fine Cotton"],
    images: [p9],
    colors: [colorSwatches.ivory, colorSwatches.gold],
    priceMin: 1600,
    priceMax: 7200,
  },
  {
    collectionSlug: "kurta-collection",
    category: "Kurta",
    prefixes: ["Vraja", "Keshava", "Madhava", "Damodar", "Govinda", "Shyam", "Murari", "Ananta", "Achyuta", "Hari"],
    suffixes: ["Handloom Kurta", "Silk Kurta", "Cotton Kurta", "Heritage Kurta"],
    fabrics: ["Handloom Cotton", "Pure Silk", "Cotton Silk Blend", "Tussar Silk"],
    images: [p7, p8],
    colors: [colorSwatches.ivory, colorSwatches.maroon, colorSwatches.beige, colorSwatches.charcoal],
    priceMin: 1900,
    priceMax: 8500,
  },
  {
    collectionSlug: "bagalbandhi-collection",
    category: "Bagalbandhi",
    prefixes: ["Maharaja", "Rajwadi", "Darbar", "Imperial", "Heritage", "Royal", "Vintage", "Regal"],
    suffixes: ["Bagalbandhi Jacket", "Embroidered Angarakha", "Silk Bagalbandhi", "Festive Jacket"],
    fabrics: ["Silk with Zari", "Velvet Silk", "Brocade Silk", "Raw Silk"],
    images: [p10],
    colors: [colorSwatches.maroon, colorSwatches.gold],
    priceMin: 5200,
    priceMax: 28000,
  },
  {
    collectionSlug: "khadi-collection",
    category: "Khadi",
    prefixes: ["Charkha", "Swadeshi", "Gramya", "Prakriti", "Saral", "Nirmal", "Suti", "Bhumi"],
    suffixes: ["Khadi Shawl", "Handspun Stole", "Khadi Wrap", "Natural Khadi"],
    fabrics: ["Pure Handspun Khadi", "Khadi Cotton", "Khadi Silk", "Eri Khadi"],
    images: [p11],
    colors: [colorSwatches.ivory, colorSwatches.beige],
    priceMin: 1200,
    priceMax: 5600,
  },
  {
    collectionSlug: "festival-collection",
    category: "Festival",
    prefixes: ["Utsav", "Diwali", "Janmashtami", "Rathayatra", "Kartik", "Deepavali", "Mangal", "Vaibhav"],
    suffixes: ["Festival Saree", "Zari Silk Saree", "Celebration Drape", "Gold Festival Saree"],
    fabrics: ["Zari Silk", "Pure Kanjivaram Silk", "Banarasi Silk", "Tissue Silk"],
    images: [p12, p1],
    colors: [colorSwatches.gold, colorSwatches.maroon, colorSwatches.pink],
    priceMin: 6500,
    priceMax: 34000,
  },
];

function pick<T>(arr: T[], n: number): T {
  return arr[n % arr.length];
}

function buildDescription(name: string, fabric: string, category: string): string {
  return `The ${name} is a hand-finished ${category.toLowerCase()} woven in ${fabric.toLowerCase()}. Created in limited quantities by master artisans, it carries the unmistakable depth and texture of true handloom. Subtle irregularities in the weave are the signature of a piece made entirely by hand — a quiet mark of authenticity and heritage.`;
}

function generateProducts(): Product[] {
  const products: Product[] = [];
  let counter = 1;
  recipes.forEach((r) => {
    const perCollection = 13;
    for (let i = 0; i < perCollection; i++) {
      const prefix = pick(r.prefixes, i);
      const suffix = pick(r.suffixes, i + 1);
      const name = `${prefix} ${suffix}`;
      const fabric = pick(r.fabrics, i);
      const span = r.priceMax - r.priceMin;
      const price = Math.round((r.priceMin + ((i * 1373) % span)) / 100) * 100 + 99;
      const originalPrice = Math.round((price * 1.25) / 100) * 100 + 99;
      const numColors = 2 + (i % 3);
      const colors = r.colors.slice(0, Math.min(numColors, r.colors.length));
      const image = pick(r.images, i);
      const gallery = [image, ...r.images.filter((g) => g !== image)].slice(0, 3);
      products.push({
        id: `JH-${String(counter).padStart(3, "0")}`,
        name,
        collectionSlug: r.collectionSlug,
        category: r.category,
        price,
        originalPrice,
        fabric,
        colors: colors.length ? colors : r.colors,
        image,
        gallery: gallery.length > 1 ? gallery : r.images,
        isBestSeller: i % 6 === 0,
        description: buildDescription(name, fabric, r.category),
      });
      counter++;
    }
  });
  return products;
}

export const products: Product[] = generateProducts();

export const categories = Array.from(new Set(products.map((p) => p.category)));

export const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const getProductsByCollection = (slug: string) =>
  products.filter((p) => p.collectionSlug === slug);

export const getRelatedProducts = (product: Product, n = 4) =>
  products
    .filter((p) => p.collectionSlug === product.collectionSlug && p.id !== product.id)
    .slice(0, n);

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
