import { Link } from "@tanstack/react-router";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "@/data/site";
import { collections } from "@/data/collections";
import eyes from "@/assets/jagannath-eyes.png";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-gradient-maroon text-ivory">
      <img
        src={eyes}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/2 w-[420px] -translate-y-1/2 opacity-[0.05]"
      />
      <div className="relative mx-auto max-w-[1600px] px-6 py-16 sm:px-10 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={eyes} alt="" width={40} height={30} className="h-7 w-9 object-contain" />
              <span className="font-display text-2xl">Jagannath Handloom</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/70">
              A heritage handloom house rooted in the spiritual atmosphere of
              Mayapur. Premium sarees, gopi dresses and traditional wear, woven
              with devotion and shipped worldwide.
            </p>
          </div>

          <div>
            <h4 className="eyebrow mb-5 text-gold-soft">Collections</h4>
            <ul className="space-y-2.5 text-sm text-ivory/70">
              {collections.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/collections/$slug"
                    params={{ slug: c.slug }}
                    className="transition-colors hover:text-gold"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-5 text-gold-soft">Explore</h4>
            <ul className="space-y-2.5 text-sm text-ivory/70">
              <li><Link to="/catalog" className="transition-colors hover:text-gold">Full Catalog</Link></li>
              <li><Link to="/lookbook" className="transition-colors hover:text-gold">Lookbook</Link></li>
              <li><Link to="/about" className="transition-colors hover:text-gold">Our Heritage</Link></li>
              <li><Link to="/stories" className="transition-colors hover:text-gold">Customer Stories</Link></li>
              <li><Link to="/gallery" className="transition-colors hover:text-gold">Gallery</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-gold">Visit Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-5 text-gold-soft">Visit the Store</h4>
            <ul className="space-y-4 text-sm text-ivory/75">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
                <span>{SITE.address.line1}<br />{SITE.address.line2}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="shrink-0 text-gold" />
                <a href={`tel:${SITE.whatsappNumber}`} className="hover:text-gold">{SITE.phone}</a>
              </li>
              <li className="flex gap-3">
                <MessageCircle size={18} className="shrink-0 text-gold" />
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  WhatsApp Enquiry
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-ivory/15 pt-6 text-xs text-ivory/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Jagannath Handloom · Mayapur. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Worldwide Courier Available 🌍</p>
        </div>
      </div>
    </footer>
  );
}
