import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { ProductCard } from "@/components/product-card";
import { getCollection, collections } from "@/data/collections";
import { getProductsByCollection, type Product } from "@/data/products";
import { whatsappLink } from "@/data/site";
import eyes from "@/assets/jagannath-eyes.png";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = getCollection(params.slug);
    if (!collection) throw notFound();
    return { collection, products: getProductsByCollection(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.collection.name} — Jagannath Handloom` },
          { name: "description", content: loaderData.collection.description },
          { property: "og:title", content: `${loaderData.collection.name} — Jagannath Handloom` },
          { property: "og:description", content: loaderData.collection.description },
          { property: "og:image", content: loaderData.collection.image },
        ]
      : [],
  }),
  component: CollectionDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-display text-3xl text-maroon">Collection not found</h1>
      <Link to="/collections" className="text-sm uppercase tracking-[0.16em] text-gold">
        Back to collections
      </Link>
    </div>
  ),
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-display text-3xl text-maroon">Something went wrong</h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="text-sm uppercase tracking-[0.16em] text-gold"
        >
          Try again
        </button>
      </div>
    );
  },
});

function CollectionDetail() {
  const { collection, products } = Route.useLoaderData();
  const others = collections.filter((c) => c.slug !== collection.slug).slice(0, 3);

  return (
    <>
      <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-20">
        <img src={collection.image} alt={collection.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-deep/85 via-maroon-deep/55 to-maroon-deep/20" />
        <img src={eyes} alt="" aria-hidden="true" className="pointer-events-none absolute left-1/4 top-1/2 w-[55vw] max-w-[600px] -translate-y-1/2 opacity-[0.06]" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-12">
          <Link to="/collections" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-ivory/70 transition-colors hover:text-gold">
            <ArrowLeft size={14} /> All Collections
          </Link>
          <p className="eyebrow mt-6 text-gold-soft">{collection.tagline}</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-medium leading-tight text-ivory sm:text-6xl">
            {collection.name}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/80">
            {collection.description}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:px-10 lg:py-28">
          <Reveal>
            <p className="eyebrow">The Craft</p>
            <SectionDivider className="mt-5" />
            <p className="mt-4 font-display text-2xl leading-relaxed text-foreground/85 sm:text-3xl">
              {collection.story}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <h2 className="font-display text-3xl font-medium text-maroon sm:text-4xl">
              The Pieces
            </h2>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-gold">
              {products.length} available
            </p>
          </Reveal>
          <Reveal delay={1}>
            <a
              href={whatsappLink(`I'd like to know more about the ${collection.name} collection.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full border border-maroon/40 px-6 py-3 text-xs uppercase tracking-[0.16em] text-maroon transition-colors hover:bg-maroon hover:text-ivory sm:inline-flex"
            >
              Enquire on WhatsApp
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {products.map((p: Product, i: number) => (
            <Reveal key={p.id} delay={i % 4} as="div">
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Other collections */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-medium text-maroon sm:text-4xl">
              Continue Exploring
            </h2>
            <SectionDivider className="mt-5" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {others.map((c, i) => (
              <Reveal key={c.slug} delay={i} as="div">
                <Link
                  to="/collections/$slug"
                  params={{ slug: c.slug }}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-sm"
                >
                  <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/85 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 text-ivory">
                    <h3 className="font-display text-xl">{c.name}</h3>
                    <ArrowRight size={16} className="text-gold transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
