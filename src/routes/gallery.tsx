import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { gallery, type GalleryItem } from "@/data/gallery";
import look5 from "@/assets/lookbook/look-5.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Jagannath Handloom" },
      {
        name: "description",
        content:
          "A visual gallery of handloom heritage — sarees, gopi dresses, craftsmanship and the atmosphere of Mayapur, from Jagannath Handloom.",
      },
      { property: "og:title", content: "Gallery — Jagannath Handloom" },
      { property: "og:description", content: "A visual gallery of handloom heritage from Mayapur." },
      { property: "og:image", content: look5 },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      <PageHero
        eyebrow="The Gallery"
        title="Moments in Handloom"
        description="A curated wall of fabric, craft and the quiet beauty of Mayapur. Tap any image to view it up close."
        image={look5}
      />

      <section className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {gallery.map((item, i) => (
            <Reveal key={i} delay={i % 4} as="div">
              <button
                onClick={() => setActive(item)}
                className="group relative block w-full overflow-hidden rounded-sm"
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-maroon-deep/80 to-transparent p-4 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  <span className="font-display text-lg text-ivory">{item.caption}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-maroon-deep/90 p-6 backdrop-blur-sm"
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-6 top-6 text-ivory/80 transition-colors hover:text-gold"
            >
              <X size={30} />
            </button>
            <motion.figure
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-4xl overflow-hidden rounded-sm"
            >
              <img src={active.src} alt={active.caption} className="max-h-[80vh] w-auto object-contain" />
              <figcaption className="mt-3 text-center font-display text-lg italic text-ivory">
                {active.caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
