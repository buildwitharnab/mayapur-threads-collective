import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { lookbook } from "@/data/lookbook";
import { whatsappLink } from "@/data/site";
import look1 from "@/assets/lookbook/look-1.jpg";
import eyes from "@/assets/jagannath-eyes.png";

export const Route = createFileRoute("/lookbook")({
  head: () => ({
    meta: [
      { title: "Lookbook — Jagannath Handloom" },
      {
        name: "description",
        content:
          "An editorial journey through handloom heritage — couple shoots, lifestyle photography and the atmosphere of Mayapur. The Jagannath Handloom lookbook.",
      },
      { property: "og:title", content: "Lookbook — Jagannath Handloom" },
      { property: "og:description", content: "An editorial journey through handloom heritage in Mayapur." },
      { property: "og:image", content: look1 },
    ],
  }),
  component: Lookbook,
});

const ease = [0.16, 1, 0.3, 1] as const;

function Lookbook() {
  return (
    <>
      {/* Cinematic cover */}
      <section className="relative flex h-screen items-end overflow-hidden">
        <img src={look1} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/90 via-maroon-deep/20 to-maroon-deep/40" />
        <img src={eyes} alt="" aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 w-[60vw] max-w-[640px] -translate-x-1/2 opacity-[0.06]" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-16 sm:px-10 lg:px-12 lg:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="eyebrow text-gold-soft"
          >
            The Lookbook · Volume I
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="mt-4 max-w-3xl font-display text-5xl font-medium leading-[1.05] text-ivory sm:text-6xl lg:text-7xl"
          >
            The Threads of Mayapur
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.28, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80"
          >
            A visual journey through six chapters of heritage handloom — captured
            in the light, the river and the rhythm of Mayapur.
          </motion.p>
        </div>
      </section>

      {/* Editorial spreads */}
      <div className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
        <div className="space-y-24 lg:space-y-40">
          {lookbook.map((spread, i) => {
            const reversed = i % 2 === 1;
            return (
              <article
                key={spread.title}
                className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-12 ${
                  spread.tall ? "" : ""
                }`}
              >
                <Reveal className={`lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}>
                  <div className="overflow-hidden rounded-sm">
                    <img
                      src={spread.image}
                      alt={spread.title}
                      loading="lazy"
                      className={`w-full object-cover ${
                        spread.tall ? "aspect-[4/5] lg:aspect-[3/4]" : "aspect-[4/3] lg:aspect-[16/10]"
                      }`}
                    />
                  </div>
                </Reveal>
                <Reveal
                  delay={1}
                  className={`lg:col-span-5 ${reversed ? "lg:order-1 lg:pr-6" : "lg:pl-6"}`}
                >
                  <p className="font-display text-7xl text-secondary-foreground/12">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="eyebrow mt-2">{spread.chapter}</p>
                  <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-maroon sm:text-4xl">
                    {spread.title}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                    {spread.description}
                  </p>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-gradient-maroon py-24 text-center text-ivory lg:py-32">
        <img src={eyes} alt="" aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 w-[55vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]" />
        <div className="relative mx-auto max-w-2xl px-6">
          <Reveal>
            <p className="eyebrow text-gold-soft">Bring It Home</p>
            <h2 className="mt-4 font-display text-4xl font-medium sm:text-5xl">
              Wear the story
            </h2>
            <SectionDivider className="mt-6" />
            <p className="mx-auto mt-2 max-w-md text-ivory/80">
              Every piece in this lookbook is available to order and ships
              worldwide. Let us help you find yours.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 rounded-full bg-ivory px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-maroon-deep transition-colors hover:bg-gold"
              >
                Shop the Catalog <ArrowRight size={15} />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-gold hover:text-maroon-deep"
              >
                WhatsApp Enquiry
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
