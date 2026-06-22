import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { collections } from "@/data/collections";
import { getProductsByCollection } from "@/data/products";
import { productsQueryOptions } from "@/lib/products.queries";
import festivalImg from "@/assets/collections/festival.jpg";

export const Route = createFileRoute("/collections")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions),
  head: () => ({
    meta: [
      { title: "Collections — Jagannath Handloom" },
      {
        name: "description",
        content:
          "Explore handloom sarees, gopi dresses, devotional wear, dhuti, kurta, bagalbandhi, khadi and festival collections from Jagannath Handloom, Mayapur.",
      },
      { property: "og:title", content: "Collections — Jagannath Handloom" },
      {
        property: "og:description",
        content: "Eight curated worlds of heritage handloom, each a campaign of its own.",
      },
      { property: "og:image", content: festivalImg },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  const { data: products } = useSuspenseQuery(productsQueryOptions);
  return (
    <>
      <PageHero
        eyebrow="The Collections"
        title="Eight Worlds of Handloom"
        description="Each collection is conceived as a campaign — a complete story of fabric, colour and craft, woven in Mayapur."
        image={festivalImg}
      />

      <section className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
        <div className="space-y-20 lg:space-y-28">
          {collections.map((c, i) => {
            const count = getProductsByCollection(products, c.slug).length;
            const reversed = i % 2 === 1;
            return (
              <Reveal key={c.slug}>
                <div
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                    reversed ? "lg:[&>a]:order-2" : ""
                  }`}
                >
                  <Link
                    to="/collections/$slug"
                    params={{ slug: c.slug }}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-sm sm:aspect-[3/2] lg:aspect-[4/5]"
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-maroon-deep/0 transition-colors duration-500 group-hover:bg-maroon-deep/15" />
                  </Link>
                  <div className={reversed ? "lg:pr-8" : "lg:pl-8"}>
                    <p className="font-display text-6xl text-secondary-foreground/15">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="eyebrow mt-2">{c.tagline}</p>
                    <h2 className="mt-3 font-display text-4xl font-medium text-maroon sm:text-5xl">
                      {c.name}
                    </h2>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                      {c.description}
                    </p>
                    <p className="mt-4 text-sm uppercase tracking-[0.16em] text-gold">
                      {count} pieces
                    </p>
                    <Link
                      to="/collections/$slug"
                      params={{ slug: c.slug }}
                      className="mt-7 inline-flex items-center gap-2 rounded-full border border-maroon/40 px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-maroon transition-colors hover:bg-maroon hover:text-ivory"
                    >
                      View Collection <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
