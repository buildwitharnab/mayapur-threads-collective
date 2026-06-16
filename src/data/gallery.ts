import look1 from "@/assets/lookbook/look-1.jpg";
import look2 from "@/assets/lookbook/look-2.jpg";
import look3 from "@/assets/lookbook/look-3.jpg";
import look4 from "@/assets/lookbook/look-4.jpg";
import look5 from "@/assets/lookbook/look-5.jpg";
import look6 from "@/assets/lookbook/look-6.jpg";
import heritage from "@/assets/heritage.jpg";
import store from "@/assets/store.jpg";
import sarees from "@/assets/collections/handloom-sarees.jpg";
import gopi from "@/assets/collections/gopi-dresses.jpg";
import devotional from "@/assets/collections/devotional-wear.jpg";
import dhuti from "@/assets/collections/dhuti.jpg";
import kurta from "@/assets/collections/kurta.jpg";
import bagalbandhi from "@/assets/collections/bagalbandhi.jpg";
import khadi from "@/assets/collections/khadi.jpg";
import festival from "@/assets/collections/festival.jpg";

export interface GalleryItem {
  src: string;
  caption: string;
  span: "tall" | "wide" | "normal";
}

export const gallery: GalleryItem[] = [
  { src: look1, caption: "Riverside at dawn", span: "wide" },
  { src: sarees, caption: "Maroon handloom silk", span: "tall" },
  { src: gopi, caption: "The gopi dress", span: "normal" },
  { src: heritage, caption: "Hands at the loom", span: "tall" },
  { src: festival, caption: "Festival gold", span: "normal" },
  { src: look3, caption: "Courtyard procession", span: "wide" },
  { src: kurta, caption: "Cream handloom kurta", span: "normal" },
  { src: look6, caption: "Zari border detail", span: "tall" },
  { src: bagalbandhi, caption: "Regal bagalbandhi", span: "normal" },
  { src: look2, caption: "Among the tulsi", span: "tall" },
  { src: devotional, caption: "Pure cotton devotion", span: "normal" },
  { src: dhuti, caption: "Timeless dhuti", span: "normal" },
  { src: look5, caption: "Festival of lamps", span: "wide" },
  { src: khadi, caption: "Handspun khadi", span: "normal" },
  { src: look4, caption: "The quiet gentleman", span: "tall" },
  { src: store, caption: "Our Mayapur store", span: "wide" },
];
