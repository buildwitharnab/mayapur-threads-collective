import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { PageHero } from "@/components/page-hero";
import heritageImg from "@/assets/heritage.jpg";
import storeImg from "@/assets/store.jpg";
import look1 from "@/assets/lookbook/look-1.jpg";
import khadi from "@/assets/collections/khadi.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Heritage — Jagannath Handloom" },
      {
        name: "description",
        content:
          "The story of Jagannath Handloom — a family heritage house rooted in Mayapur, preserving the craft of traditional handloom weaving for generations.",
      },
      { property: "og:title", content: "Our Heritage — Jagannath Handloom" },
      { property: "og:description", content: "A family heritage handloom house rooted in Mayapur." },
      { property: "og:image", content: heritageImg },
    ],
  }),
  component: About,
});

const story = [
  {
    eyebrow: "Our Beginning",
    title: "A single loom, an unshakeable belief",
    body: "Jagannath Handloom began modestly — one loom, one family, and a deep belief that cloth made by hand carries something a machine never can. From a small corner of Prabhupad Market in Mayapur, we set out to weave garments worthy of the town's timeless grace.",
    image: heritageImg,
  },
  {
    eyebrow: "Our Heritage",
    title: "Generations of weavers",
    body: "Over the years, we have grown into a network of more than forty weaving families. Each carries techniques handed down through generations — the knowledge of how to coax silk and cotton into something luminous. We see ourselves as custodians of that heritage.",
    image: khadi,
  },
  {
    eyebrow: "The Mayapur Connection",
    title: "Where the spirit meets the thread",
    body: "Mayapur is a place of devotion, calm and quiet beauty — and that atmosphere lives in everything we make. Our gopi dresses, dhotis and sarees are worn by the matajis and devotees of this town, and woven with the same sense of intention.",
    image: look1,
  },
];

const values = [
  { title: "Craftsmanship", body: "Every piece is handwoven and hand-finished. Slow, deliberate, and made to last." },
  { title: "Authenticity", body: "Pure fabrics, honest weaves, no shortcuts. The irregularities are the proof." },
  { title: "Our Mission", body: "To bring the heritage handloom of Mayapur to the world, one thread at a time." },
  { title: "Our Vision", body: "A future where traditional weaving thrives, and weaving families flourish." },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Heritage, Woven by Family"
        description="A heritage handloom house rooted in the spiritual atmosphere of Mayapur — preserving a craft, one thread at a time."
        image={storeImg}
      />

      {/* Alternating story */}
      <section className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
        <div className="space-y-20 lg:space-y-32">
          {story.map((s, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal key={s.title}>
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  <div className={`overflow-hidden rounded-sm ${reversed ? "lg:order-2" : ""}`}>
                    <img src={s.image} alt={s.title} loading="lazy" className="aspect-[4/3] w-full object-cover shadow-soft" />
                  </div>
                  <div className={reversed ? "lg:pr-8" : "lg:pl-8"}>
                    <p className="eyebrow">{s.eyebrow}</p>
                    <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-maroon sm:text-4xl">
                      {s.title}
                    </h2>
                    <SectionDivider className="mt-5 justify-start [&>span:first-child]:hidden" />
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Craftsmanship quote */}
      <section className="bg-gradient-maroon py-20 text-center text-ivory lg:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <SectionDivider />
            <p className="mt-4 font-display text-3xl italic leading-relaxed sm:text-4xl">
              “The handloom tradition is not just how we make cloth. It is how we
              keep a culture alive.”
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-gold-soft">
              — The Jagannath Handloom Family
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-medium text-maroon sm:text-4xl">
            What We Stand For
          </h2>
          <SectionDivider className="mt-5" />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i} as="div">
              <div className="h-full rounded-sm border border-border bg-card p-7">
                <p className="font-display text-2xl text-maroon">{v.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 text-center">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 rounded-full bg-maroon px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-maroon-deep"
            >
              Explore the Collections <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
