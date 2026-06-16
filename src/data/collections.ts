import handloomSarees from "@/assets/collections/handloom-sarees.jpg";
import gopiDresses from "@/assets/collections/gopi-dresses.jpg";
import devotionalWear from "@/assets/collections/devotional-wear.jpg";
import dhuti from "@/assets/collections/dhuti.jpg";
import kurta from "@/assets/collections/kurta.jpg";
import bagalbandhi from "@/assets/collections/bagalbandhi.jpg";
import khadi from "@/assets/collections/khadi.jpg";
import festival from "@/assets/collections/festival.jpg";

export interface Collection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  story: string;
  image: string;
  count: number;
}

export const collections: Collection[] = [
  {
    slug: "handloom-sarees",
    name: "Handloom Sarees",
    tagline: "Woven on traditional looms",
    description:
      "Pure silk and cotton sarees, each one woven thread by thread on the heritage looms of master weavers.",
    story:
      "Every saree in this collection carries the rhythm of the loom — a quiet song passed down through generations of weavers. The deep maroons and antique gold borders are dyed in small batches, ensuring no two drapes are ever truly alike. We work directly with weaving families to preserve techniques that machines can never replicate.",
    image: handloomSarees,
    count: 24,
  },
  {
    slug: "gopi-dresses",
    name: "Gopi Dresses",
    tagline: "Grace in every fold",
    description:
      "Flowing, graceful gopi dresses crafted for the matajis of Mayapur — soft cottons and delicate handwork.",
    story:
      "The gopi dress is a celebration of devotion and grace. Cut for movement and comfort, each piece is finished with hand-stitched borders and breathable handloom fabric, made to be worn through the seasons of Mayapur.",
    image: gopiDresses,
    count: 18,
  },
  {
    slug: "devotional-wear",
    name: "Devotional Wear",
    tagline: "Pure cotton, pure intention",
    description:
      "Understated, dignified garments in cream and gold — woven for serenity and daily devotion.",
    story:
      "Simplicity is its own elegance. Our devotional wear is woven from pure, breathable cotton in calming ivory tones, designed to bring a sense of stillness and dignity to every day.",
    image: devotionalWear,
    count: 16,
  },
  {
    slug: "dhuti-collection",
    name: "Dhuti Collection",
    tagline: "Timeless menswear",
    description:
      "Crisp handloom dhotis with fine gold borders — the quintessential garment of refined tradition.",
    story:
      "A perfectly draped dhoti is the mark of timeless taste. Woven on fly-shuttle looms with luminous gold borders, our dhotis balance crispness with the soft fall only true handloom can offer.",
    image: dhuti,
    count: 14,
  },
  {
    slug: "kurta-collection",
    name: "Kurta Collection",
    tagline: "Quiet, considered, refined",
    description:
      "Handwoven kurtas in cream, maroon and natural tones with subtle, dignified detailing.",
    story:
      "Cut for ease and finished with restraint, our kurtas are made from handloom silk and cotton. Fine collar work and understated buttons make them as suited to a festival as to a quiet morning.",
    image: kurta,
    count: 20,
  },
  {
    slug: "bagalbandhi-collection",
    name: "Bagalbandhi Collection",
    tagline: "Heritage occasion wear",
    description:
      "Regal bagalbandhi jackets with intricate gold work — heritage tailoring for the grandest occasions.",
    story:
      "The bagalbandhi is ceremony itself, woven into cloth. Rich maroon bases meet hand-embroidered gold motifs inspired by temple architecture, tailored for moments that deserve to be remembered.",
    image: bagalbandhi,
    count: 12,
  },
  {
    slug: "khadi-collection",
    name: "Khadi Collection",
    tagline: "Handspun, honest, enduring",
    description:
      "Pure handspun khadi in natural ivory and beige — the most honest of all our fabrics.",
    story:
      "Khadi is the heartbeat of Indian handloom — handspun, handwoven, and entirely honest. Our khadi pieces celebrate raw texture and natural tones, growing softer and more beautiful with every wear.",
    image: khadi,
    count: 15,
  },
  {
    slug: "festival-collection",
    name: "Festival Collection",
    tagline: "For days that glow",
    description:
      "Resplendent gold and maroon weaves with intricate zari — made for celebration and light.",
    story:
      "When the lamps are lit and Mayapur glows, the festival collection answers. Lavish zari work, luminous silks and ornate borders make these our most celebratory pieces — woven for joy.",
    image: festival,
    count: 22,
  },
];

export const getCollection = (slug: string) =>
  collections.find((c) => c.slug === slug);
