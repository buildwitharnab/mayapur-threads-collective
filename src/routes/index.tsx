import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { ProductCard } from "@/components/product-card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { collections } from "@/data/collections";
import { productsQueryOptions } from "@/lib/products.queries";
import { testimonials } from "@/data/testimonials";
import { SITE, whatsappLink } from "@/data/site";
import heroImg from "@/assets/hero-home.jpg";
import eyes from "@/assets/jagannath-eyes.png";
import heritageImg from "@/assets/heritage.jpg";
import storeImg from "@/assets/store.jpg";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions),
  head: () => ({
    meta: [
      { title: "Jagannath Handloom — Heritage Handloom Sarees & Devotional Wear" },
      {
        name: "description",
        content:
          "Premium handloom sarees, gopi dresses, dhuti, kurtas and traditional collections inspired by the timeless beauty of Mayapur. Worldwide courier available.",
      },
      { property: "og:title", content: "Jagannath Handloom — Heritage Woven Into Every Thread" },
      {
        property: "og:description",
        content:
          "A premium heritage handloom house from Mayapur. Sarees, gopi dresses & traditional wear.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

const ease = [0.16, 1, 0.3, 1] as const;

function Home() {
  const { data: products } = useSuspenseQuery(productsQueryOptions);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Woman in a deep maroon handloom silk saree in golden light"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/85 to-ivory/10 sm:via-ivory/70" />
        <img
          src={eyes}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[30%] top-1/2 w-[70vw] max-w-[760px] -translate-x-1/2 -translate-y-1/2 opacity-[0.04]"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-12">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="eyebrow"
            >
              Mayapur · Handloom Heritage House
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.12, ease }}
              className="mt-6 font-display text-5xl font-medium leading-[1.05] text-maroon sm:text-6xl lg:text-7xl"
            >
              Jagannath
              <br />
              Handloom
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.24, ease }}
              className="mt-5 font-display text-xl italic text-foreground/80 sm:text-2xl"
            >
              Heritage Woven Into Every Thread
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.34, ease }}
              className="mt-6 max-w-md text-base leading-relaxed text-foreground/70"
            >
              Premium handloom sarees, devotional wear, gopi dresses and
              traditional collections inspired by the timeless beauty of Mayapur.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.44, ease }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 rounded-full bg-maroon px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-maroon-deep"
              >
                Explore Collections <ArrowRight size={15} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-maroon/40 px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-maroon transition-colors hover:border-maroon hover:bg-maroon hover:text-ivory"
              >
                Visit Store
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:bg-gold hover:text-ivory"
              >
                WhatsApp Enquiry
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-foreground/50 sm:flex"
        >
          <span className="text-[0.62rem] uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-10 w-px bg-foreground/30" />
        </motion.div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
        <div className="text-center">
          <Reveal>
            <p className="eyebrow">The House of Jagannath</p>
            <h2 className="mt-4 font-display text-4xl font-medium text-maroon sm:text-5xl">
              Featured Collections
            </h2>
            <SectionDivider className="mt-6" />
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Eight curated worlds of handloom — each a campaign of its own,
              woven with devotion in Mayapur.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c, i) => (
            <Reveal key={c.slug} delay={i % 4} as="div">
              <Link
                to="/collections/$slug"
                params={{ slug: c.slug }}
                className="group relative block aspect-[3/4] overflow-hidden rounded-sm"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/85 via-maroon-deep/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold-soft">
                    {c.tagline}
                  </p>
                  <h3 className="mt-1.5 font-display text-2xl">{c.name}</h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-ivory/0 transition-all duration-500 group-hover:text-ivory/90">
                    Discover <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HERITAGE */}
      <section className="bg-secondary/40">
        <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-6 py-24 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-32">
          <Reveal>
            <div className="relative">
              <img
                src={heritageImg}
                alt="Artisan hands weaving on a traditional handloom"
                loading="lazy"
                className="aspect-[4/5] w-full rounded-sm object-cover shadow-luxe"
              />
              <div className="absolute -bottom-6 -right-4 hidden rounded-sm bg-maroon px-7 py-6 text-ivory shadow-luxe sm:block">
                <p className="font-display text-4xl text-gold-soft">40+</p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.2em]">
                  Weaving families
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <p className="eyebrow">Our Heritage</p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-maroon sm:text-5xl">
              Rooted in Mayapur, woven by hand
            </h2>
            <SectionDivider className="mt-6 justify-start [&>span:first-child]:hidden" />
            <div className="mt-2 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Jagannath Handloom began as a small family endeavour in the heart
                of Mayapur's Prabhupad Market. What started with a single loom and
                an unshakeable belief in honest craft has grown into a beloved
                heritage house.
              </p>
              <p>
                We work directly with master weavers, preserving techniques passed
                down through generations. Every saree, every dhuti, every gopi
                dress carries the soul of the hands that made it — and the
                spiritual calm of the town it comes from.
              </p>
            </div>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-maroon transition-colors hover:text-gold"
            >
              Read our story <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <Reveal>
            <p className="eyebrow">Most Loved</p>
            <h2 className="mt-4 font-display text-4xl font-medium text-maroon sm:text-5xl">
              Best Sellers
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-maroon transition-colors hover:text-gold"
            >
              View full catalog <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {bestSellers.map((p, i) => (
            <Reveal key={p.id} delay={i % 4} as="div">
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CUSTOMER STORIES */}
      <section className="relative overflow-hidden bg-gradient-maroon py-24 text-ivory lg:py-32">
        <img
          src={eyes}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 w-[60vw] max-w-[680px] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
        />
        <div className="relative mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-12">
          <div className="text-center">
            <Reveal>
              <p className="eyebrow text-gold-soft">In Their Words</p>
              <h2 className="mt-4 font-display text-4xl font-medium sm:text-5xl">
                Customer Stories
              </h2>
              <SectionDivider className="mt-6" />
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.name} delay={i} as="div">
                <figure className="flex h-full flex-col overflow-hidden rounded-sm bg-ivory/5 ring-1 ring-ivory/10 backdrop-blur">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={t.image}
                      alt={t.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <blockquote className="flex flex-1 flex-col p-7">
                    <p className="font-display text-lg italic leading-relaxed text-ivory/90">
                      “{t.quote}”
                    </p>
                    <figcaption className="mt-5 border-t border-ivory/15 pt-4">
                      <p className="text-sm font-medium text-gold-soft">{t.name}</p>
                      <p className="text-xs text-ivory/60">{t.location}</p>
                    </figcaption>
                  </blockquote>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Reveal>
              <Link
                to="/stories"
                className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-gold hover:text-maroon-deep"
              >
                Read all stories <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VISIT STORE */}
      <section className="mx-auto grid max-w-[1600px] items-center gap-12 px-6 py-24 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-32">
        <Reveal>
          <p className="eyebrow">Visit Our Store</p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-maroon sm:text-5xl">
            Find us in the heart of Mayapur
          </h2>
          <SectionDivider className="mt-6 justify-start [&>span:first-child]:hidden" />
          <div className="mt-4 space-y-1 text-lg text-foreground/80">
            <p className="font-display text-2xl text-maroon">Jagannath Handloom</p>
            <p>Shop No. 18, Prabhupad Market</p>
            <p>Mayapur, West Bengal</p>
          </div>
          <p className="mt-5 max-w-md text-muted-foreground">
            Step into a world of handwoven heritage. Our doors — and our family —
            welcome you. Can't visit in person? We courier worldwide.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SITE.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-maroon px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-maroon-deep"
            >
              <MapPin size={15} /> Open in Google Maps
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:bg-gold hover:text-ivory"
            >
              <MessageCircle size={15} /> Message us
            </a>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <img
            src={storeImg}
            alt="The Jagannath Handloom store interior in Mayapur"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-sm object-cover shadow-luxe"
          />
        </Reveal>
      </section>
    </>
  );
}
