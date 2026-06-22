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

// Maps the seeded image keys (p1..p12) to their bundled asset URLs.
// Products added later store a full https:// URL instead, which passes through.
export const localProductImages: Record<string, string> = {
  p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12,
};

const FALLBACK = p1;

export function resolveProductImage(ref?: string | null): string {
  if (!ref) return FALLBACK;
  if (/^https?:\/\//.test(ref) || ref.startsWith("/")) return ref;
  return localProductImages[ref] ?? FALLBACK;
}
