import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Product, formatPrice } from "@/data/products";
import { whatsappLink } from "@/data/site";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="group flex flex-col">
        <div className="relative overflow-hidden rounded-sm bg-secondary/40">
          <Link
            to="/products/$id"
            params={{ id: product.id }}
            className="block aspect-[4/5] overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              loading={index < 4 ? "eager" : "lazy"}
              width={1024}
              height={1280}
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
            />
          </Link>

          {product.isBestSeller && (
            <span className="absolute left-3 top-3 rounded-full bg-maroon/90 px-3 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-ivory backdrop-blur">
              Best Seller
            </span>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-center gap-2 p-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={() => setOpen(true)}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-background/95 px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-foreground shadow-soft backdrop-blur transition-colors hover:bg-gold hover:text-ivory"
            >
              <Eye size={14} /> Quick View
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <span className="eyebrow text-[0.62rem]">{product.category}</span>
          <Link
            to="/products/$id"
            params={{ id: product.id }}
            className="font-display text-lg leading-snug text-foreground transition-colors hover:text-maroon"
          >
            {product.name}
          </Link>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-base text-maroon">{formatPrice(product.price)}</span>
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl overflow-hidden border-border bg-background p-0">
          <div className="grid gap-0 sm:grid-cols-2">
            <div className="aspect-[4/5] overflow-hidden bg-secondary/40 sm:aspect-auto">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col p-7">
              <span className="eyebrow">{product.category}</span>
              <DialogTitle className="mt-2 font-display text-2xl font-medium text-foreground">
                {product.name}
              </DialogTitle>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-xl text-maroon">{formatPrice(product.price)}</span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <dl className="mt-5 space-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="text-muted-foreground">Fabric:</dt>
                  <dd className="text-foreground">{product.fabric}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt className="text-muted-foreground">Colours:</dt>
                  <dd className="flex gap-1.5">
                    {product.colors.map((c) => (
                      <span
                        key={c.name}
                        title={c.name}
                        className="h-4 w-4 rounded-full border border-border"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </dd>
                </div>
              </dl>
              <div className="mt-auto flex flex-col gap-3 pt-6">
                <a
                  href={whatsappLink(`I'm interested in: ${product.name} (${product.id})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-xs uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90"
                >
                  Enquire on WhatsApp
                </a>
                <Link
                  to="/products/$id"
                  params={{ id: product.id }}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-maroon px-5 py-3 text-xs uppercase tracking-[0.18em] text-maroon transition-colors hover:bg-maroon hover:text-ivory"
                >
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
