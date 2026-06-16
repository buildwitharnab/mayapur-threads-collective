import { createFileRoute, Link } from "@tanstack/react-router";
import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { PageHero } from "@/components/page-hero";
import { testimonials } from "@/data/testimonials";
import { whatsappLink } from "@/data/site";
import look3 from "@/assets/lookbook/look-3.jpg";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Customer Stories — Jagannath Handloom" },
      {
        name: "description",
        content:
          "Real stories from devotees and customers around the world who wear Jagannath Handloom — heritage sarees, gopi dresses and traditional wear from Mayapur.",
      },
      { property: "og:title", content: "Customer Stories — Jagannath Handloom" },
      { property: "og:description", content: "Real stories from customers around the world." },
      { property: "og:image", content: look3 },
    ],
  }),
  component: Stories,
});

function Stories() {
  return (
    <>
      <PageHero
        eyebrow="In Their Words"
        title="Customer Stories"
        description="From Mayapur to the world — the people who wear our handloom, and the moments they wear it for."
        image={look3}
      />

      <section className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
        <div className="space-y-10 lg:space-y-16">
          {testimonials.map((t, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal key={t.name}>
                <figure className="grid items-stretch gap-0 overflow-hidden rounded-sm border border-border bg-card lg:grid-cols-2">
                  <div className={`aspect-[4/3] overflow-hidden lg:aspect-auto ${reversed ? "lg:order-2" : ""}`}>
                    <img src={t.image} alt={t.name} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:p-14">
                    <Quote size={36} className="text-gold/50" />
                    <div className="mt-4 flex gap-1 text-gold">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} size={15} className="fill-gold" />
                      ))}
                    </div>
                    <blockquote className="mt-5 font-display text-2xl italic leading-relaxed text-foreground/85 sm:text-3xl">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-7">
                      <p className="font-display text-xl text-maroon">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.location}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gold">
                        Wears · {t.product}
                      </p>
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-20 rounded-sm bg-gradient-maroon p-10 text-center text-ivory lg:p-16">
            <SectionDivider />
            <h2 className="mt-4 font-display text-3xl font-medium sm:text-4xl">
              Your story begins here
            </h2>
            <p className="mx-auto mt-4 max-w-md text-ivory/80">
              Join thousands of devotees and customers worldwide who wear the
              heritage of Mayapur.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 rounded-full bg-ivory px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-maroon-deep transition-colors hover:bg-gold"
              >
                Browse the Catalog
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-gold hover:text-maroon-deep"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
