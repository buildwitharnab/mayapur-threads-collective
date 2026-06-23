import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { categories, type Product } from "@/data/products";
import { productsQueryOptions } from "@/lib/products.queries";
import sareeImg from "@/assets/collections/handloom-sarees.jpg";

export const Route = createFileRoute("/catalog")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions),
  head: () => ({
    meta: [
      { title: "Catalog — Jagannath Handloom" },
      {
        name: "description",
        content:
          "Browse over 100 handloom sarees, gopi dresses, dhuti, kurtas, bagalbandhi and khadi pieces. Premium heritage fashion from Mayapur.",
      },
      { property: "og:title", content: "Catalog — Jagannath Handloom" },
      { property: "og:description", content: "Over 100 premium handloom pieces, woven in Mayapur." },
      { property: "og:image", content: sareeImg },
    ],
  }),
  component: Catalog,
});

const sorts = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
] as const;

function Catalog() {
  const { data: products } = useSuspenseQuery(productsQueryOptions);
  const [active, setActive] = useState<string>("All");
  const [sort, setSort] = useState<string>("featured");

  const filtered = useMemo(() => {
    let list = active === "All" ? products : products.filter((p) => p.category === active);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "featured")
      list = [...list].sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
    return list;
  }, [active, sort, products]);

  const tabs = ["All", ...categories];

  return (
    <>
      <PageHero
        eyebrow="The Catalog"
        title="The Complete Collection"
        description={`Over ${products.length} handwoven pieces — sarees, gopi dresses, menswear and more, each made with devotion in Mayapur.`}
        image={sareeImg}
      />

      <section className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
        {/* Controls */}
        <div className="flex flex-col gap-6 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.12em] transition-colors ${
                  active === t
                    ? "border-maroon bg-maroon text-ivory"
                    : "border-border text-foreground/70 hover:border-maroon/50 hover:text-maroon"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {filtered.length} pieces
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-border bg-background px-4 py-2 text-xs uppercase tracking-[0.12em] text-foreground/80 outline-none focus:border-maroon"
            >
              {sorts.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid: 2 mobile, 3 tablet, 4 desktop */}
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={i % 4} as="div">
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
