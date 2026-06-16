import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SITE, whatsappLink } from "@/data/site";
import eyes from "@/assets/jagannath-eyes.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/collections", label: "Collections" },
  { to: "/catalog", label: "Catalog" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/about", label: "About" },
  { to: "/stories", label: "Stories" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = scrolled || !onHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-background/90 shadow-soft backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            src={eyes}
            alt=""
            width={40}
            height={30}
            className="h-7 w-9 shrink-0 object-contain"
          />
          <span className="flex min-w-0 flex-col leading-none">
            <span
              className={`truncate font-display text-lg tracking-wide sm:text-xl ${
                solid ? "text-maroon" : "text-ivory"
              }`}
            >
              Jagannath Handloom
            </span>
            <span
              className={`mt-1 hidden text-[0.6rem] uppercase tracking-[0.3em] sm:block ${
                solid ? "text-gold" : "text-gold-soft"
              }`}
            >
              Mayapur · Est. Heritage
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {nav.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group relative text-[0.82rem] uppercase tracking-[0.18em] transition-colors ${
                  solid
                    ? active
                      ? "text-maroon"
                      : "text-foreground/70 hover:text-maroon"
                    : active
                      ? "text-ivory"
                      : "text-ivory/80 hover:text-ivory"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-maroon px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-maroon-deep lg:inline-block"
          >
            Enquire
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className={`xl:hidden ${solid ? "text-maroon" : "text-ivory"}`}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border bg-background xl:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="border-b border-border/60 py-3.5 text-sm uppercase tracking-[0.18em] text-foreground/80 last:border-0"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 rounded-full bg-maroon px-5 py-3 text-center text-xs uppercase tracking-[0.2em] text-primary-foreground"
              >
                WhatsApp Enquiry
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
