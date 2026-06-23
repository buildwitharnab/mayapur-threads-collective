import { useState } from "react";
import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Check, Truck, Sparkles, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { ProductCard } from "@/components/product-card";
import {
  getProduct,
  getRelatedProducts,
  formatPrice,
  type Product,
} from "@/data/products";
import { getCollection } from "@/data/collections";
import { whatsappLink } from "@/data/site";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return {
      product,
      related: getRelatedProducts(product),
      collection: getCollection(product.collectionSlug),
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Jagannath Handloom` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Jagannath Handloom` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-display text-3xl text-maroon">Product not found</h1>
      <Link to="/catalog" className="text-sm uppercase tracking-[0.16em] text-gold">
        Back to catalog
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

function ProductDetail() {
  const { product, related, collection } = Route.useLoaderData();
  const [activeImg, setActiveImg] = useState(product.gallery[0] ?? product.image);
  const [activeColor, setActiveColor] = useState(product.colors[0]?.name);

  return (
    <>
      <div className="mx-auto max-w-[1600px] px-6 pt-28 sm:px-10 lg:px-12">
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-maroon"
        >
          <ArrowLeft size={14} /> Back to Catalog
        </Link>
      </div>

      <section className="mx-auto grid max-w-[1600px] gap-10 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-14">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row">
          <div className="flex gap-3 sm:flex-col">
            {product.gallery.map((g: string, i: number) => (
              <button
                key={i}
                onClick={() => setActiveImg(g)}
                className={`aspect-[4/5] w-20 overflow-hidden rounded-sm border transition-colors ${
                  activeImg === g ? "border-maroon" : "border-border hover:border-gold"
                }`}
              >
                <img src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-hidden rounded-sm bg-secondary/40">
            <img
              src={activeImg}
              alt={product.name}
              width={1024}
              height={1280}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="lg:py-4">
          {collection && (
            <Link
              to="/collections/$slug"
              params={{ slug: collection.slug }}
              className="eyebrow transition-colors hover:text-maroon"
            >
              {collection.name}
            </Link>
          )}
          <h1 className="mt-3 font-display text-4xl font-medium leading-tight text-maroon sm:text-5xl">
            {product.name}
          </h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl text-foreground">{formatPrice(product.price)}</span>
            <span className="text-base text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="rounded-full bg-gold/20 px-3 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-maroon">
              Inclusive of taxes
            </span>
          </div>

          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Colors */}
          <div className="mt-7">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Colour {activeColor ? `— ${activeColor}` : ""}
            </p>
            <div className="mt-3 flex gap-3">
              {product.colors.map((c: { name: string; hex: string }) => (
                <button
                  key={c.name}
                  onClick={() => setActiveColor(c.name)}
                  title={c.name}
                  className={`relative h-9 w-9 rounded-full border transition-all ${
                    activeColor === c.name
                      ? "border-maroon ring-2 ring-gold ring-offset-2 ring-offset-background"
                      : "border-border"
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {activeColor === c.name && (
                    <Check size={14} className="absolute inset-0 m-auto text-ivory mix-blend-difference" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric details */}
          <dl className="mt-7 grid grid-cols-2 gap-y-3 border-y border-border py-6 text-sm">
            <dt className="text-muted-foreground">Fabric</dt>
            <dd className="text-foreground">{product.fabric}</dd>
            <dt className="text-muted-foreground">Category</dt>
            <dd className="text-foreground">{product.category}</dd>
            <dt className="text-muted-foreground">Product Code</dt>
            <dd className="text-foreground">{product.id}</dd>
            <dt className="text-muted-foreground">Craft</dt>
            <dd className="text-foreground">Handwoven · Made to order</dd>
          </dl>

          {/* CTA */}
          <a
            href={whatsappLink(`I'm interested in: ${product.name} (${product.id}) — Colour: ${activeColor}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-4 text-sm uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90"
          >
            <Sparkles size={16} /> Enquire on WhatsApp
          </a>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              { icon: Truck, label: "Worldwide Courier" },
              { icon: ShieldCheck, label: "Authentic Handloom" },
              { icon: Sparkles, label: "Made to Order" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col items-center gap-2 rounded-sm bg-secondary/40 p-4">
                <f.icon size={18} className="text-gold" />
                <span className="text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship story */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:px-10">
          <Reveal>
            <p className="eyebrow">The Craft Behind It</p>
            <SectionDivider className="mt-5" />
            <p className="mt-4 font-display text-2xl leading-relaxed text-foreground/85 sm:text-3xl">
              Woven thread by thread on traditional looms, this piece may take
              weeks to complete. Each one is finished by hand and inspected by our
              family before it travels to you — anywhere in the world.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-medium text-maroon sm:text-4xl">
              You May Also Love
            </h2>
            <SectionDivider className="mt-5" />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
            {related.map((p: Product, i: number) => (
              <Reveal key={p.id} delay={i % 4} as="div">
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
