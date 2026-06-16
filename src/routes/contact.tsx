import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, MessageCircle, Mail, Clock } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { PageHero } from "@/components/page-hero";
import { SITE, whatsappLink } from "@/data/site";
import storeImg from "@/assets/store.jpg";
import look1 from "@/assets/lookbook/look-1.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Visit Us — Jagannath Handloom, Mayapur" },
      {
        name: "description",
        content:
          "Visit Jagannath Handloom at Shop No. 18, Prabhupad Market, Mayapur. WhatsApp +91 85973 84394. Worldwide courier available.",
      },
      { property: "og:title", content: "Visit Us — Jagannath Handloom" },
      { property: "og:description", content: "Shop No. 18, Prabhupad Market, Mayapur. Worldwide courier." },
      { property: "og:image", content: storeImg },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Visit Our Store"
        description="In the heart of Mayapur's Prabhupad Market. Come in person, or reach us on WhatsApp from anywhere in the world."
        image={storeImg}
      />

      <section className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Info + form */}
          <Reveal>
            <p className="eyebrow">Store Details</p>
            <h2 className="mt-3 font-display text-3xl font-medium text-maroon sm:text-4xl">
              Jagannath Handloom
            </h2>
            <ul className="mt-8 space-y-5 text-base">
              <li className="flex gap-4">
                <MapPin className="mt-0.5 shrink-0 text-gold" size={20} />
                <span className="text-foreground/80">{SITE.address.line1}<br />{SITE.address.line2}</span>
              </li>
              <li className="flex gap-4">
                <Phone className="shrink-0 text-gold" size={20} />
                <a href={`tel:${SITE.whatsappNumber}`} className="text-foreground/80 hover:text-maroon">{SITE.phone}</a>
              </li>
              <li className="flex gap-4">
                <MessageCircle className="shrink-0 text-gold" size={20} />
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-maroon">WhatsApp Enquiry</a>
              </li>
              <li className="flex gap-4">
                <Mail className="shrink-0 text-gold" size={20} />
                <span className="text-foreground/80">care@jagannathhandloom.com</span>
              </li>
              <li className="flex gap-4">
                <Clock className="shrink-0 text-gold" size={20} />
                <span className="text-foreground/80">Open daily · 9:00 AM – 8:30 PM</span>
              </li>
            </ul>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-4 text-sm uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="mt-10 space-y-4 rounded-sm border border-border bg-card p-7"
            >
              <h3 className="font-display text-xl text-maroon">Send us a message</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Your name" className="rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-maroon" />
                <input required type="email" placeholder="Email" className="rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-maroon" />
              </div>
              <input placeholder="Phone / WhatsApp" className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-maroon" />
              <textarea required rows={4} placeholder="How can we help you?" className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-maroon" />
              <button type="submit" className="w-full rounded-full bg-maroon px-6 py-3.5 text-xs uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-maroon-deep">
                {sent ? "Thank you — we'll be in touch 🙏" : "Send Message"}
              </button>
            </form>
          </Reveal>

          {/* Map + gallery */}
          <Reveal delay={1}>
            <div className="overflow-hidden rounded-sm border border-border">
              <iframe
                title="Jagannath Handloom location"
                src="https://www.google.com/maps?q=Mayapur+Prabhupad+Market&output=embed"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={SITE.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-maroon hover:text-gold"
            >
              <MapPin size={15} /> Open in Google Maps
            </a>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <img src={storeImg} alt="Store interior" loading="lazy" className="aspect-[4/3] w-full rounded-sm object-cover" />
              <img src={look1} alt="Mayapur riverside" loading="lazy" className="aspect-[4/3] w-full rounded-sm object-cover" />
            </div>
            <div className="mt-6 rounded-sm bg-gradient-maroon p-7 text-ivory">
              <SectionDivider className="justify-start [&>span:first-child]:hidden" />
              <p className="mt-2 font-display text-2xl">Worldwide Courier 🌍</p>
              <p className="mt-2 text-sm text-ivory/80">
                Can't visit Mayapur? We safely ship our handloom anywhere in the
                world. Message us on WhatsApp to arrange delivery.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
